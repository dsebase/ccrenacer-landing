// ────────────────────────────────────────────────────────────────
// Conexión con el ERP (sistema.ccrenacer.com) para la web pública.
//
// Filosofía "fallback primero": si PUBLIC_ERP_API_URL está vacío (el ERP
// todavía no está online) o el ERP no responde, TODO cae al contenido fijo
// que ya trae el sitio. La web nunca se rompe; cuando el ERP esté publicado
// y tenga datos marcados "Mostrar en la web", el sitio los toma solo.
//
// Config: en .env → PUBLIC_ERP_API_URL=https://sistema.ccrenacer.com/api
// ────────────────────────────────────────────────────────────────

const BASE = (import.meta.env.PUBLIC_ERP_API_URL ?? "").replace(/\/+$/, "")

/** ¿Está configurada la conexión al ERP? */
export function erpEnabled(): boolean {
  return BASE.length > 0
}

async function get<T>(path: string, timeoutMs = 6000): Promise<T | null> {
  if (!BASE) return null
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), timeoutMs)
    const res = await fetch(`${BASE}${path}`, {
      signal: ctrl.signal,
      headers: { Accept: "application/json" },
    })
    clearTimeout(timer)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export interface IecPublic {
  nombre: string
  lideres: string
  distrito: string
  dia: string
  hora: string
}

export interface EventoPublic {
  titulo: string
  fecha: string // YYYY-MM-DD
  hora: string
  lugar: string
  categoria: string
  descripcion: string
}

/** IECs marcadas "Mostrar en la web" (o null si no hay conexión/datos). */
export const fetchIecs = () => get<IecPublic[]>("/public/home-churches")

/** Próximos eventos marcados "Mostrar en la web". */
export const fetchEventos = () => get<EventoPublic[]>("/public/events")

// Mapa { slotDeImagen: urlSubida } — solo los slots con foto reemplazada.
export type SiteMedia = Record<string, string>

/** Fotos del landing reemplazadas desde el ERP (o null si no hay conexión). */
export const fetchSiteMedia = () => get<SiteMedia>("/public/site-media")

export interface PublicConfig {
  facebook_url?: string
  instagram_url?: string
  youtube_url?: string
  whatsapp_url?: string
  live_fb_url?: string
  live_now?: boolean
  [k: string]: unknown
}

/** Configuración pública del ERP (redes + Facebook Live). */
export const fetchPublicConfig = () => get<PublicConfig>("/public-config")
