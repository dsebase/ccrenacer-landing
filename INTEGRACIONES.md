# Integraciones de redes — Comunidad Cristiana Renacer

Guía para conectar Facebook, YouTube e Instagram en la página **/en-vivo**.

---

## 0. Crear tu archivo `.env` (una sola vez)

1. En la carpeta `landing/`, copiá el archivo `.env.example` y renombrá la copia a `.env`
2. Completá los valores con tus datos reales
3. Reiniciá el servidor (`pnpm dev`) o volvé a desplegar para que tome los cambios

> El `.env` NO se sube a Git (está en `.gitignore`). En producción, estas mismas
> variables se cargan en el panel del hosting (Vercel/Netlify/etc.).

---

## 1. Vincular tus cuentas (botones y links) — 2 minutos

En el `.env`, completá:

```
PUBLIC_FACEBOOK_URL=https://facebook.com/TU_PAGINA
PUBLIC_INSTAGRAM_URL=https://instagram.com/TU_USUARIO
PUBLIC_YOUTUBE_URL=https://youtube.com/@TU_CANAL
PUBLIC_WHATSAPP_URL=https://wa.me/51TUNUMERO
```

Listo: todos los botones ("Ver en Facebook", "Seguir", "Suscríbete", etc.) y los
links del footer apuntan a tus cuentas reales.

---

## 2. YouTube automático ⭐ (recomendado) — 5 minutos

Hace que la tira de YouTube traiga **sola** tus últimos videos, con su miniatura real.
No necesita API key ni token.

**Pasos:**

1. Obtené el **ID de tu canal**:
   - Entrá a [YouTube Studio](https://studio.youtube.com)
   - **Configuración** (rueda dentada) → **Canal** → **Configuración avanzada**
   - Copiá el **"ID del canal"** (empieza con `UC...`)
   - *(Alternativa: abrí tu canal en youtube.com, clic derecho → "Ver código fuente"
     y buscá `channel_id`)*

2. Pegalo en el `.env`:
   ```
   PUBLIC_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Reiniciá `pnpm dev` (o redesplegá). ¡Tus videos aparecen automáticamente!

> **Cómo se actualiza:** los videos se traen al hacer *build* del sitio. Cada vez
> que subas un video nuevo, volvé a desplegar (o configurá un redeploy automático
> diario en tu hosting) para que aparezca. Mientras desarrollás con `pnpm dev`, se
> actualiza en cada recarga.

---

## 3. Facebook Live — cuando transmitan

El sitio es estático, así que la forma más práctica es **avisar** cuándo están en vivo
(toma 10 segundos antes del culto):

1. Cuando empiecen a transmitir en Facebook, copiá la **URL del video en vivo**
   (abrí el video → botón compartir → copiar enlace). Se ve así:
   ```
   https://www.facebook.com/TU_PAGINA/videos/1234567890
   ```

2. En el `.env`, pegala y activá el live:
   ```
   PUBLIC_FB_VIDEO_HREF=https://www.facebook.com/TU_PAGINA/videos/1234567890
   PUBLIC_FB_LIVE_NOW=true
   ```

3. Redesplegá. El reproductor de Facebook aparece incrustado con el badge rojo
   "● En vivo ahora".

4. Al terminar, poné `PUBLIC_FB_LIVE_NOW=false` (o dejá la URL del último video para
   que quede como repetición).

### ¿100% automático? (avanzado, opcional)

Detectar el live **solo** requiere consultar la API de Facebook en tiempo real, lo que
necesita:
- Una **App de Facebook** (developers.facebook.com)
- Un **Page Access Token** de larga duración
- Una **función serverless** (Vercel / Netlify / Cloudflare) que consulte
  `GET /{page-id}/live_videos?fields=status,permalink_url` cada X minutos

Esto se puede agregar cuando definas el hosting. Avisame y lo implementamos.

---

## 4. Instagram — mostrar tus posts

Meta discontinuó la API simple, así que la forma realista y mantenible es un
**widget de terceros** (gratis o muy barato):

**Opciones recomendadas:**
- [LightWidget](https://lightwidget.com) — gratis, simple
- [Elfsight](https://elfsight.com/instagram-feed-instashow) — muy completo
- [Curator.io](https://curator.io) — agrega varias redes

**Pasos generales (con cualquiera):**
1. Creá una cuenta en el servicio
2. Conectá tu cuenta de Instagram (te pide login/autorización)
3. Personalizá el estilo del feed (grilla, colores)
4. Copiá el **código de inserción** (un `<script>` o `<iframe>`) que te dan
5. Pasámelo y lo coloco en la tira de Instagram de `/en-vivo`

> Mientras tanto, la tira funciona con imágenes/enlaces cargados a mano en
> `src/pages/en-vivo.astro` (array `igPosts`): poné la foto real del post y su link.

---

## Resumen rápido

| Integración | Esfuerzo | Estado |
|---|---|---|
| Links a redes (botones) | 2 min · solo `.env` | ✅ listo para configurar |
| YouTube últimos videos | 5 min · `.env` + Channel ID | ✅ automático implementado |
| Facebook Live | 10 seg antes de cada culto · `.env` | ✅ listo (semi-manual) |
| Facebook Live 100% auto | requiere App + serverless | 🔧 a pedido |
| Instagram feed | widget de terceros | 🔧 pasame el embed |

¿Dudas en algún paso? Avisame y lo resolvemos.
