import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { createPortal } from "react-dom"
import { images } from "../lib/images"

const EASE = [0.33, 1, 0.68, 1] as const

// ─── Fase I · manuales de discipulado ────────────────────────────────
const renacerBooks = [
  {
    n: "1",
    t: "Mi encuentro con Jesús",
    img: "/img/rncri.PNG",
    d: `Punto de partida: aceptar que necesitamos una nueva vida e iniciar un cambio radical. "Mi encuentro con Jesús" es más que una experiencia o emoción especial; nos lleva a un cambio interior y profundo que solo ocurre cuando llegamos a Él.`,
  },
  {
    n: "2",
    t: "De la mano con Jesús",
    img: "/img/rncrii.PNG",
    d: `Esta nueva etapa como hijos de Dios nos permite saber que sin Él es imposible caminar. Decidir depender de nuestro Señor Jesús es afirmar cada día nuestros pasos en una nueva vida en Cristo, seguros de que Él nos sostiene de la mano.`,
  },
  {
    n: "3",
    t: "Creciendo con Jesús",
    img: "/img/rncriii.PNG",
    d: `Crecer con Jesús implica acción, continuidad y progreso. Es mirar la vida cristiana desde una realidad Cristo-céntrica, caminando seguros bajo el abrigo del Altísimo. Nunca estamos solos. Gracia y paz.`,
  },
]

// ─── Fase II · Escuela de Líderes ────────────────────────────────────
const fundamentos = [
  "Un conocimiento sólido de las Sagradas Escrituras.",
  "La investidura del poder por el bautismo con el Espíritu Santo.",
  "Un aprobado carácter cristiano y ministerial, fruto de un corazón amoroso y obediente al Señor, y de una constante llenura del Espíritu Santo en una vida de santidad.",
]

const indiceLideres: { t: string; m?: string }[] = [
  { t: "La Visión y objetivos del líder", m: "Presencial" },
  { t: "El llamado de Dios a liderar", m: "Virtual" },
  { t: "El corazón de un líder", m: "Virtual" },
  { t: "¡Tengo un sueño!", m: "Virtual" },
  { t: "Planeación estratégica", m: "Virtual" },
  { t: "Cultivando la habilidad de tratar con la gente", m: "Virtual" },
  { t: "Prioridades y toma de decisiones", m: "Virtual" },
  { t: "Una cultura de adoración", m: "Presencial" },
  { t: "Delegar tareas y desarrollar personas" },
  { t: "Midiendo su crecimiento en el liderazgo" },
  { t: "El liderazgo inicia con una actitud" },
  { t: "El círculo íntimo del líder" },
  { t: "Los cinco niveles de liderazgo" },
  { t: "El liderazgo es mayordomía" },
  { t: "Liderando diferentes personalidades" },
  { t: "Su decisión determina su destino" },
  { t: "El líder como entrenador: formando un equipo eficiente" },
  { t: "El fin último del liderazgo: cumplir la Gran Comisión" },
  { t: "La Gran Comisión", m: "Presencial" },
]

// ─── Fase III · Seminario Teológico ──────────────────────────────────
const certificados = [
  { t: "Certificado de Estudios Teológicos", meta: "1 año · 30 h crédito" },
  { t: "Asociado de Estudios Teológicos", meta: "2 años · 60 h crédito" },
  { t: "Diploma Ministerial", meta: "3 años · 90 h crédito" },
  { t: "Licenciatura de Estudios Teológicos", meta: "4 años · 120 h crédito" },
]

const cicloI = [
  "Los tiempos de Dios",
  "Teología propia: estudio sistemático de la existencia de Dios",
  "Doctrina de la autoridad de Cristo",
  "Libro de Esdras",
  "Historia desde la perspectiva providencial",
]
const cicloII = [
  "El poder de la sangre",
  "Gálatas: una epístola exhortativa para vivir una vida que agrade a Dios",
  "Joel",
  "Cristofanía",
  "Escatología",
]

// ─── Tarjetas de fase (resumen visible en la sección) ────────────────
const fases = [
  {
    n: "I",
    kicker: "Fase I",
    t: "Educación Cristiana",
    sub: "Renacer I a III",
    d: "Los primeros pasos de la vida cristiana: encuentro, dependencia y crecimiento con Jesús.",
    meta: "3 manuales · Discipulado base",
    img: images.encuentro,
  },
  {
    n: "II",
    kicker: "Fase II",
    t: "Escuela de Líderes",
    sub: "Formación ministerial",
    d: "Capacitación bíblica y formación de carácter para servir con excelencia en el ministerio.",
    meta: "Híbrido · 5 meses",
    img: images.discipulado,
  },
  {
    n: "III",
    kicker: "Fase III",
    t: "Seminario Teológico",
    sub: "Renacer",
    d: "Formación teológica superior con certificación, en convenio con Dayspring Theological University.",
    meta: "Virtual · Convenio D.T.U.",
    img: images.envio,
  },
]

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

// Bloques reutilizables para el contenido del modal (tema claro, didáctico)
function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-spirit-600 mb-3">{children}</p>
}
function Bloque({ children }: { children: React.ReactNode }) {
  return <section className="border-t border-ink-900/10 pt-7">{children}</section>
}
function Titulo({ children }: { children: React.ReactNode }) {
  return <h4 className="font-display text-xl lg:text-2xl text-ink-900 tracking-[-0.01em] leading-tight mb-4">{children}</h4>
}

// Tarjeta de fase con tilt 3D + spotlight que sigue el cursor + profundidad.
function PhaseCard({
  f,
  i,
  onOpen,
}: {
  f: (typeof fases)[number]
  i: number
  onOpen: () => void
}) {
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)")
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Rotación y desfase base → collage "desordenado" (solo en pantallas anchas)
  const rot = wide ? ([-5, 3.5, -2.5][i] ?? 0) : 0
  const off = wide ? ([18, -6, 26][i] ?? 0) : 0

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      data-cursor="hover"
      initial={{ opacity: 0, y: 60, rotate: rot }}
      whileInView={{ opacity: 1, y: off, rotate: rot }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay: i * 0.12, ease: EASE }}
      whileHover={{
        rotate: 0,
        y: off - 18,
        scale: 1.05,
        zIndex: 30,
        transition: { duration: 0.4, ease: EASE },
      }}
      whileTap={{ scale: 1.02 }}
      className="group relative block h-[clamp(320px,42vh,430px)] w-full transform-gpu rounded-[20px] shadow-2xl shadow-ink-950/60 ring-1 ring-white/10"
    >
      {/* Capa de recorte con fondo oscuro → nunca hay marco de imagen */}
      <div className="absolute inset-0 isolate overflow-hidden rounded-[20px] bg-ink-950">
      {/* Foto — se atenúa de forma uniforme al seleccionar (sin bordes) */}
      <img
        src={f.img}
        alt={f.t}
        className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 group-hover:opacity-25"
        loading="lazy"
      />
      {/* Tinte base para legibilidad de la etiqueta */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950/30 transition-opacity duration-500 group-hover:opacity-0" />

      {/* Etiqueta siempre visible: número + fase */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-2.5 p-4 transition-opacity duration-300 group-hover:opacity-0">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-spirit-400/50 bg-ink-950/50 font-display text-spirit-200 backdrop-blur-sm">
          {f.n}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-50 drop-shadow">
          {f.kicker}
        </span>
      </div>

      {/* Panel que aparece al seleccionar (hover): título, descripción y CTA. */}
      <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {/* Degradado inferior solo para legibilidad del texto (la imagen ya está atenuada) */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-spirit-300">
            {f.kicker}
          </span>
          <h3 className="mt-2 font-display text-2xl lg:text-3xl text-paper-50 leading-tight tracking-[-0.02em]">
            {f.t}
          </h3>
          <p className="mt-1 font-display italic text-spirit-300">{f.sub}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper-100/80 text-pretty">{f.d}</p>
          <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-100/60">
              {f.meta}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-spirit-300">
              Ver contenido <Arrow />
            </span>
          </div>
        </div>
        </div>
      </div>
      </div>
    </motion.button>
  )
}

export default function Formacion() {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    document.addEventListener("keydown", onKey)
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = ""
    }
  }, [open])

  return (
    <section
      id="proceso"
      className="relative flex min-h-[100svh] snap-start flex-col justify-center overflow-hidden bg-ink-950 text-paper-50 py-16 [scroll-margin-top:-120px] lg:py-20"
    >
      {/* ── Fondo degradado CSS (sin WebGL) — imita el mesh oscuro con glow
             celeste. Evita el bug de "negro" por pérdida de contexto WebGL. ── */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(75% 55% at 47% 38%, rgba(23,156,218,0.16), transparent 62%), radial-gradient(115% 85% at 50% 30%, rgba(14,66,86,0.55), rgba(10,37,48,0.26) 45%, transparent 74%), radial-gradient(85% 65% at 63% 84%, rgba(12,60,80,0.32), transparent 68%), #060f16",
        }}
      />

      {/* ── Contenido ── */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20 items-end mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="eyebrow eyebrow-light text-spirit-200/80 mb-6">
              <span>06 · Nuestra formación</span>
              <span className="text-spirit-400">●</span>
              <span>El proceso de renacer</span>
            </p>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-[-0.025em] text-balance">
              Nuestro proceso<br />
              <span className="italic text-spirit-400">formativo.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="text-paper-100/70 text-lg max-w-md leading-relaxed text-pretty"
          >
            Tres fases progresivas que acompañan cada paso: del nuevo nacimiento
            al ministerio. Explora cada etapa para conocer su propósito, contenido
            y alcance.
          </motion.p>
        </div>

        {/* Fases — collage de fotos; al seleccionar aparece toda la info */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {fases.map((f, i) => (
            <PhaseCard key={f.n} f={f} i={i} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </div>

      {/* ── Modal por fase ── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <motion.div
                key="formacion-modal"
                className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                role="dialog"
                aria-modal="true"
                aria-label={`${fases[open].kicker} · ${fases[open].t}`}
              >
                <div
                  className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
                  onClick={() => setOpen(null)}
                />
                <motion.div
                  className="scroll-fine relative w-full sm:max-w-3xl max-h-[92dvh] sm:max-h-[88dvh] overflow-y-auto rounded-t-[28px] bg-paper-50 shadow-2xl shadow-black/50 sm:rounded-[28px]"
                  initial={{ opacity: 0, y: 60, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* Cabecera fija */}
                  <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink-900/10 bg-paper-50/95 px-6 py-5 backdrop-blur sm:px-8">
                    <div>
                      <p className="eyebrow mb-2"><span>{fases[open].kicker} · Nuestra formación</span></p>
                      <h3 className="font-display text-xl sm:text-2xl text-ink-900 tracking-[-0.02em] leading-tight">
                        {fases[open].t} <span className="italic text-spirit-500">{fases[open].sub}</span>
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(null)}
                      aria-label="Cerrar"
                      data-cursor="hover"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/15 text-ink-500 transition-colors hover:bg-ink-900 hover:text-paper-50"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="px-6 py-8 sm:px-8 space-y-8">
                    {open === 0 && <ContenidoFaseI />}
                    {open === 1 && <ContenidoFaseII />}
                    {open === 2 && <ContenidoFaseIII />}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Contenido de cada fase (tema claro, didáctico)
// ─────────────────────────────────────────────────────────────────────

function ContenidoFaseI() {
  return (
    <>
      <p className="text-ink-600 leading-relaxed text-pretty">
        Nuestro deseo como iglesia es enseñar los principios bíblicos que
        fundamentan la fe y fortalecer los primeros pasos del crecimiento
        espiritual. El discipulado inicial se desarrolla a través de tres
        manuales:
      </p>
      {renacerBooks.map((b) => (
        <Bloque key={b.n}>
          <div className="grid items-start gap-5 sm:grid-cols-[auto_1fr] sm:gap-6">
            {/* Portada recortada: muestra solo el libro (imagen 16:9 con zoom) */}
            <div
              role="img"
              aria-label={`Portada Renacer ${b.n}`}
              className="mx-auto aspect-[2/3] w-32 shrink-0 overflow-hidden rounded-lg shadow-md ring-1 ring-ink-900/10 sm:mx-0 sm:w-40"
              style={{
                backgroundImage: `url("${b.img}")`,
                backgroundSize: "305% auto",
                backgroundPosition: "2% 46%",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div>
              <Kicker>Renacer {b.n}</Kicker>
              <h4 className="mb-2 font-display text-xl text-ink-900 tracking-[-0.01em]">{b.t}</h4>
              <p className="text-sm leading-relaxed text-ink-600 text-pretty">{b.d}</p>
            </div>
          </div>
        </Bloque>
      ))}
    </>
  )
}

function ContenidoFaseII() {
  return (
    <>
      {/* Versículo ancla */}
      <blockquote className="border-l-2 border-spirit-400 pl-5">
        <p className="font-display italic text-lg text-ink-800 leading-relaxed text-pretty">
          "Haz todo lo posible por presentarte delante de Dios como un hombre de
          valor comprobado, como un trabajador que no tiene de qué avergonzarse,
          que enseña debidamente el mensaje de la verdad."
        </p>
        <cite className="mt-3 block font-mono text-[10px] uppercase not-italic tracking-[0.3em] text-spirit-600">
          2 Timoteo 2:15
        </cite>
      </blockquote>

      {/* Bienvenida */}
      <Bloque>
        <Kicker>Bienvenida</Kicker>
        <p className="mb-4 text-ink-600 leading-relaxed text-pretty">
          Estimado hermano(a): ¡Bienvenido a la Escuela de Líderes! Empezamos esta
          etapa de estudios y, con ella, una nueva fase para ti. Te animamos a
          tomar esta oportunidad para capacitarte y darle al estudio tu mejor
          tiempo: no dejes de asistir, hacer tus tareas y cumplir con las
          lecturas, porque así podrás servir a Dios con excelencia.
        </p>
        <p className="mb-4 text-ink-600 leading-relaxed text-pretty">
          El estudio académico es importante, pero debe ir acompañado de una
          formación de carácter. Oraremos durante este año de estudios para que la
          enseñanza se haga <em className="italic">rema</em> en nuestra propia
          vida: queremos transmitir y recibir vida espiritual, no solo
          conocimiento teórico.
        </p>
        <p className="text-ink-600 leading-relaxed text-pretty">
          Con estos alcances te saludamos y felicitamos tu participación en la
          Escuela de Líderes Renacer, deseándote las bendiciones de Nuestro Señor
          durante este tiempo de estudios.
        </p>
      </Bloque>

      {/* Propósito */}
      <Bloque>
        <Kicker>Propósito</Kicker>
        <p className="mb-4 text-ink-600 leading-relaxed text-pretty">
          La Escuela de Líderes Renacer es un programa de capacitación bíblica y
          formación ministerial dirigido a los líderes y servidores de la iglesia.
          Su objetivo es preparar, afirmar y equipar a hombres y mujeres llamados
          por Dios para servir con excelencia, convirtiéndose en instrumentos
          útiles para la edificación del Cuerpo de Cristo, el fortalecimiento de la
          iglesia local y la extensión del Reino de Dios.
        </p>
        <p className="mb-6 text-ink-600 leading-relaxed text-pretty">
          Creemos que todo liderazgo cristiano debe estar centrado en Jesucristo:
          el Cristo que salva, santifica, sana y viene otra vez; aquel que restaura
          integralmente al ser humano, lo llena con su Espíritu Santo y lo capacita
          para vivir una vida plena, poderosa y consagrada en santidad.
        </p>
        <p className="mb-4 text-sm font-medium text-ink-800">
          Un ministerio eficaz se sostiene sobre tres fundamentos:
        </p>
        <ol className="space-y-3">
          {fundamentos.map((f, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-spirit-500/12 font-mono text-[11px] text-spirit-600">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-ink-600 text-pretty">{f}</span>
            </li>
          ))}
        </ol>
      </Bloque>

      {/* Horarios */}
      <Bloque>
        <Kicker>Horarios de estudios</Kicker>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[14px] border border-ink-900/10 bg-paper-100 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-400 mb-1">Formato</p>
            <p className="text-ink-800">Híbrido — presencial y virtual sincrónico</p>
          </div>
          <div className="rounded-[14px] border border-ink-900/10 bg-paper-100 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-400 mb-1">Duración</p>
            <p className="text-ink-800">5 meses</p>
          </div>
        </div>
      </Bloque>

      {/* Índice */}
      <Bloque>
        <Kicker>Índice del programa</Kicker>
        <ol className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {indiceLideres.map((it, i) => (
            <li key={i} className="flex items-baseline gap-3 border-b border-ink-900/[0.06] pb-2.5">
              <span className="font-mono text-[11px] text-spirit-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-sm text-ink-700 text-pretty">{it.t}</span>
              {it.m && (
                <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] ${it.m === "Presencial" ? "bg-spirit-500/12 text-spirit-600" : "bg-ink-900/[0.06] text-ink-400"}`}>
                  {it.m}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Bloque>

      {/* Responsabilidades */}
      <Bloque>
        <Kicker>Responsabilidades del estudiante</Kicker>
        <p className="text-ink-600 leading-relaxed text-pretty">
          Una de las cosas más importantes en la preparación para el ministerio es
          el desarrollo del sentido de responsabilidad en el futuro líder. Por eso
          se espera de cada estudiante una muestra de responsabilidad, con
          asistencia y participación activa en el desarrollo del curso.
        </p>
      </Bloque>
    </>
  )
}

function ContenidoFaseIII() {
  return (
    <>
      <blockquote className="border-l-2 border-spirit-400 pl-5">
        <p className="font-display italic text-lg text-ink-800 leading-relaxed text-pretty">
          "Preparando líderes para los retos de la iglesia y de la sociedad del
          siglo XXI."
        </p>
      </blockquote>

      <Bloque>
        <Kicker>El seminario</Kicker>
        <p className="mb-4 text-ink-600 leading-relaxed text-pretty">
          El Seminario Teológico "Renacer" cuenta con el respaldo de la Comunidad
          Cristiana Renacer. Los pastores Renato y Simone Cárdenas vienen dirigiendo
          la congregación guiados por el Señor, preocupándose por el desarrollo
          ministerial y el alcance del evangelio a la sociedad. Es su deseo seguir
          formando hombres y mujeres bajo la enseñanza de las Escrituras, cuidando
          el desarrollo del fruto del Espíritu Santo y la manifestación de los dones
          espirituales en cada persona.
        </p>
        <p className="text-ink-600 leading-relaxed text-pretty">
          En la actualidad se ha establecido un convenio entre la{" "}
          <strong className="font-medium text-ink-800">Dayspring Theological University (D.T.U.)</strong>,
          representada por el Dr. Adrián Nájera, y la Comunidad Cristiana Renacer,
          representada por el pastor Renato Iván Cárdenas Yeogusuku. Protocolizado en
          la oficina principal de la universidad en Dallas, Texas (EE. UU.) el 6 de
          septiembre de 2024, con fines de educación superior en carreras
          ministeriales: Teología, Consejería Cristiana, Divinidad, Escatología,
          Psicoterapia y Psicología (modelo bíblico).
        </p>
      </Bloque>

      <Bloque>
        <Kicker>Certificados</Kicker>
        <p className="mb-4 text-sm text-ink-500">Se entregan certificados al término de cada etapa:</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {certificados.map((c, i) => (
            <div key={i} className="rounded-[14px] border border-ink-900/10 bg-paper-100 p-4">
              <p className="font-display text-ink-900 leading-snug">{c.t}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-spirit-600">{c.meta}</p>
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque>
        <Kicker>Dirección</Kicker>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[14px] border border-ink-900/10 bg-paper-100 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-400 mb-1">Presidente</p>
            <p className="text-ink-800">Pr. Renato Cárdenas</p>
          </div>
          <div className="rounded-[14px] border border-ink-900/10 bg-paper-100 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-400 mb-1">Director</p>
            <p className="text-ink-800">Pr. Martín Tello</p>
          </div>
        </div>
      </Bloque>

      <Bloque>
        <Kicker>Modalidad</Kicker>
        <ul className="space-y-2.5">
          {[
            ["Modalidad", "Virtual · plataforma Zoom"],
            ["Matrícula", "Beca"],
            ["Clases", "Martes de 8:00 a 10:00 p. m."],
            ["Material de estudio", "A disposición del alumno en forma física o virtual"],
          ].map(([k, v]) => (
            <li key={k} className="flex flex-col gap-0.5 border-b border-ink-900/[0.06] pb-2.5 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="w-40 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">{k}</span>
              <span className="text-sm text-ink-700 text-pretty">{v}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque>
        <Kicker>Programa curricular · Ago 2026 – May 2027</Kicker>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-display text-lg text-ink-900">Ciclo I</p>
            <ol className="space-y-2">
              {cicloI.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-600 text-pretty">
                  <span className="font-mono text-[11px] text-spirit-500 tabular-nums">{i + 1}.</span>
                  {c}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="mb-3 font-display text-lg text-ink-900">Ciclo II</p>
            <ol className="space-y-2">
              {cicloII.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-600 text-pretty">
                  <span className="font-mono text-[11px] text-spirit-500 tabular-nums">{i + 1}.</span>
                  {c}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Bloque>

      <Bloque>
        <div className="text-center">
          <div className="mx-auto mb-3 h-px w-48 bg-ink-900/20" />
          <p className="font-display text-ink-900">Seminario Teológico "Renacer"</p>
          <p className="text-sm text-ink-600">Pr. Renato Iván Cárdenas Yeogusuku</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mt-1">Presidente</p>
        </div>
      </Bloque>
    </>
  )
}
