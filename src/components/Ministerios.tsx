import { motion } from "motion/react"

interface Ministerio {
  n: string
  nombre: string
  desc: string
  img: string
  size: "wide" | "tall" | "square"
  // Encuadre de la imagen (CSS object-position). Por defecto "center".
  // Usá p.ej. "center 30%" para mostrar más arriba y no cortar caras.
  objectPos?: string
  // Si true, espeja la imagen horizontalmente (mirror izquierda↔derecha).
  flip?: boolean
  // Si true, atenúa (oscurece) la imagen para que combine con las demás
  // cuando la foto original es muy clara/encendida.
  dim?: boolean
}

interface Props {
  ministerios: Ministerio[]
}

const sizeClasses: Record<string, string> = {
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  square: "",
}

export default function Ministerios({ ministerios }: Props) {
  return (
    <section id="ministerios" className="relative pt-36 lg:pt-44 pb-32 lg:pb-44 bg-paper-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 mb-16 items-end"
        >
          <div>
            <p className="eyebrow mb-6">
              <span>07 · Ministerios</span>
            </p>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1] text-ink-900 tracking-[-0.025em] text-balance">
              Donde puedes<br />
              <span className="italic text-spirit-500">servir.</span>
            </h2>
          </div>
          <p className="text-ink-500 text-lg max-w-md leading-relaxed">
            Cada renacido tiene un llamado. Estos son los espacios donde lo
            descubrimos y caminamos juntos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[300px] gap-5">
          {ministerios.map((m, i) => (
            <motion.article
              key={m.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative overflow-hidden rounded-[28px] cursor-pointer ${sizeClasses[m.size]}`}
              data-cursor="hover"
            >
              <img
                src={m.img}
                alt={m.nombre}
                style={{ objectPosition: m.objectPos ?? "center" }}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                  m.dim ? "brightness-[0.7]" : ""
                } ${m.flip ? "img-flip" : "group-hover:scale-110"}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

              <div className="relative h-full flex flex-col justify-between p-7 text-paper-50">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                    {m.n}
                  </span>
                  <motion.span
                    initial={{ rotate: -45 }}
                    whileHover={{ rotate: 0 }}
                    className="text-spirit-300 group-hover:text-spirit-200 transition-colors"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </motion.span>
                </div>

                <div className="transform transition-transform duration-700 group-hover:-translate-y-1">
                  <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] mb-2">
                    {m.nombre}
                  </h3>
                  <p className="text-sm text-paper-100/85 leading-relaxed max-w-[30ch]">
                    {m.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
