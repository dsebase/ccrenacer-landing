import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "motion/react"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react"
import { createPortal } from "react-dom"

const principios = [
  {
    n: "01",
    label: "Visión",
    t: "Nuestra visión.",
    d: "Ser una iglesia a la imagen del Señor Jesucristo y fiel a la Palabra de Dios, haciendo todas las cosas con amor; llamados a manifestar el Reino de Dios en la tierra con poder y autoridad delegada por Jesucristo a su iglesia, y a sanar a todos los que sufren física, emocional y espiritualmente, para que el nombre de Dios sea exaltado en todas las naciones.",
    refs: [
      "1 Corintios 16:14",
      "Mateo 22:37-40",
      "Juan 13:34-35",
      "1 Juan 3:16",
      "1 Juan 4:8",
      "Mateo 12:28",
      "Marcos 16:17-20",
      "Marcos 16:17-18",
      "Juan 20:22-23",
      "Mateo 16:18-19",
    ],
  },
  {
    n: "02",
    label: "Misión",
    t: "Nuestra misión.",
    d: "La misión de la Iglesia es predicar el Evangelio a toda criatura, hacer discípulos y bautizar en el nombre del Padre, del Hijo y del Espíritu Santo, y enseñar a guardar todos los mandatos dados por Cristo.",
    refs: ["Marcos 16:15", "Mateo 28:19", "Mateo 28:20"],
  },
]

// Texto de cada versículo (Reina-Valera 1960) para el tooltip al hover/click.
const versiculos: Record<string, string> = {
  "1 Corintios 16:14": "Todas vuestras cosas sean hechas con amor.",
  "Mateo 22:37-40":
    "Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente. Este es el primero y grande mandamiento. Y el segundo es semejante: Amarás a tu prójimo como a ti mismo. De estos dos mandamientos depende toda la ley y los profetas.",
  "Juan 13:34-35":
    "Un mandamiento nuevo os doy: Que os améis unos a otros; como yo os he amado, que también os améis unos a otros. En esto conocerán todos que sois mis discípulos, si tuviereis amor los unos con los otros.",
  "1 Juan 3:16":
    "En esto hemos conocido el amor, en que él puso su vida por nosotros; también nosotros debemos poner nuestras vidas por los hermanos.",
  "1 Juan 4:8": "El que no ama, no ha conocido a Dios; porque Dios es amor.",
  "Mateo 12:28":
    "Pero si yo por el Espíritu de Dios echo fuera los demonios, ciertamente ha llegado a vosotros el reino de Dios.",
  "Marcos 16:17-20":
    "Y estas señales seguirán a los que creen: En mi nombre echarán fuera demonios; hablarán nuevas lenguas; tomarán en las manos serpientes, y si bebieren cosa mortífera, no les hará daño; sobre los enfermos pondrán sus manos, y sanarán. Y el Señor, después que les habló, fue recibido arriba en el cielo, y se sentó a la diestra de Dios. Y ellos, saliendo, predicaron en todas partes, ayudándoles el Señor y confirmando la palabra con las señales que la seguían. Amén.",
  "Marcos 16:17-18":
    "Y estas señales seguirán a los que creen: En mi nombre echarán fuera demonios; hablarán nuevas lenguas; tomarán en las manos serpientes, y si bebieren cosa mortífera, no les hará daño; sobre los enfermos pondrán sus manos, y sanarán.",
  "Juan 20:22-23":
    "Y habiendo dicho esto, sopló, y les dijo: Recibid el Espíritu Santo. A quienes remitiereis los pecados, les son remitidos; y a quienes se los retuviereis, les son retenidos.",
  "Mateo 16:18-19":
    "Y yo también te digo, que tú eres Pedro, y sobre esta roca edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella. Y a ti te daré las llaves del reino de los cielos; y todo lo que atares en la tierra será atado en los cielos, y todo lo que desatares en la tierra será desatado en los cielos.",
  "Marcos 16:15": "Y les dijo: Id por todo el mundo y predicad el evangelio a toda criatura.",
  "Mateo 28:19":
    "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo;",
  "Mateo 28:20":
    "enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.",
}

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

  // Detectar móvil / reduced-motion para aligerar la sección en teléfonos.
  const [lite, setLite] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 768px), (prefers-reduced-motion: reduce)",
    )
    const update = () => setLite(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Autoplay robusto: muchos móviles rechazan el primer play() (modo ahorro de
  // energía/datos) y se quedan en el poster. Reintentamos cuando el video está
  // listo, cuando entra en viewport y al primer toque del usuario.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const tryPlay = () => {
      const p = v.play()
      if (p) p.catch(() => {})
    }
    tryPlay()
    v.addEventListener("canplay", tryPlay)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && tryPlay()),
      { threshold: 0.1 },
    )
    io.observe(v)
    const onTouch = () => tryPlay()
    window.addEventListener("touchstart", onTouch, { once: true, passive: true })
    return () => {
      v.removeEventListener("canplay", tryPlay)
      io.disconnect()
      window.removeEventListener("touchstart", onTouch)
    }
  }, [])

  const auroraY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const videoScaleRaw = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  // En móvil dejamos el video estático: re-escalar un video 1080p en cada frame
  // de scroll es lo que más lag genera en teléfonos.
  const videoScale = lite ? 1 : videoScaleRaw

  // Partículas pre-generadas para SSR estable (muchas menos en móvil).
  const particles = useMemo(
    () =>
      Array.from({ length: lite ? 6 : 22 }, (_, i) => ({
        id: i,
        left: (i * 41) % 100,
        delay: (i * 0.7) % 8,
        duration: 9 + (i % 5) * 2,
        size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
      })),
    [lite],
  )

  return (
    <section
      id="manifiesto"
      ref={ref}
      className="relative py-28 lg:py-44 overflow-hidden bg-ink-950 text-paper-50 grain grain-dark"
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

      {/* Aurora líquida con parallax (sutil, el video ya aporta movimiento).
          Se omite en móvil para aligerar la GPU. */}
      {!lite && (
        <motion.div style={{ y: auroraY }} className="absolute inset-0 z-[1] opacity-25">
          <div className="aurora-liquid" />
        </motion.div>
      )}

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
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-14 items-end mb-10 lg:mb-14">
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
            <h2 className="font-display font-light text-[clamp(2rem,4.5vw,4.25rem)] leading-[1] tracking-[-0.025em] text-balance">
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
            <blockquote className="font-display italic text-xl lg:text-2xl text-paper-100 leading-[1.25] text-pretty">
              "De cierto, de cierto te digo: el que no naciere de nuevo, no puede ver el reino de Dios."
            </blockquote>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
              — Jesús a Nicodemo
            </p>
          </motion.aside>
        </div>

        {/* Visión + Misión — tarjetas con spotlight que sigue el cursor,
            ícono animado, número fantasma y referencias como chips. */}
        <ol className="grid grid-cols-1 gap-px bg-ink-700/50 border border-ink-700/50 rounded-[28px] overflow-hidden">
          {principios.map((p, i) => (
            <PrincipioCard key={p.n} p={p} i={i} />
          ))}
        </ol>

        {/* Cierre memorable */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-14 lg:mt-20 text-center"
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
              Renacer; más que una Iglesia
            </span>
            <br />
            <span className="text-spirit-400 transition-colors duration-500 group-hover:text-paper-50">
              Una relación con Cristo.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function PrincipioCard({
  p,
  i,
}: {
  p: (typeof principios)[number]
  i: number
}) {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const spotlight = useMotionTemplate`radial-gradient(440px circle at ${mx}px ${my}px, rgba(23,156,218,0.18), transparent 72%)`
  const [tip, setTip] = useState<{ ref: string; x: number; y: number } | null>(null)
  // Desktop (con hover) → tooltip; móvil (sin hover) → panel inferior.
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches)
  }, [])

  // Cerrar el versículo al hacer scroll o al rotar/redimensionar.
  useEffect(() => {
    if (!tip) return
    const close = () => setTip(null)
    window.addEventListener("scroll", close, { passive: true })
    window.addEventListener("resize", close)
    return () => {
      window.removeEventListener("scroll", close)
      window.removeEventListener("resize", close)
    }
  }, [tip])

  function handleMove(e: ReactMouseEvent<HTMLLIElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  // Posición del tooltip: centrado sobre el chip, sin salirse de la pantalla.
  function tipFor(ref: string, el: HTMLElement) {
    const rc = el.getBoundingClientRect()
    const half = 170
    const x = Math.min(
      Math.max(rc.left + rc.width / 2, half + 8),
      window.innerWidth - half - 8,
    )
    return { ref, x, y: rc.top - 8 }
  }

  return (
    <motion.li
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden p-7 lg:p-10 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 transition-colors duration-700"
      data-cursor="hover"
    >
      {/* Spotlight que sigue el cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {/* Número fantasma de fondo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-2 select-none font-display italic leading-none text-[5rem] lg:text-[8.5rem] text-spirit-500/[0.06] transition-colors duration-700 group-hover:text-spirit-500/[0.13]"
      >
        {p.n}
      </span>
      {/* Hairline superior */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-spirit-400/50 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative grid lg:grid-cols-[0.8fr_1.8fr] gap-5 lg:gap-12 items-start">
        {/* Izquierda: label + título */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-spirit-400/80 mb-3">
            {p.label}
          </p>
          <h3 className="font-display italic font-light text-2xl lg:text-4xl leading-[1.05] tracking-[-0.02em] text-balance cursor-default">
            <span className="text-spirit-400 transition-colors duration-500 group-hover:text-paper-50">
              {p.t}
            </span>
          </h3>
        </div>

        {/* Derecha: texto + referencias con versículo emergente */}
        <div>
          <p className="text-paper-100/85 leading-relaxed text-[15px] lg:text-base text-justify hyphens-auto">
            {p.d}
          </p>
          <div
            className="mt-6"
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setTip(null)
            }}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-3">
              / Fundamento bíblico
            </span>
            <div className="flex flex-wrap gap-2">
              {p.refs.map((r, j) => (
                <motion.button
                  key={r}
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + j * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  // Desktop: mostrar al pasar el mouse (solo pointerType mouse).
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setTip(tipFor(r, e.currentTarget))
                  }}
                  // Móvil/click: toggle. Leemos currentTarget de forma SÍNCRONA
                  // (fuera del updater) — si no, React lo pone null y crashea.
                  onClick={(e) => {
                    const next = tipFor(r, e.currentTarget)
                    setTip((t) => (t?.ref === r ? null : next))
                  }}
                  aria-expanded={tip?.ref === r}
                  data-cursor="hover"
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide transition-all duration-300 ${
                    tip?.ref === r
                      ? "-translate-y-0.5 border-spirit-400/70 bg-spirit-500/10 text-spirit-200"
                      : "border-ink-700 bg-ink-900/50 text-ink-300 hover:-translate-y-0.5 hover:border-spirit-400/60 hover:text-spirit-300"
                  }`}
                >
                  {r}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Versículo emergente (portal). Desktop: tooltip que sigue al chip.
          Móvil: panel inferior (bottom sheet) con botón de cerrar y fondo
          tocable; se cierra también al hacer scroll. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {tip && versiculos[tip.ref] && canHover && (
              <motion.div
                key="verse-tip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  left: tip.x,
                  top: tip.y,
                  translate: "-50% -100%",
                  zIndex: 60,
                  pointerEvents: "none",
                }}
                className="w-[min(340px,82vw)] rounded-2xl border border-ink-900/10 bg-paper-50 p-4 shadow-2xl shadow-black/40 ring-1 ring-black/5"
              >
                <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.25em] text-spirit-600">
                  {tip.ref}
                </span>
                <span className="block font-display italic text-sm leading-relaxed text-ink-800">
                  {versiculos[tip.ref]}
                </span>
              </motion.div>
            )}

            {tip && versiculos[tip.ref] && !canHover && (
              <motion.div
                key="verse-sheet"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="fixed inset-0 z-[60] flex items-end bg-ink-950/70"
                onClick={() => setTip(null)}
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "tween", duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full rounded-t-3xl bg-paper-50 p-6 pb-9 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-ink-900/15" />
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-spirit-600 pt-1.5">
                      {tip.ref}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTip(null)}
                      aria-label="Cerrar"
                      className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/15 text-ink-500 transition-colors active:bg-ink-900 active:text-paper-50"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="font-display italic text-base leading-relaxed text-ink-800 text-pretty">
                    {versiculos[tip.ref]}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.li>
  )
}
