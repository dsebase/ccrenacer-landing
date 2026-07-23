import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "motion/react"
import { useEffect, useRef, useState } from "react"

interface CTAProps {
  sistemaUrl: string
  bgImg: string
}

export default function CTASistema({ sistemaUrl, bgImg }: CTAProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])
  const mockY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])

  return (
    <section
      id="sistema"
      ref={ref}
      className="relative py-32 lg:py-44 bg-ink-950 text-paper-50 overflow-hidden grain grain-dark"
    >
      {/* Background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 opacity-25">
        <img src={bgImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900/90 to-ink-950" />
      </motion.div>

      <div className="absolute inset-0 -z-0 opacity-60">
        <div className="aurora-liquid" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <p className="eyebrow eyebrow-light text-spirit-200 mb-6">
            <span>09 · Sistema interno</span>
            <span className="text-spirit-400">●</span>
            <span>Líderes & equipos</span>
          </p>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:items-end">
            <h2 className="font-display font-light text-[clamp(2.5rem,7vw,7rem)] leading-[0.98] tracking-[-0.025em]">
              Toda la iglesia,<br />
              <span className="italic text-spirit-400">en un panel.</span>
            </h2>
            <p className="text-paper-100/80 text-lg leading-relaxed text-pretty max-w-md">
              La plataforma con la que pastores y líderes gestionan personas,
              iglesias en casas, discipulado y más.
            </p>
          </div>
        </div>

        {/* Layout principal: contenido + mockup */}
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-center">
          {/* Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <FeatureGrid />

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href={sistemaUrl} target="_blank" rel="noopener" className="btn-spirit" data-cursor="hover">
                <span>Ingresar al sistema</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contacto"
                className="btn-outline-invert"
                data-cursor="hover"
              >
                Solicitar acceso
              </a>
            </div>

            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-300 flex items-center gap-3">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block w-1.5 h-1.5 rounded-full bg-spirit-400"
              />
              sistema.ccrenacer.com · acceso controlado
            </div>
          </motion.div>

          {/* Columna derecha: mockup */}
          <motion.div style={{ y: mockY }}>
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
function FeatureGrid() {
  const features = [
    { t: "Personas", d: "Fichas, milestones y seguimiento", icon: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM4 21v-2a6 6 0 0 1 12 0v2" },
    { t: "Iglesias en Casa", d: "Reuniones, miembros y bitácora", icon: "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" },
    { t: "Eventos", d: "Calendario, servicios y asistencia", icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
    { t: "Discipulado", d: "Programas, registros y avance", icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {features.map((f, i) => (
        <motion.div
          key={f.t}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="surface-glass rounded-2xl p-5"
        >
          <span className="text-spirit-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={f.icon} />
            </svg>
          </span>
          <p className="mt-4 font-display text-xl text-paper-50">{f.t}</p>
          <p className="mt-1 text-xs text-paper-100/60 leading-relaxed">{f.d}</p>
        </motion.div>
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
function DashboardMockup() {
  const nav = ["Dashboard", "Personas", "Iglesias en Casa", "Eventos", "Discipulado", "Reportes"]
  const stats = [
    { label: "Personas", value: 1247, delta: "+38" },
    { label: "Células", value: 42, delta: "+3" },
    { label: "Bautismos", value: 86, delta: "+12" },
  ]
  const bars = [45, 62, 50, 78, 70, 92, 84, 96]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="surface-glass rounded-[24px] p-3 lg:p-4 shadow-2xl"
      style={{ perspective: 1000 }}
    >
      <div className="rounded-[18px] bg-ink-900/80 border border-white/5 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="text-spirit-400">
              <svg width="16" height="20" viewBox="0 0 200 260" fill="currentColor">
                <path d="M100 8c-6 28-46 60-46 110a46 46 0 0 0 92 0c0-50-40-82-46-110z" />
              </svg>
            </span>
            <span className="font-display text-sm text-paper-50">Renacer · Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-spirit-300">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-spirit-400"
              />
              En vivo
            </span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-spirit-500/60" />
              <span className="w-2 h-2 rounded-full bg-spirit-300/40" />
              <span className="w-2 h-2 rounded-full bg-paper-100/20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr]">
          {/* Sidebar */}
          <div className="border-r border-white/5 py-3 px-2 space-y-1">
            {nav.map((n, i) => (
              <div
                key={n}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] ${
                  i === 0 ? "bg-spirit-500/15 text-spirit-200" : "text-paper-100/45"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-spirit-400" : "bg-paper-100/25"}`} />
                <span className="truncate">{n}</span>
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="p-3 sm:p-4 space-y-3">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-2">
              {stats.map((s, i) => (
                <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-paper-100/45 truncate">
                    {s.label}
                  </p>
                  <p className="font-display text-xl sm:text-2xl text-paper-50 leading-tight mt-1">
                    <Counter value={s.value} delay={0.3 + i * 0.15} />
                  </p>
                  <p className="font-mono text-[9px] text-spirit-400 mt-0.5">{s.delta} mes</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-paper-100/45">
                  Asistencia · 8 semanas
                </p>
                <p className="font-mono text-[9px] text-spirit-300">▲ 18%</p>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex-1 rounded-t-sm ${
                      i === bars.length - 1
                        ? "bg-gradient-to-t from-spirit-500 to-spirit-300"
                        : "bg-spirit-500/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mini activity row */}
            <div className="hidden sm:flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-spirit-500/20 flex items-center justify-center text-spirit-300 text-[9px] font-mono">
                  +3
                </span>
                <span className="text-[10px] text-paper-100/60">Nuevas personas hoy</span>
              </div>
              <span className="font-mono text-[9px] text-paper-100/40">hace 2 min</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Counter({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v).toLocaleString()))
    return () => unsub()
  }, [mv])

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, value, mv, delay])

  return <span ref={ref}>{display}</span>
}
