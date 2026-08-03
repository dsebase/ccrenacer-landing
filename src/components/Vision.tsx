import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { images } from "../lib/images"

// Cuatro pilares como paneles expansibles (acordeón). El activo se expande
// mostrando foto a color + descripción; los demás se contraen.
const pilares = [
  {
    n: "01",
    t: "Amor de Cristo",
    d: "El amor que recibimos en la cruz nos transforma e impulsa a amar a Dios y al prójimo sin medida.",
    img: images.comunidad,
  },
  {
    n: "02",
    t: "Poder Sobrenatural de Dios",
    d: "Creemos en un Dios vivo que sana, libera y obra milagros por el poder de su Espíritu Santo.",
    img: images.misiones,
  },
  {
    n: "03",
    t: "Adoración",
    d: "Adoramos en espíritu y en verdad, rindiendo todo a Cristo como un estilo de vida.",
    img: images.adoracion,
  },
  {
    n: "04",
    t: "Hacer Discípulos",
    d: "Formamos seguidores de Jesús que crecen, maduran y son enviados a hacer más discípulos.",
    img: images.formacion,
  },
]

const EASE = [0.33, 1, 0.68, 1] as const

export default function Vision() {
  const [active, setActive] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return (
    <section id="vision" className="relative py-32 lg:py-44 bg-paper-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Encabezado */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 mb-12 lg:mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="eyebrow mb-6">
              <span>04 · Nuestros pilares</span>
            </p>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1] text-ink-900 tracking-[-0.025em] text-balance">
              Nuestra<br />
              <span className="italic text-spirit-500">base</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="text-ink-500 text-lg max-w-md leading-relaxed text-pretty"
          >
            Cuatro pilares sostienen lo que somos. Cada uno una expresión natural
            del Cristo que vive en nosotros.
          </motion.p>
        </div>

        {/* Acordeón de paneles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className={`flex gap-3 ${isDesktop ? "flex-row h-[520px]" : "flex-col"}`}
        >
          {pilares.map((p, i) => {
            const on = active === i
            return (
              <motion.button
                key={p.n}
                type="button"
                onMouseEnter={() => isDesktop && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                aria-label={p.t}
                data-cursor="hover"
                initial={false}
                animate={
                  isDesktop
                    ? { flexGrow: on ? 5 : 1 }
                    : { height: on ? 380 : 96 }
                }
                transition={{ duration: 0.6, ease: EASE }}
                style={isDesktop ? undefined : { flexGrow: 0, flexShrink: 0 }}
                className="group relative basis-0 min-w-0 overflow-hidden rounded-[28px] text-left outline-none ring-spirit-400/70 focus-visible:ring-2"
              >
                {/* Imagen de fondo */}
                <img
                  src={p.img}
                  alt={p.t}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    on ? "scale-100 opacity-75" : "scale-105 opacity-40"
                  }`}
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    on
                      ? "bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-ink-950/10"
                      : "bg-ink-950/70"
                  }`}
                />

                {/* Marca de agua de llama */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-8 -right-6 z-0 text-spirit-300/[0.12] transition-all duration-700 ${
                    on ? "scale-110 opacity-100" : "scale-90 opacity-60"
                  }`}
                >
                  <svg width="180" height="234" viewBox="0 0 200 260" fill="currentColor">
                    <path d="M100 8c-6 28-46 60-46 110a46 46 0 0 0 92 0c0-50-40-82-46-110z" />
                  </svg>
                </div>

                {/* Contenido */}
                <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 lg:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.3em] text-spirit-300">
                      {p.n}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: on ? 0 : -30, opacity: on ? 1 : 0.5 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="text-spirit-300"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </motion.span>
                  </div>

                  <div className="min-w-0">
                    <h3
                      className={`font-display text-paper-50 tracking-[-0.02em] leading-[1.05] text-balance ${
                        isDesktop && !on
                          ? "text-xl [writing-mode:vertical-rl] rotate-180 mx-auto whitespace-nowrap"
                          : "text-2xl lg:text-4xl"
                      }`}
                    >
                      {p.t}
                    </h3>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden text-sm lg:text-base leading-relaxed text-paper-100/85 max-w-[46ch]"
                        >
                          {p.d}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Cierre: declaración de formación */}
        <div className="mt-16 lg:mt-24 border-t border-ink-900/10 pt-12 lg:pt-16 grid lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-16 lg:items-center">
          <p className="eyebrow shrink-0">
            <span>Nuestra formación</span>
          </p>
          <p className="font-display font-light text-2xl lg:text-4xl text-ink-900 leading-[1.2] text-balance max-w-3xl">
            Acompañamos cada paso: del{" "}
            <span className="italic text-spirit-500">nuevo nacimiento al servicio</span>,
            con procesos de discipulado que forman el carácter de Cristo.
          </p>
          <a href="#proceso" className="btn-outline shrink-0 self-start lg:self-center" data-cursor="hover">
            <span>Conoce el proceso</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
