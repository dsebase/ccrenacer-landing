import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

// ── Datos del modal "Conocer Renacer I a III" (Paso I) ───────────────
// Portadas en: landing/public/img/rncri.PNG · rncrii.PNG · rncriii.PNG (respetar mayúsculas)
const renacerBooks = [
  {
    n: "1",
    t: "Mi encuentro con Jesús",
    img: "/img/rncri.PNG",
    d: `Tiene como punto de partida el aceptar que necesitamos una nueva vida y el inicio de un cambio radical. En toda comunidad de fe es llamado un "nuevo nacimiento". Hablar sobre el nuevo nacimiento es tratar de comprender el pensamiento de la generación en este siglo XXI, donde la mayoría de las personas hablan de las emociones y de cada experiencia o sensación que tienen en la vida. "Mi encuentro con Jesús" es más que una experiencia, emoción y sensación especial. Este encuentro nos lleva a pensar en un cambio interior y profundo, que solo ocurre cuando llegamos a Él.`,
  },
  {
    n: "2",
    t: "De la mano con Jesús",
    img: "/img/rncrii.PNG",
    d: `Una de las razones por las cuales decidimos poner el nombre a este segundo manual de discipulado, "De la mano con Jesús", es justamente por esta nueva y hermosa etapa que tenemos como hijos de Dios: nos permite saber que sin Él es imposible caminar. Su guía nos da seguridad. Decidir depender de nuestro Señor Jesús es cada día dar a conocer el gran amor de Dios y afirmar nuestros pasos en una nueva vida en Cristo. Nos agrada saber que Dios siempre ha estado pendiente de nosotros: "Porque yo, Jehová, soy tu Dios, quien te sostiene de la mano derecha y te dice: No temas, yo te ayudaré".`,
  },
  {
    n: "3",
    t: "Creciendo con Jesús",
    img: "/img/rncriii.PNG",
    d: `Es importante reconocer que, cuando nos referimos a crecer con Jesús, implica acción, continuidad y progreso. Cuando caminamos con alguien, pasamos tiempo con la persona y afirmamos una buena relación de amistad. Imaginar la importancia y lo sublime que es caminar y crecer con Jesús nos lleva a comprender que nunca estamos solos. Crecer con Jesús es mirar la vida cristiana desde una realidad Cristo-céntrica. Caminemos seguros bajo el abrigo del Altísimo. Gracia y paz.`,
  },
]

const cronograma = [
  "Agosto – Octubre 2026",
  "Febrero – Abril 2027",
  "Junio – Agosto 2027",
  "Octubre – Diciembre 2027",
]

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
              <h3 className="font-display text-3xl leading-[1.03] text-ink-900 tracking-[-0.025em]">
                {s.title}
                <span className="block italic text-spirit-500">{s.italic}</span>
              </h3>
              <p className="mt-5 text-ink-500 leading-relaxed text-justify hyphens-auto">{s.desc}</p>
              {s.n === "I" && <RenacerModal />}

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
                  className="btn-primary btn-compact"
                >
                  <span>{s.cta}</span>
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
  // Solo la etapa realmente visible captura clics; las difuminadas dejan
  // pasar el puntero (si no, la última etapa tapa a las demás y nada es clickeable).
  const stagePE = useTransform(stageOp, (o) => (o > 0.5 ? "auto" : "none"))

  const step = index + 1

  return (
    <motion.div style={{ opacity: stageOp, pointerEvents: stagePE }} className="absolute inset-0">
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
      <p className={`font-mono text-xs uppercase tracking-[0.3em] ${accent} mb-3`}>
        Paso {stage.n}
      </p>
      <h3 className={`font-display text-[clamp(1.5rem,3vw,3rem)] leading-[1.02] tracking-[-0.025em] ${text}`}>
        {stage.title}
        <span className={`block italic ${accent}`}>{stage.italic}</span>
      </h3>
      <p className={`mt-4 text-sm leading-[1.65] max-w-xl text-justify hyphens-auto ${muted}`}>
        {stage.desc}
      </p>
      {stage.n === "I" && <RenacerModal />}
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
        className="btn-light btn-compact shrink-0"
        data-cursor="hover"
      >
        <span>{stage.cta}</span>
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

      {/* Numeral gigante decorativo — posicionado dentro del marco (right/​top
          positivos) para que el "III" no se corte y se lea completo. */}
      <motion.div
        style={{ opacity: numeralOp, scale: numeralSc }}
        className="absolute top-6 right-6 lg:top-10 lg:right-12 pointer-events-none"
        aria-hidden
      >
        <span className="font-display italic font-light text-paper-50 text-[22vw] lg:text-[15vw] leading-none">
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
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-spirit-300 mb-3">
            Paso {stage.n}
          </p>
          <h3 className="font-display text-[clamp(1.75rem,3.8vw,3.75rem)] leading-[1.03] tracking-[-0.025em]">
            {stage.title}
            <span className="block italic text-spirit-300">{stage.italic}</span>
          </h3>
          <p className="mt-4 text-sm text-paper-100/90 leading-[1.65] max-w-xl text-justify hyphens-auto">
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

// ──────────────────────────────────────────────────────────────
// Portada de libro. Las imágenes son 1920×1080 con la portada real (vertical)
// pegada arriba-izquierda y el resto en negro; recortamos SOLO la portada
// con background-size/position para que encaje limpia en el lienzo vertical.
function BookCover({ n, img }: { n: string; img: string }) {
  return (
    <div
      role="img"
      aria-label={`Portada Renacer ${n}`}
      className="w-full sm:w-44 aspect-[2/3] rounded-lg overflow-hidden shadow-md bg-paper-200 shrink-0"
      style={{
        backgroundImage: `url("${img}")`,
        backgroundSize: "305% auto",
        backgroundPosition: "2% 46%",
        backgroundRepeat: "no-repeat",
      }}
    />
  )
}

// ──────────────────────────────────────────────────────────────
// Modal "Conocer Renacer I a III" — botón + ventana emergente (portal).
function RenacerModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-primary btn-compact mt-5 self-start"
        aria-haspopup="dialog"
        data-cursor="hover"
      >
        <span>Conocer Renacer I a III</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Renacer I a III">
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-ink-950/90 backdrop-blur-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setOpen(false)}
                />
                {/* Contenido */}
                <div className="absolute inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none">
                  <motion.div
                    className="relative w-full sm:max-w-3xl bg-paper-50 rounded-t-[28px] sm:rounded-[28px] shadow-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden pointer-events-auto"
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-6 lg:p-8 border-b border-ink-900/10">
                      <div>
                        <p className="eyebrow mb-3">
                          <span>Paso I · Educación Cristiana</span>
                        </p>
                        <h3 className="font-display font-light text-2xl lg:text-3xl text-ink-900 tracking-[-0.02em] leading-tight">
                          Renacer <span className="italic text-spirit-500">I a III</span>
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="shrink-0 w-10 h-10 rounded-full border border-ink-900/15 flex items-center justify-center text-ink-500 hover:bg-ink-900 hover:text-paper-50 hover:border-ink-900 transition-all"
                        aria-label="Cerrar"
                        data-cursor="hover"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Cuerpo scrollable */}
                    <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 space-y-8">
                      {renacerBooks.map((b) => (
                        <article key={b.n} className="grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-6 items-start">
                          <BookCover n={b.n} img={b.img} />
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-spirit-500 mb-2">
                              Renacer {b.n}
                            </p>
                            <h4 className="font-display italic text-xl lg:text-2xl text-ink-900 tracking-[-0.01em] mb-3">
                              "{b.t}"
                            </h4>
                            <p className="text-ink-600 text-sm leading-relaxed text-justify hyphens-auto">
                              {b.d}
                            </p>
                          </div>
                        </article>
                      ))}

                      {/* Cronograma */}
                      <div className="border-t border-ink-900/10 pt-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-4">
                          / Cronograma discipulado Renacer
                        </p>
                        <ol className="grid sm:grid-cols-2 gap-3">
                          {cronograma.map((c, i) => (
                            <li
                              key={c}
                              className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-paper-100 px-4 py-3"
                            >
                              <span className="shrink-0 w-7 h-7 rounded-full bg-ink-900 text-paper-50 font-mono text-xs flex items-center justify-center">
                                {i + 1}
                              </span>
                              <span className="font-medium text-ink-900 text-sm">{c}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 lg:p-8 border-t border-ink-900/10 bg-paper-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <p className="text-ink-500 text-sm max-w-md leading-snug">
                        <span className="text-ink-900 font-medium">¿Quieres empezar tu proceso?</span>{" "}
                        Inscríbete en la próxima edición del discipulado.
                      </p>
                      <a
                        href="#contacto"
                        onClick={() => setOpen(false)}
                        className="btn-primary shrink-0"
                        data-cursor="hover"
                      >
                        <span>Quiero inscribirme</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
