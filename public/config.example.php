<?php
/**
 * PLANTILLA de configuración del formulario.
 *
 * PASOS:
 *   1) En tu hosting (public_html), copia este archivo como  config.php
 *   2) Completa tus valores reales abajo.
 *   3) config.php NO se sube a git y queda bloqueado por .htaccess.
 *
 * (Este config.example.php sí puede estar en el repo: no tiene secretos.)
 */

return [
    // Correo destino: dónde llegarán los mensajes del formulario.
    'mail_to'   => 'info@ccrenacer.com',

    // Remitente. Debe ser una dirección de TU dominio (mejor entregabilidad).
    // NO uses el correo del visitante aquí (SPF/DMARC lo rechazaría).
    'mail_from' => 'no-reply@ccrenacer.com',

    // Tu dominio, SIN http:// (para la verificación de origen).
    'allowed_host' => 'ccrenacer.com',

    // Clave SECRETA de Cloudflare Turnstile (la "Secret Key", NO la site key pública).
    // Se saca en: dash.cloudflare.com → Turnstile → tu sitio → Secret Key.
    'turnstile_secret' => 'PON_AQUI_TU_SECRET_KEY',

    // Rate-limit: máximo de envíos por IP dentro de la ventana (en segundos).
    'rate_max'    => 5,
    'rate_window' => 600, // 10 minutos
];
