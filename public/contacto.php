<?php
declare(strict_types=1);

/**
 * ─────────────────────────────────────────────────────────────────────
 *  Endpoint seguro del formulario de contacto · Comunidad Cristiana Renacer
 *  Se sube junto al sitio a public_html/ (sale del build de Astro).
 *
 *  Capas de seguridad (defensa en profundidad):
 *    1) Solo POST                         5) Rate-limit por IP
 *    2) Verificación de origen            6) Validación + saneo
 *    3) Honeypot                          7) Anti header-injection
 *    4) Time-trap                         8) Turnstile (verificación server)
 *
 *  Los secretos van en "config.php" (NO se sube a git, bloqueado por .htaccess).
 * ─────────────────────────────────────────────────────────────────────
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** Responde en JSON y termina. */
function respond(bool $ok, string $error = '', int $code = 200): void {
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

/** Lee un campo POST como string recortado. */
function field(string $k): string {
    $v = $_POST[$k] ?? '';
    return is_string($v) ? trim($v) : '';
}

/** Quita saltos de línea (evita inyección de cabeceras de correo). */
function no_crlf(string $s): string {
    return (string) preg_replace('/[\r\n]+/', ' ', $s);
}

// ── Configuración ──────────────────────────────────────────────────
// config.php es OPCIONAL: si no existe, se usan los valores por defecto
// (destino info@ccrenacer.com, sin Turnstile). Crea config.php solo si
// quieres personalizar el destino, activar Turnstile, etc.
$configPath = __DIR__ . '/config.php';
$config = is_file($configPath) ? require $configPath : [];
if (!is_array($config)) {
    $config = [];
}

// ── 1. Solo POST ───────────────────────────────────────────────────
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'method', 405);
}

// ── 2. Verificación de origen (mismo dominio) ──────────────────────
$allowedHost = (string) ($config['allowed_host'] ?? ($_SERVER['HTTP_HOST'] ?? ''));
$originRaw   = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($originRaw !== '' && $allowedHost !== '') {
    $host = (string) (parse_url($originRaw, PHP_URL_HOST) ?? '');
    if ($host !== '' && stripos($host, $allowedHost) === false) {
        respond(false, 'origin', 403);
    }
}

// ── 3. Honeypot (campo oculto: humanos lo dejan vacío) ─────────────
if (field('website') !== '' || field('_gotcha') !== '') {
    // Fingimos éxito para no darle pistas al bot.
    respond(true);
}

// ── 4. Time-trap (rechaza envíos instantáneos o tokens viejos) ─────
$ts    = (int) field('ts');                       // ms desde epoch, puesto por JS al cargar
$nowMs = (int) round(microtime(true) * 1000);
if ($ts <= 0 || ($nowMs - $ts) < 3000 || ($nowMs - $ts) > 3600000) {
    respond(false, 'timing', 400);
}

// ── 5. Turnstile (verificación del lado servidor) ──────────────────
// OPCIONAL: solo se exige si configuraste 'turnstile_secret' en config.php.
// Sin él, el formulario igual funciona con honeypot + time-trap + rate-limit
// + verificación de origen. (Ponlo cuando quieras la protección más fuerte.)
$turnstileSecret = (string) ($config['turnstile_secret'] ?? '');
if ($turnstileSecret !== '') {
    $token = field('cf-turnstile-response');
    if ($token === '') {
        respond(false, 'captcha', 400);
    }
    if (!turnstile_verify($turnstileSecret, $token, (string) ($_SERVER['REMOTE_ADDR'] ?? ''))) {
        respond(false, 'captcha', 403);
    }
}

// ── 6. Rate-limit por IP ───────────────────────────────────────────
$rateMax    = (int) ($config['rate_max'] ?? 5);
$rateWindow = (int) ($config['rate_window'] ?? 600);
if (!rate_ok((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), $rateMax, $rateWindow)) {
    respond(false, 'rate', 429);
}

// ── 7. Validación y saneo ──────────────────────────────────────────
$nombre   = field('nombre');
$apellido = field('apellido');
$email    = field('email');
$celular  = field('celular');
$pais     = field('pais');
$motivo   = field('motivo');
$mensaje  = field('mensaje');

$errors = [];
if ($nombre === '' || mb_strlen($nombre) > 80)             $errors[] = 'nombre';
if ($apellido === '' || mb_strlen($apellido) > 80)         $errors[] = 'apellido';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) $errors[] = 'email';
if (mb_strlen($celular) > 40)                              $errors[] = 'celular';
if (mb_strlen($pais) > 60)                                 $errors[] = 'pais';
if (mb_strlen($motivo) > 60)                               $errors[] = 'motivo';
if ($mensaje === '' || mb_strlen($mensaje) > 3000)         $errors[] = 'mensaje';
if ($errors) {
    respond(false, 'validation:' . implode(',', $errors), 422);
}

// ── 8. Construcción y envío del correo ─────────────────────────────
// Destino de los mensajes del formulario. Por defecto: info@ccrenacer.com
// (se puede sobrescribir en config.php con 'mail_to').
$to       = (string) ($config['mail_to'] ?? 'info@ccrenacer.com');
// Remitente: DEBE ser una cuenta real del dominio (cPanel/Exim rechaza el envío
// si el remitente no existe). Por defecto usamos el mismo buzón destino (info@),
// que sí existe. El visitante queda en Reply-To para poder responderle.
$fromAddr = (string) ($config['mail_from'] ?? $to);
if (!filter_var($fromAddr, FILTER_VALIDATE_EMAIL)) {
    $fromAddr = $to;
}
$fromName = no_crlf($nombre . ' ' . $apellido);
$replyTo  = no_crlf($email);

$subject = '=?UTF-8?B?' . base64_encode('Nuevo mensaje web · ' . $fromName) . '?=';

$body = implode("\r\n", [
    'Nuevo mensaje desde el formulario de ' . $allowedHost,
    str_repeat('=', 44),
    'Nombre:   ' . $nombre . ' ' . $apellido,
    'Correo:   ' . $email,
    'Celular:  ' . ($celular !== '' ? $celular : '—'),
    'País:     ' . ($pais !== '' ? $pais : '—'),
    'Motivo:   ' . ($motivo !== '' ? $motivo : '—'),
    str_repeat('-', 44),
    'Mensaje:',
    $mensaje,
    '',
    str_repeat('=', 44),
    'IP:    ' . ($_SERVER['REMOTE_ADDR'] ?? '—'),
    'Fecha: ' . date('Y-m-d H:i:s'),
]);

$headers = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode('Web Renacer') . '?= <' . $fromAddr . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: RenacerForm',
]);

// El 5º parámetro "-f<correo>" fija el envelope-sender (Return-Path) a una
// cuenta real del dominio. cPanel/Exim lo necesita para aceptar el correo y
// para que no lo marque como spam.
if (!@mail($to, $subject, $body, $headers, '-f' . $fromAddr)) {
    respond(false, 'send', 500);
}
respond(true);


/* ═══════════════════════ Funciones auxiliares ═══════════════════════ */

/** Verifica el token de Cloudflare Turnstile contra su API. */
function turnstile_verify(string $secret, string $token, string $ip): bool {
    if ($secret === '') return false;
    $payload = http_build_query([
        'secret'   => $secret,
        'response' => $token,
        'remoteip' => $ip,
    ]);
    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $res = false;

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 8,
        ]);
        $res = curl_exec($ch);
        curl_close($ch);
    } else {
        $ctx = stream_context_create(['http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $payload,
            'timeout' => 8,
        ]]);
        $res = @file_get_contents($url, false, $ctx);
    }

    if (!is_string($res) || $res === '') return false;
    $json = json_decode($res, true);
    return is_array($json) && !empty($json['success']);
}

/**
 * Rate-limit sencillo por IP con ventana deslizante (archivos en .data/).
 * Fail-open: si no se puede escribir, no bloquea (mejor no romper el envío).
 */
function rate_ok(string $ip, int $max, int $window): bool {
    $dir = __DIR__ . '/.data';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    if (!is_dir($dir) || !is_writable($dir)) {
        return true;
    }
    $file = $dir . '/rl_' . hash('sha256', $ip) . '.json';
    $now  = time();
    $hits = [];
    if (is_file($file)) {
        $arr = json_decode((string) @file_get_contents($file), true);
        if (is_array($arr)) $hits = $arr;
    }
    $hits = array_values(array_filter($hits, static fn($t) => is_int($t) && ($now - $t) < $window));
    if (count($hits) >= $max) {
        return false;
    }
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return true;
}
