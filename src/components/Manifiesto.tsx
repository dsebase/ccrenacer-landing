import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useMemo, useRef } from "react"

const principios = [
  {
    n: "01",
    t: "Nuestra misión.",
    d: "Formar discípulos que renacen, crecen y son enviados a reflejar a Cristo en cada nación.",
    highlight: true,
  },
  {
    n: "02",
    t: "Nuestra visión.",
    d: "Ver una generación que renace y transforma su ciudad y las naciones para la gloria de Cristo.",
    highlight: true,
  },
  {
    n: "03",
    t: "La iglesia existe para los de afuera.",
    d: "Vivimos abiertos: a los que dudan, a los que vuelven, a los que aún no escucharon. Ningún renacido nace para sí mismo.",
    highlight: false,
  },
  {
    n: "04",
    t: "Cada renacido es enviado.",
    d: "El nuevo nacimiento no termina en nosotros. Continúa cuando vamos al barrio, a la ciudad, a las naciones.",
    highlight: false,
  },
]

interface ManifiestoProps {
  videoSrc?: string
  videoWebm?: string
  poster?: string
}

export default function Manifiesto({ videoSrc, videoWebm, poster }: ManifiestoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Forzar autoplay: algunos navegadores exigen muted vía propiedad JS, no atributo
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p) p.catch(() => {})
  }, [])

  const auroraY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  // Partículas pre-generadas para SSR estable
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: (i * 41) % 100,
        delay: (i * 0.7) % 8,
        duration: 9 + (i % 5) * 2,
        size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
      })),
    [],
  )

  return (
    <section
      id="manifiesto"
      ref={ref}
      className="relative py-32 lg:py-44 overflow-hidden bg-ink-950 text-paper-50 grain grain-dark"
    >
      {/* Video de fondo (reemplazable) con poster de fallback.
          z-0 (no negativo) para quedar por encima del bg-ink-950 de la sección. */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      </motion.div>

      {/* Tinte oscuro + cyan — suaves, para que el video se vea pero el texto siga legible */}
      <div className="absolute inset-0 z-[1] bg-ink-950/45" />
      <div
        className="absolute inset-0 z-[1] mix-blend-color opacity-25"
        style={{ background: "linear-gradient(135deg, #11a0c0, #179cda)" }}
      />
      {/* Gradiente solo en bordes para fundir con secciones vecinas */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink-950 via-transparent to-ink-950 opacity-80" />

      {/* Aurora líquida con parallax (sutil, el video ya aporta movimiento) */}
      <motion.div style={{ y: auroraY }} className="absolute inset-0 z-[1] opacity-25">
        <div className="aurora-liquid" />
      </motion.div>

      {/* Partículas */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 rounded-full bg-spirit-300"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `dust-rise ${p.duration}s ${p.delay}s linear infinite`,
              boxShadow: "0 0 8px rgba(124, 205, 236, 0.6)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow eyebrow-light text-spirit-200/80 mb-6">
              <span>02 · Manifiesto</span>
              <span className="text-spirit-400">●</span>
              <span>Quiénes somos</span>
            </p>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-[-0.025em] text-balance">
              Existimos<br />
              <span className="italic text-spirit-400">para esto.</span>
            </h2>
          </motion.div>

          {/* Versículo como ancla destacada */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8 border-l border-spirit-500/40"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-spirit-400 mb-4">
              / Juan 3:3 — nuestra ancla
            </p>
            <blockquote className="font-display italic text-2xl lg:text-3xl text-paper-100 leading-[1.25] text-pretty">
              "De cierto, de cierto te digo: el que no naciere de nuevo, no puede ver el reino de Dios."
            </blockquote>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
              — Jesús a Nicodemo
            </p>
          </motion.aside>
        </div>

        {/* Principios numerados. Los primeros dos (Misión + Visión) se resaltan
            con fondo tenue, texto en italic + spirit-400 y swap de colores en hover
            — mismo lenguaje visual que el cierre "Renacer no es metáfora". */}
        <ol className="grid sm:grid-cols-2 gap-px bg-ink-700/50 border border-ink-700/50 rounded-[28px] overflow-hidden">
          {principios.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative p-8 lg:p-12 transition-colors duration-700 ${
                p.highlight
                  ? "bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 hover:from-ink-950 hover:via-ink-900 hover:to-ink-950"
                  : "bg-ink-950 hover:bg-ink-900"
              }`}
              data-cursor="hover"
            >
              {p.highlight && (
                <span
                  className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-spirit-400/70 to-transparent"
                  aria-hidden="true"
                />
              )}
              <div className="flex items-start gap-6 lg:gap-8">
                <span
                  className={`font-mono text-xs tracking-[0.3em] mt-2 shrink-0 ${
                    p.highlight ? "text-spirit-300" : "text-spirit-400"
                  }`}
                >
                  {p.n}
                </span>
                <div className="flex-1">
                  {p.highlight ? (
                    <h3 className="font-display italic font-light text-3xl lg:text-4xl leading-[1.1] tracking-[-0.02em] mb-5 text-balance cursor-default">
                      <span className="text-spirit-400 transition-colors duration-500 group-hover:text-paper-50">
                        {p.t}
                      </span>
                    </h3>
                  ) : (
                    <h3 className="font-display font-light text-2xl lg:text-3xl text-paper-50 leading-[1.15] tracking-[-0.015em] mb-4 text-balance">
                      {p.t}
                    </h3>
                  )}
                  <p
                    className={`leading-relaxed text-pretty max-w-md ${
                      p.highlight ? "text-paper-100/85" : "text-ink-300"
                    }`}
                  >
                    {p.d}
                  </p>
                </div>
                <span
                  className={`transition-all duration-500 rotate-[-30deg] group-hover:rotate-0 shrink-0 mt-2 ${
                    p.highlight
                      ? "text-spirit-400 group-hover:text-paper-50"
                      : "text-spirit-400/50 group-hover:text-spirit-400"
                  }`}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Cierre memorable */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-20 lg:mt-28 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto h-px w-16 bg-spirit-400 mb-10"
          />
          <p className="group font-display italic text-3xl lg:text-5xl text-paper-50 leading-[1.1] text-balance cursor-default">
            <span className="transition-colors duration-500 group-hover:text-spirit-400">
              Renacer no es metáfora.
            </span>
            <br />
            <span className="text-spirit-400 transition-colors duration-500 group-hover:text-paper-50">
              Es nuestra razón de ser.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
