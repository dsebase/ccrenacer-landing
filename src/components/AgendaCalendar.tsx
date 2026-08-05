import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  actividades,
  categoriaColor,
  type Actividad,
  type Categoria,
} from "../lib/agenda"
import { erpEnabled, fetchEventos, type EventoPublic } from "../lib/erp"

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

const pad = (n: number) => String(n).padStart(2, "0")
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`

// Normaliza la categoría que manda el ERP a las de la agenda (con color de marca).
const CATS: Categoria[] = ["Servicio", "Jóvenes", "Oración", "Adoración", "Bautismos", "Conferencia"]
const normCat = (c: string): Categoria =>
  CATS.find((k) => k.toLowerCase() === (c || "").toLowerCase()) ?? "Conferencia"

// Un evento del ERP → actividad "especial" del calendario.
const eventoToActividad = (e: EventoPublic): Actividad => ({
  tipo: "special",
  fecha: e.fecha,
  hora: e.hora || "",
  titulo: e.titulo,
  lugar: e.lugar || "",
  categoria: normCat(e.categoria),
  descripcion: e.descripcion || "",
})

export default function AgendaCalendar() {
  const hoy = new Date()
  const [y, setY] = useState(hoy.getFullYear())
  const [m, setM] = useState(hoy.getMonth())
  const [sel, setSel] = useState<number>(hoy.getDate())

  const isoHoy = iso(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())

  // Datos: arranca con los fijos (fallback). Si el ERP está online y trae
  // eventos marcados "Mostrar en la web", reemplaza los especiales (mantiene
  // los servicios semanales, que no viven en el ERP).
  const [acts, setActs] = useState<Actividad[]>(actividades)
  useEffect(() => {
    if (!erpEnabled()) return
    let vivo = true
    fetchEventos().then((items) => {
      if (!vivo || !items || items.length === 0) return
      const semanales = actividades.filter((a) => a.tipo === "weekly")
      setActs([...semanales, ...items.map(eventoToActividad)])
    })
    return () => {
      vivo = false
    }
  }, [])

  // Actividades que caen en una fecha concreta (semanales por día + especiales por fecha)
  const actividadesDe = (yy: number, mm: number, dd: number): Actividad[] => {
    const fecha = iso(yy, mm, dd)
    const js = new Date(yy, mm, dd).getDay()
    return acts
      .filter((a) => (a.tipo === "weekly" ? a.diaSemana === js : a.fecha === fecha))
      .sort((a, b) => a.hora.localeCompare(b.hora))
  }

  // Construcción de la grilla (semanas empiezan el lunes)
  const celdas = useMemo(() => {
    const primerDia = new Date(y, m, 1).getDay()        // 0=Dom … 6=Sáb
    const offset = (primerDia + 6) % 7                   // lunes = 0
    const diasMes = new Date(y, m + 1, 0).getDate()
    const total = Math.ceil((offset + diasMes) / 7) * 7
    return Array.from({ length: total }, (_, i) => {
      const d = i - offset + 1
      return d >= 1 && d <= diasMes ? d : null
    })
  }, [y, m])

  const irMes = (delta: number) => {
    const nd = new Date(y, m + delta, 1)
    setY(nd.getFullYear())
    setM(nd.getMonth())
    setSel(0) // sin selección hasta que el usuario elija un día
  }

  const irHoy = () => {
    setY(hoy.getFullYear())
    setM(hoy.getMonth())
    setSel(hoy.getDate())
  }

  const seleccionados = sel >= 1 ? actividadesDe(y, m, sel) : []

  // Próximas actividades especiales (para el panel cuando no hay día elegido)
  const proximos = useMemo(() => {
    return acts
      .filter((a): a is Extract<Actividad, { tipo: "special" }> => a.tipo === "special")
      .filter((a) => a.fecha >= isoHoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha))
      .slice(0, 4)
  }, [isoHoy, acts])

  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-10 items-start">
      {/* ── Calendario ─────────────────────────────────────────── */}
      <div className="surface-glass rounded-[28px] p-5 sm:p-7 border border-ink-900/10">
        {/* Cabecera mes */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-900 tracking-[-0.02em] leading-none">
              {MESES[m]}
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-400 mt-2">
              {y}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={irHoy}
              className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 rounded-full border border-ink-900/15 text-ink-600 hover:border-spirit-500 hover:text-spirit-600 transition-colors"
              data-cursor="hover"
            >
              Hoy
            </button>
            <button
              onClick={() => irMes(-1)}
              aria-label="Mes anterior"
              className="w-9 h-9 grid place-items-center rounded-full border border-ink-900/15 text-ink-700 hover:border-spirit-500 hover:text-spirit-600 transition-colors"
              data-cursor="hover"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => irMes(1)}
              aria-label="Mes siguiente"
              className="w-9 h-9 grid place-items-center rounded-full border border-ink-900/15 text-ink-700 hover:border-spirit-500 hover:text-spirit-600 transition-colors"
              data-cursor="hover"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* Encabezado días */}
        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {DIAS.map((d) => (
            <div key={d} className="text-center font-mono text-[10px] uppercase tracking-[0.15em] text-ink-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Grilla de días */}
        <div className="grid grid-cols-7 gap-1.5">
          {celdas.map((d, i) => {
            if (d === null) return <div key={i} className="aspect-square" />
            const evs = actividadesDe(y, m, d)
            const esHoy = iso(y, m, d) === isoHoy
            const activo = d === sel
            return (
              <button
                key={i}
                onClick={() => setSel(d)}
                data-cursor="hover"
                className={`relative aspect-square rounded-xl flex flex-col items-center justify-start pt-2 gap-1 transition-all border ${
                  activo
                    ? "bg-ink-900 text-paper-50 border-ink-900"
                    : "border-transparent hover:border-ink-900/15 text-ink-800 hover:bg-paper-100"
                }`}
              >
                <span
                  className={`text-sm font-medium grid place-items-center w-7 h-7 rounded-full ${
                    esHoy && !activo ? "bg-spirit-500 text-paper-50" : ""
                  }`}
                >
                  {d}
                </span>
                {evs.length > 0 && (
                  <span className="flex items-center gap-0.5">
                    {evs.slice(0, 3).map((e, k) => (
                      <span
                        key={k}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: categoriaColor[e.categoria] }}
                      />
                    ))}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Leyenda */}
        <div className="mt-6 pt-5 border-t border-ink-900/10 flex flex-wrap gap-x-4 gap-y-2">
          {(Object.keys(categoriaColor) as Categoria[]).map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 text-[11px] text-ink-500">
              <span className="w-2 h-2 rounded-full" style={{ background: categoriaColor[c] }} />
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── Panel de detalle ───────────────────────────────────── */}
      <div className="lg:sticky lg:top-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${y}-${m}-${sel}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {sel >= 1 ? (
              <>
                <p className="eyebrow mb-5">
                  <span>
                    {new Date(y, m, sel).toLocaleDateString("es-PE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </p>
                {seleccionados.length > 0 ? (
                  <ul className="space-y-3">
                    {seleccionados.map((e, i) => (
                      <EventoCard key={i} e={e} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-ink-400 text-sm leading-relaxed border border-dashed border-ink-900/15 rounded-2xl p-6">
                    No hay actividades programadas este día. Elegí otra fecha o
                    revisá los próximos eventos.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="eyebrow mb-5"><span>Próximos eventos</span></p>
                <ul className="space-y-3">
                  {proximos.map((e, i) => (
                    <EventoCard key={i} e={e} mostrarFecha />
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function EventoCard({ e, mostrarFecha = false }: { e: Actividad; mostrarFecha?: boolean }) {
  const color = categoriaColor[e.categoria]
  return (
    <li className="relative rounded-2xl border border-ink-900/10 bg-paper-50 p-5 pl-6 overflow-hidden">
      <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: color }} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-ink-900 leading-tight">{e.titulo}</h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400 mt-1.5">
            {mostrarFecha && e.tipo === "special"
              ? new Date(e.fecha + "T00:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "long" }) + " · "
              : ""}
            {e.hora} · {e.lugar}
          </p>
        </div>
        <span
          className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
          style={{ background: `${color}1a`, color }}
        >
          {e.categoria}
        </span>
      </div>
      <p className="text-sm text-ink-500 leading-relaxed mt-3">{e.descripcion}</p>
    </li>
  )
}
