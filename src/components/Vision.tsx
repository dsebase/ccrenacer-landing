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
    <section
      id="vision"
      className="relative pt-40 lg:pt-52 pb-32 lg:pb-44 bg-paper-50"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Encabezado */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 mb-6 lg:mb-8 items-end">
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
                {/* Imagen de fondo — clara y nítida */}
                <img
                  src={p.img}
                  alt={p.t}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ${
                    on ? "scale-105" : "scale-100"
                  }`}
                  loading="lazy"
                />
                {/* Base oscura inferior para legibilidad (oscuro abajo → transparente arriba) */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                {/* Nebulosa celeste que emerge desde la base */}
                <motion.div
                  aria-hidden="true"
                  animate={{ opacity: on ? 0.9 : 0.55 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-x-0 bottom-0 h-3/4 mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 50% 120%, rgba(23,156,218,0.60) 0%, rgba(17,160,192,0.22) 40%, transparent 72%)",
                  }}
                />
                {/* Atenuado extra solo en paneles colapsados; se desvanece al activarse */}
                <motion.div
                  aria-hidden="true"
                  animate={{ opacity: on ? 0 : 0.4 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0 bg-ink-950"
                />

                {/* Número + flecha (siempre arriba) */}
                <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between lg:inset-x-8 lg:top-8">
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

                {isDesktop ? (
                  <>
                    {/* Colapsado: título en vertical, centrado abajo */}
                    <motion.div
                      aria-hidden={on}
                      animate={{ opacity: on ? 0 : 1 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center pb-8"
                    >
                      <h3 className="font-display text-xl text-paper-50 tracking-[-0.02em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                        {p.t}
                      </h3>
                    </motion.div>

                    {/* Expandido: título grande + descripción, anclado abajo (crossfade, sin reflow) */}
                    <motion.div
                      aria-hidden={!on}
                      animate={{ opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: on ? 0.12 : 0 }}
                      className="pointer-events-none absolute inset-x-8 bottom-8 z-10"
                    >
                      <h3 className="font-display text-3xl lg:text-4xl text-paper-50 tracking-[-0.02em] leading-[1.05] text-balance">
                        {p.t}
                      </h3>
                      <p className="mt-3 max-w-[46ch] text-sm lg:text-base leading-relaxed text-paper-100/85">
                        {p.d}
                      </p>
                    </motion.div>
                  </>
                ) : (
                  /* Móvil: acordeón vertical — título abajo, descripción se despliega */
                  <div className="absolute inset-x-6 bottom-6 z-10">
                    <h3 className="font-display text-2xl text-paper-50 tracking-[-0.02em] leading-[1.05] text-balance">
                      {p.t}
                    </h3>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden text-sm leading-relaxed text-paper-100/85"
                        >
                          {p.d}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.button>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
