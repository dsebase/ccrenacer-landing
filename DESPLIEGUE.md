# Cómo subir el landing al hosting (cPanel) — paso a paso

El sitio es **estático**: se genera con `pnpm build` (carpeta `dist/`) y se sube a
`public_html/`. No necesita Node en el hosting; solo PHP para el formulario.

## Paso 0 · Dominio (¡importante!)
`ccrenacer.com` debe **apuntar a tu hosting cPanel**. Si hoy apunta a Vercel u
otro lado, mientras no cambies eso, `ccrenacer.com` seguirá mostrando lo anterior
aunque subas los archivos al cPanel.
- En tu registrador de dominio, usa los **nameservers de tu hosting**, o
  apunta el registro **A** a la **IP de tu hosting** (te la da el proveedor).
- El cambio de DNS puede tardar de minutos a unas horas.

## Paso 1 · Crear el correo destino
cPanel → **Cuentas de correo** → Crear → `info@ccrenacer.com` (con contraseña).
Ahí llegarán los mensajes del formulario.

## Paso 2 · Subir el sitio
1. Genera el ZIP (ya está hecho): `ccrenacer-sitio.zip`.
2. cPanel → **Administrador de archivos** → entra a **`public_html`**.
3. Si hay un `index.html`/página por defecto, **bórralo**.
4. Botón **Cargar (Upload)** → selecciona `ccrenacer-sitio.zip`.
5. De vuelta en el Administrador de archivos, clic derecho sobre el zip →
   **Extraer** → dentro de `public_html`.
6. En **Configuración (Settings)** del Administrador, activa **"Mostrar archivos
   ocultos"** para confirmar que existe `public_html/.htaccess`.
7. Borra el `.zip` ya extraído.

Debe quedar así:
```
public_html/
  ├─ index.html          ← la web
  ├─ .htaccess           ← seguridad + HTTPS
  ├─ contacto.php        ← procesa el formulario
  ├─ config.example.php  ← plantilla (opcional)
  ├─ img/  _astro/  agenda/  en-vivo/  video/ ...
```

## Paso 3 · Activar HTTPS (SSL)
cPanel → **SSL/TLS Status** o **Let's Encrypt / AutoSSL** → emite el certificado
para `ccrenacer.com` y `www`. (El `.htaccess` fuerza HTTPS, así que el SSL debe
estar activo o el sitio no cargará.)

## Paso 4 · Probar
- Abre `https://ccrenacer.com` → la web carga.
- Ve a **Contacto**, envía un mensaje de prueba → revísalo en **info@ccrenacer.com**
  (o en el Webmail del cPanel).

¡Listo! El formulario ya envía a `info@ccrenacer.com` sin configurar nada más.

---

## Opcionales (para más adelante)
- **Cambiar el destino del correo o activar Turnstile:** copia
  `config.example.php` como `config.php` en `public_html` y edita los valores.
- **Conectar el ERP** (fotos/IECs/eventos dinámicos): ver `INTEGRACION-ERP.md`.

## Cómo ACTUALIZAR el sitio después
Cada vez que cambies algo:
1. `pnpm build` (regenera `dist/`).
2. Vuelve a generar el ZIP y súbelo/extráelo en `public_html` (sobrescribe).
   - `config.php` (si lo creaste) **no se toca**: no está en el ZIP.
