# Seguridad del formulario de contacto

Este proyecto envía el formulario a un endpoint propio en tu hosting cPanel
(`contacto.php`), con varias capas anti-spam. Nada depende de servicios de
terceros para procesar los mensajes.

## Capas de seguridad activas

| # | Capa | Dónde |
|---|------|-------|
| 1 | Solo peticiones POST | `contacto.php` |
| 2 | Verificación de origen (mismo dominio) | `contacto.php` |
| 3 | Honeypot (campo oculto anti-bot) | formulario + `contacto.php` |
| 4 | Time-trap (rechaza envíos en < 3 s) | formulario + `contacto.php` |
| 5 | **Cloudflare Turnstile** (captcha invisible) | formulario + `contacto.php` |
| 6 | Rate-limit por IP (5 envíos / 10 min) | `contacto.php` |
| 7 | Validación + saneo de campos | `contacto.php` |
| 8 | Anti header-injection en el correo | `contacto.php` |
| 9 | Correo ofuscado (no aparece en el HTML) | `Contacto.astro` |
| 10 | Cabeceras de seguridad + CSP + HTTPS | `.htaccess` |

---

## Puesta en marcha (una sola vez)

### 1) Crear el captcha (Cloudflare Turnstile — gratis)
1. Entra a **dash.cloudflare.com → Turnstile → Add site**.
2. Dominio: `ccrenacer.com` (y `www.ccrenacer.com` si lo usas). Widget: **Managed**.
3. Copia las dos claves:
   - **Site Key** (pública) → va en `.env`
   - **Secret Key** (secreta) → va en `config.php` del hosting

### 2) Configurar el `.env` y compilar
```bash
# en landing/.env
PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...tu_site_key

pnpm build      # genera la carpeta dist/ con todo (sitio + contacto.php + .htaccess)
```

### 3) Crear el correo destino en cPanel
En **cPanel → Cuentas de correo**, crea (o confirma) `info@ccrenacer.com`.
Como el buzón vive en el mismo servidor, `mail()` entrega localmente y llega
al Inbox sin problemas de spam.

### 4) Subir el sitio a `public_html/`
Sube **todo el contenido de `dist/`** a `public_html/` (por el Administrador de
archivos de cPanel o FTP). Eso incluye `contacto.php`, `.htaccess` y
`config.example.php`.

### 5) Crear `config.php` en el hosting
En `public_html/`, copia `config.example.php` como **`config.php`** y completa:
```php
'mail_to'          => 'info@ccrenacer.com',
'mail_from'        => 'no-reply@ccrenacer.com',
'allowed_host'     => 'ccrenacer.com',
'turnstile_secret' => '0x4AAAAAAA...tu_SECRET_key',
```
> `config.php` NO está en git y queda bloqueado por `.htaccess`: nadie puede
> abrirlo desde el navegador.

### 6) Probar
- Abre la web, ve a **Contacto**, envía un mensaje de prueba → debe llegar a `info@`.
- Verifica en https://securityheaders.com que salga la nota de las cabeceras.
- Prueba enviar sin resolver el captcha → debe rechazarlo.

---

## Mantenimiento
- **Cambiar el correo destino:** edita `config.php` (no hace falta recompilar).
- **Ajustar el rate-limit:** `rate_max` / `rate_window` en `config.php`.
- **Actualizar el sitio:** `pnpm build` y vuelve a subir `dist/`
  (no toques `config.php` ni la carpeta `.data/`).
- **Agregar un servicio externo** (analytics, mapa): añádelo a la línea
  `Content-Security-Policy` del `.htaccess` o quedará bloqueado.
