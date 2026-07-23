import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

interface HeroProps {
  sistemaUrl: string
  heroImg: string
}

export default function Hero({ sistemaUrl, heroImg }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] pt-32 lg:pt-40 pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Columna texto */}
          <motion.div style={{ y: textY }} className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="eyebrow mb-8"
            >
              <span>01 · Comunidad Cristiana</span>
              <span className="text-spirit-500">●</span>
              <span>Lima · Perú</span>
            </motion.p>

            <h1 className="font-display font-light text-[clamp(3rem,8.5vw,9rem)] leading-[0.95] text-ink-900 tracking-[-0.03em]">
              <WaveLine text="Renacer" delay={2.5} />
              <span className="block">
                <WaveLine text="para ver" delay={2.7} />
              </span>
              <span className="block italic font-normal text-spirit-500">
                <WaveLine text="el Reino." delay={2.9} variation="opsz" />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.4 }}
              className="mt-12 grid sm:grid-cols-[auto_1fr] gap-8 items-end max-w-xl"
            >
              <div className="flex flex-col gap-4">
                <a href="/en-vivo" className="btn-primary" data-cursor="hover">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                  </span>
                  <span>Ver en vivo</span>
                  <Arrow />
                </a>
                <a href="#servicios" className="btn-outline" data-cursor="hover">
                  <span>Actividades</span>
                  <Arrow />
                </a>
              </div>
              <p className="text-ink-500 text-sm leading-relaxed text-pretty">
                El reflejo del amor y comunidad de Cristo. Una familia que
                renace cada día para ver el Reino.
              </p>
            </motion.div>
          </motion.div>

          {/* Columna imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[60vh] lg:h-[78vh] img-frame rounded-[28px] overflow-hidden"
          >
            <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
              <motion.img
                src={heroImg}
                alt="Adoración Renacer"
                style={{ y: imgY, scale: imgScale }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-paper-50"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Juan 3:3
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
                / 2026
              </p>
            </motion.div>

            {/* Anillo decorativo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="absolute -top-8 -right-8 lg:top-6 lg:right-6 w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-paper-50/40 flex items-center justify-center text-paper-50"
            >
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                width="80%"
                height="80%"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path id="circle-path" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                </defs>
                <text className="font-mono" fontSize="6.5" letterSpacing="3" fill="currentColor">
                  <textPath href="#circle-path">
                    · RENACER · COMUNIDAD CRISTIANA · RNCR
                  </textPath>
                </text>
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicadores inferiores */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="mt-20 lg:mt-24 grid sm:grid-cols-3 gap-10 border-t border-ink-900/8 pt-10"
        >
          {[
            { k: "Sedes", v: "2", c: "Red nacional" },
            { k: "Ministerios", v: "6", c: "Áreas activas" },
            { k: "Año", v: "2023 - Hoy", c: "Visión vigente" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-3">
                {s.k}
              </p>
              <p className="font-display text-5xl text-ink-900 leading-none">{s.v}</p>
              <p className="text-xs text-ink-500 mt-2">{s.c}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function WaveLine({ text, delay = 0, variation }: { text: string; delay?: number; variation?: string }) {
  const chars = text.split("")
  return (
    <span className="inline-block" style={variation === "opsz" ? { fontVariationSettings: '"opsz" 144' } : undefined}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 1.1,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ marginRight: c === " " ? "0.25em" : undefined }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  )
}
