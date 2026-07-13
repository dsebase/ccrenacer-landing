// ───────────────────────────────────────────────────────────────
// Configuración central de redes sociales.
// Todo se controla desde el archivo .env (ver .env.example). Si una variable
// no está definida, se usa el valor por defecto de acá.
// ───────────────────────────────────────────────────────────────

export const social = {
  facebook: import.meta.env.PUBLIC_FACEBOOK_URL ?? "https://facebook.com/ccrenacer",
  youtube: import.meta.env.PUBLIC_YOUTUBE_URL ?? "https://youtube.com/@ccrenacer",
  instagram: import.meta.env.PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/ccrenacer",
  whatsapp: import.meta.env.PUBLIC_WHATSAPP_URL ?? "https://wa.me/51999999999",

  // YouTube: ID del canal (empieza con UC...) para traer videos automáticamente
  youtubeChannelId: import.meta.env.PUBLIC_YOUTUBE_CHANNEL_ID ?? "",

  // Facebook Live: URL del video en vivo + si están transmitiendo ahora
  fbVideoHref: import.meta.env.PUBLIC_FB_VIDEO_HREF ?? "",
  liveNow: import.meta.env.PUBLIC_FB_LIVE_NOW === "true",
}

export interface YouTubeVideo {
  id: string
  titulo: string
  fecha: string
}

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

function formatFecha(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ""
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`
}

/**
 * Trae los últimos videos de un canal de YouTube usando su feed RSS público.
 * No requiere API key ni token. Se ejecuta al hacer build (o en cada request en dev).
 * Si falla o no hay channelId, devuelve [] y la página usa los videos placeholder.
 */
export async function getYouTubeVideos(channelId: string, limit = 8): Promise<YouTubeVideo[]> {
  if (!channelId) return []
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; CCRenacer/1.0)" } },
    )
    if (!res.ok) return []
    const xml = await res.text()
    const entries = xml.split("<entry>").slice(1)
    return entries
      .slice(0, limit)
      .map((e) => ({
        id: e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "",
        titulo: decodeXml(e.match(/<title>(.*?)<\/title>/)?.[1] ?? ""),
        fecha: formatFecha(e.match(/<published>(.*?)<\/published>/)?.[1] ?? ""),
      }))
      .filter((v) => v.id)
  } catch {
    return []
  }
}

export const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
export const ytWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`
