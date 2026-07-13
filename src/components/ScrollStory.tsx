import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react"
import { useRef } from "react"

interface Stage {
  n: string
  title: string
  italic: string
  desc: string
  img: string
  verse: string
  verseRef: string
  cta: string
}

interface Props {
  stages: Stage[]
}

type Variant = "A" | "B" | "C"

// Variantes por índice (cíclico): A → B → C
const variantOf = (i: number): Variant => (["A", "B", "C"][i % 3] as Variant)

export default function ScrollStory({ stages }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const smooth = useSpring(scrollYProgress, { damping: 45, stiffness: 70, mass: 0.6 })
  const progressX = useTransform(smooth, [0, 1], ["0%", "100%"])

  const total = stages.length

  return (
    <div id="proceso">
      {/* ───────── MOBILE · versión apilada (sin sticky) ───────── */}
      <MobileStages stages={stages} total={total} />

      {/* ───────── DESKTOP · animación sticky cinematográfica ───────── */}
      <section
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `${total * 100}vh` }}
      >
      <div className="sticky top-0 h-screen flex flex-col bg-paper-50 overflow-hidden">
        {/* Header sticky */}
        <div className="relative z-10 pt-28 lg:pt-32 px-6 lg:px-10 shrink-0">
          <div className="mx-auto max-w-[1400px] flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">
                <span>04 · El proceso de renacer</span>
              </p>
              <h2 className="mt-6 font-display font-light text-[clamp(2rem,5vw,5rem)] leading-[1] text-ink-900 max-w-3xl text-balance">
                Tres tiempos.<br />
                <span className="italic text-spirit-500">Un mismo Espíritu.</span>
              </h2>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
              <span>{total} pasos</span>
              <div className="w-40 h-px bg-ink-200 overflow-hidden">
                <motion.div style={{ width: progressX }} className="h-full bg-ink-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Stage canvas */}
        <div className="relative flex-1 px-6 lg:px-10 pb-10 pt-8 lg:pt-10 min-h-0">
          <div className="mx-auto max-w-[1400px] h-full relative">
            {stages.map((s, i) => (
              <FullStage
                key={i}
                stage={s}
                index={i}
                total={total}
                smooth={smooth}
                variant={variantOf(i)}
              />
            ))}
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// MOBILE · etapas apiladas como tarjetas normales
function MobileStages({ stages, total }: { stages: Stage[]; total: number }) {
  return (
    <section className="lg:hidden relative bg-paper-50 py-24">
      <div className="px-6">
        <p className="eyebrow mb-5"><span>04 · El proceso de renacer</span></p>
        <h2 className="font-display font-light text-[clamp(2.25rem,9vw,3.5rem)] leading-[1] text-ink-900 tracking-[-0.025em] mb-14">
          Tres tiempos.<br />
          <span className="italic text-spirit-500">Un mismo Espíritu.</span>
        </h2>

        <div className="space-y-16">
          {stages.map((s, i) => (
            <article key={i}>
              {/* Imagen + numeral + badge */}
              <div className="relative rounded-[24px] overflow-hidden bg-ink-900 mb-6">
                <img
                  src={s.img}
                  alt={s.title}
                  style={{ aspectRatio: "4/3" }}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/20" />
                <div className="absolute top-4 left-4">
                  <div className="surface-glass rounded-full px-3.5 py-1.5 inline-flex items-center gap-2.5">
                    <span className="font-display italic text-spirit-300 leading-none">{s.n}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-paper-100">
                      Paso {i + 1} de {total}
                    </span>
                  </div>
                </div>
                <span
                  className="absolute -bottom-4 right-2 font-display italic font-light text-paper-50/15 leading-none pointer-events-none"
                  style={{ fontSize: "9rem" }}
                  aria-hidden
                >
                  {s.n}
                </span>
              </div>

              {/* Texto */}
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-spirit-500 mb-4">
                Paso {s.n}
              </p>
              <h3 className="font-display text-4xl leading-[1] text-ink-900 tracking-[-0.025em]">
                {s.title}
                <span className="block italic text-spirit-500">{s.italic}</span>
              </h3>
              <p className="mt-5 text-ink-500 leading-relaxed text-pretty">{s.desc}</p>

              {/* Versículo + CTA */}
              <div className="mt-6 rounded-2xl border border-ink-900/10 bg-paper-100 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-spirit-500 mb-2.5">
                  / {s.verseRef}
                </p>
                <blockquote className="font-display italic text-ink-900 text-lg leading-[1.35] text-pretty mb-5">
                  "{s.verse}"
                </blockquote>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink-900 text-paper-50 font-mono text-[10px] uppercase tracking-[0.2em]"
                >
                  {s.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// Stage completo con su propia composición

function FullStage({
  stage,
  index,
  total,
  smooth,
  variant,
}: {
  stage: Stage
  index: number
  total: number
  smooth: MotionValue<number>
  variant: Variant
}) {
  const span = 1 / total
  const start = index / total
  const end = (index + 1) / total
  // Ventanas de fade amplias (35% del tramo a cada lado) → transición gradual
  const fadeIn = start + span * 0.35
  const fadeOut = end - span * 0.35

  // El primer slide ya debe estar visible/asentado al llegar (progreso 0),
  // y el último debe quedar visible al final (progreso 1). Así, al saltar con
  // el botón "Conoce el proceso" se ve el slide 1 de inmediato.
  const isFirst = index === 0
  const isLast = index === total - 1
  const txX = variant === "B" ? 28 : -28
  const imX = variant === "B" ? -24 : 24

  // Motion values comunes (hooks siempre al tope, antes de cualquier return)
  const stageOp = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0])
  const textY = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 0 : 24, 0, 0, isLast ? 0 : -24])
  const textX = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 0 : txX, 0, 0, isLast ? 0 : -txX])
  const imgScale = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 1 : 1.05, 1, 1, isLast ? 1 : 1.03])
  const imgX = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 0 : imX, 0, 0, isLast ? 0 : -imX])
  const numeralOp = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 0.18 : 0, 0.18, 0.18, isLast ? 0.18 : 0])
  const numeralSc = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 1 : 0.92, 1, 1, isLast ? 1 : 1.03])
  const verseY = useTransform(smooth, [start, fadeIn, fadeOut, end], [isFirst ? 0 : 20, 0, 0, isLast ? 0 : -20])

  const step = index + 1

  return (
    <motion.div style={{ opacity: stageOp }} className="absolute inset-0">
      {variant === "A" && (
        <LayoutA
          stage={stage}
          step={step}
          total={total}
          textY={textY}
          textX={textX}
          imgScale={imgScale}
          imgX={imgX}
          numeralOp={numeralOp}
          numeralSc={numeralSc}
          verseY={verseY}
        />
      )}
      {variant === "B" && (
        <LayoutB
          stage={stage}
          step={step}
          total={total}
          textY={textY}
          textX={textX}
          imgScale={imgScale}
          imgX={imgX}
          numeralOp={numeralOp}
          numeralSc={numeralSc}
          verseY={verseY}
        />
      )}
      {variant === "C" && (
        <LayoutC
          stage={stage}
          step={step}
          total={total}
          textY={textY}
          imgScale={imgScale}
          numeralOp={numeralOp}
          numeralSc={numeralSc}
          verseY={verseY}
        />
      )}
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────────
// Bloques compartidos

function TextBlock({
  stage,
  inverted = false,
  align = "left",
}: {
  stage: Stage
  inverted?: boolean
  align?: "left" | "right"
}) {
  const text = inverted ? "text-paper-50" : "text-ink-900"
  const muted = inverted ? "text-paper-100/85" : "text-ink-500"
  const accent = inverted ? "text-spirit-300" : "text-spirit-500"

  return (
    <div className={`flex flex-col justify-center h-full ${align === "right" ? "items-end text-right" : ""}`}>
      <p className={`font-mono text-xs uppercase tracking-[0.3em] ${accent} mb-6`}>
        Paso {stage.n}
      </p>
      <h3 className={`font-display text-[clamp(2.5rem,5.5vw,6rem)] leading-[1] tracking-[-0.025em] ${text}`}>
        {stage.title}
        <span className={`block italic ${accent}`}>{stage.italic}</span>
      </h3>
      <p className={`mt-8 text-lg leading-relaxed max-w-md text-pretty ${muted}`}>
        {stage.desc}
      </p>
    </div>
  )
}

function ImageBlock({
  stage,
  imgScale,
  numeralOp,
  numeralSc,
}: {
  stage: Stage
  imgScale: MotionValue<number>
  numeralOp: MotionValue<number>
  numeralSc: MotionValue<number>
}) {
  return (
    <div className="relative img-frame rounded-[28px] overflow-hidden bg-ink-900 h-full w-full">
      <motion.img
        src={stage.img}
        alt={stage.title}
        style={{ scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-ink-950/30 pointer-events-none" />

      <motion.div
        style={{ opacity: numeralOp, scale: numeralSc }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <span className="font-display italic font-light text-paper-50 text-[24vw] lg:text-[18vw] leading-none -translate-y-3">
          {stage.n}
        </span>
      </motion.div>
    </div>
  )
}

function Badge({ step, total, numeral }: { step: number; total: number; numeral: string }) {
  return (
    <div className="surface-glass rounded-full px-4 py-2 inline-flex items-center gap-3">
      <span className="font-display italic text-spirit-300 text-lg leading-none">{numeral}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-100">
        Paso {step} de {total}
      </span>
    </div>
  )
}

function VerseCard({ stage }: { stage: Stage }) {
  return (
    <div className="surface-glass rounded-2xl p-6 lg:p-7 grid sm:grid-cols-[1fr_auto] gap-5 items-end">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-spirit-300 mb-3">
          / {stage.verseRef}
        </p>
        <blockquote className="font-display italic text-paper-50 text-lg lg:text-xl leading-[1.35] text-pretty">
          "{stage.verse}"
        </blockquote>
      </div>
      <a
        href="#contacto"
        className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-paper-50 text-ink-900 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-spirit-500 transition-colors"
        data-cursor="hover"
      >
        {stage.cta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// LAYOUT A — texto-izquierda / imagen-derecha (Paso I)
function LayoutA({
  stage,
  step,
  total,
  textY,
  textX,
  imgScale,
  imgX,
  numeralOp,
  numeralSc,
  verseY,
}: {
  stage: Stage
  step: number
  total: number
  textY: MotionValue<number>
  textX: MotionValue<number>
  imgScale: MotionValue<number>
  imgX: MotionValue<number>
  numeralOp: MotionValue<number>
  numeralSc: MotionValue<number>
  verseY: MotionValue<number>
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 h-full">
      <motion.div style={{ y: textY, x: textX }} className="hidden lg:block">
        <TextBlock stage={stage} align="left" />
      </motion.div>

      <motion.div style={{ x: imgX }} className="relative h-full">
        <ImageBlock stage={stage} imgScale={imgScale} numeralOp={numeralOp} numeralSc={numeralSc} />

        <div className="absolute top-6 left-6 z-10">
          <Badge step={step} total={total} numeral={stage.n} />
        </div>

        <motion.div style={{ y: verseY }} className="absolute bottom-6 left-6 right-6 z-10">
          <VerseCard stage={stage} />
        </motion.div>
      </motion.div>

      {/* Mobile: texto debajo del badge */}
      <div className="lg:hidden">
        <TextBlock stage={stage} />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// LAYOUT B — imagen-izquierda / texto-derecha (Paso II, espejo)
function LayoutB({
  stage,
  step,
  total,
  textY,
  textX,
  imgScale,
  imgX,
  numeralOp,
  numeralSc,
  verseY,
}: {
  stage: Stage
  step: number
  total: number
  textY: MotionValue<number>
  textX: MotionValue<number>
  imgScale: MotionValue<number>
  imgX: MotionValue<number>
  numeralOp: MotionValue<number>
  numeralSc: MotionValue<number>
  verseY: MotionValue<number>
}) {
  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 h-full">
      <motion.div style={{ x: imgX }} className="relative h-full">
        <ImageBlock stage={stage} imgScale={imgScale} numeralOp={numeralOp} numeralSc={numeralSc} />

        <div className="absolute top-6 right-6 z-10">
          <Badge step={step} total={total} numeral={stage.n} />
        </div>

        <motion.div style={{ y: verseY }} className="absolute bottom-6 left-6 right-6 z-10">
          <VerseCard stage={stage} />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: textY, x: textX }} className="hidden lg:block">
        <TextBlock stage={stage} align="right" />
      </motion.div>

      <div className="lg:hidden">
        <TextBlock stage={stage} />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// LAYOUT C — imagen full-bleed con texto sobrepuesto (Paso III, clímax)
function LayoutC({
  stage,
  step,
  total,
  textY,
  imgScale,
  numeralOp,
  numeralSc,
  verseY,
}: {
  stage: Stage
  step: number
  total: number
  textY: MotionValue<number>
  imgScale: MotionValue<number>
  numeralOp: MotionValue<number>
  numeralSc: MotionValue<number>
  verseY: MotionValue<number>
}) {
  return (
    <div className="relative h-full rounded-[28px] overflow-hidden bg-ink-900">
      <motion.img
        src={stage.img}
        alt={stage.title}
        style={{ scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/60" />

      {/* Numeral gigante decorativo */}
      <motion.div
        style={{ opacity: numeralOp, scale: numeralSc }}
        className="absolute -bottom-20 -right-10 lg:-bottom-24 lg:-right-20 pointer-events-none"
        aria-hidden
      >
        <span className="font-display italic font-light text-paper-50 text-[40vw] lg:text-[30vw] leading-none">
          {stage.n}
        </span>
      </motion.div>

      {/* Badge top-left */}
      <div className="absolute top-6 left-6 z-10">
        <Badge step={step} total={total} numeral={stage.n} />
      </div>

      {/* Texto bottom-left overlay */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-8 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12 z-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end"
      >
        <div className="text-paper-50">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-spirit-300 mb-6">
            Paso {stage.n}
          </p>
          <h3 className="font-display text-[clamp(2.5rem,6vw,6.5rem)] leading-[1] tracking-[-0.025em]">
            {stage.title}
            <span className="block italic text-spirit-300">{stage.italic}</span>
          </h3>
          <p className="mt-6 text-lg text-paper-100/90 leading-relaxed max-w-lg text-pretty">
            {stage.desc}
          </p>
        </div>

        <motion.div style={{ y: verseY }}>
          <VerseCard stage={stage} />
        </motion.div>
      </motion.div>
    </div>
  )
}
