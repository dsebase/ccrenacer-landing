# Conexión landing ↔ Sistema (ERP)

El landing muestra **IECs** y **eventos** que se administran desde el ERP
(`sistema.ccrenacer.com`). Mientras el ERP no esté online, el sitio usa datos
fijos (fallback) y **nunca se rompe**. Cuando el ERP esté publicado, el sitio
toma solo lo que esté marcado **"Mostrar en la web"**.

## Cómo funciona (fallback primero)

```
ERP (Laravel + SQLite)            Landing (Astro, estático)
────────────────────              ─────────────────────────
Admin marca una IEC / evento
como "Mostrar en la web"  ──▶  GET /api/public/home-churches
(is_public = true)              GET /api/public/events
                                        │
                                        ▼
                          Si responde con datos → los muestra
                          Si no (offline/vacío) → datos fijos
```

- **IECs** → sección "Iglesia en Casa" (botón *Encontrar mi IEC*).
- **Eventos** → calendario de la página `/agenda` (los servicios semanales
  fijos se mantienen; solo se reemplazan los eventos especiales).
- **Redes sociales** → disponibles en `/api/public-config` (Facebook, IG,
  YouTube, WhatsApp) para futura lectura dinámica.

## Cómo ACTIVAR la conexión (cuando el ERP esté online)

1. En `landing/.env`:
   ```
   PUBLIC_ERP_API_URL=https://sistema.ccrenacer.com/api
   ```
2. `pnpm build` y subir `dist/` al hosting.
3. En el ERP, en `backend/.env`, confirmar que el origen del landing está
   permitido (CORS ya incluye `https://ccrenacer.com`; si el dominio cambia,
   ajustar `LANDING_URL`).

Con eso, cada IEC/evento que el staff marque **"Mostrar en la web"** aparece
en el sitio **sin recompilar nada más**: el navegador lo lee del ERP en vivo.

## Qué campos se exponen (solo lo seguro)

- **IEC**: nombre, líder(es), distrito, día y hora. *(Nunca miembros, teléfonos
  ni datos internos.)*
- **Evento**: título, fecha, hora, lugar, categoría, descripción.

Los endpoints son de **solo lectura**, con caché de 5 min, y devuelven
únicamente registros con `is_public = true`.

## Fotos de la web (desde el ERP)
En el ERP, módulo **"Fotos de la web"**, cada foto del landing es un slot con su
ubicación y medida recomendada. Al reemplazar una, el landing la toma sola
(fallback a la foto por defecto si no se reemplazó o el ERP está offline).
- Endpoint público: `GET /api/public/site-media` → `{ slot: url }`.
- El swap ocurre en `Layout.astro` (busca el `<img>` por su ruta por defecto y
  cambia el `src`; si la nueva imagen falla, revierte a la original).
- Las claves de slot coinciden con `src/lib/images.ts`.

## Facebook Live (página EN VIVO)
El enlace del live y el estado "En vivo ahora" se administran en el ERP
(Configuración → Facebook Live) y salen por `GET /api/public-config`
(`live_fb_url`, `live_now`). La página `/en-vivo` inyecta el reproductor en vivo
si hay URL; si no, usa el valor del `.env` (fallback).

## Importante · CSP y CORS
- El `.htaccess` (CSP) ya permite `https://sistema.ccrenacer.com` en
  `connect-src` (fetch) e `img-src` (fotos subidas). Si cambia el dominio del
  ERP, actualizar ambos.
- En el ERP, `backend/.env`: `LANDING_URL=https://ccrenacer.com` (CORS + URL por
  defecto de las fotos). CORS ya incluye ese dominio.

## Notas
- Si el ERP responde con lista vacía, el landing conserva los datos fijos
  (para no dejar secciones en blanco por error).
- Teasers de eventos en Footer/Servicios siguen usando datos fijos (se
  actualizan al recompilar); el calendario de `/agenda` sí es dinámico.
