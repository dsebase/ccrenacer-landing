import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

const LOGO = "/rncrlogo.png"
const SIZE = 200

// Máscara: el líquido se recorta a la silueta del logo (usa su canal alpha)
const maskStyle: React.CSSProperties = {
  WebkitMaskImage: `url(${LOGO})`,
  maskImage: `url(${LOGO})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
}

// Oleaje: 4 ciclos en 1440 → con 200% de ancho y translateX(-50%) hace loop perfecto
const WAVE =
  "M0,40 C120,12 240,68 360,40 C480,12 600,68 720,40 C840,12 960,68 1080,40 C1200,12 1320,68 1440,40 L1440,90 L0,90 Z"

export default function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Bloquea el scroll mientras la pantalla de carga está activa
    document.documentElement.style.overflow = "hidden"
    const t = setTimeout(() => {
      setDone(true)
      document.documentElement.style.overflow = ""
    }, 2900)
    return () => {
      clearTimeout(t)
      document.documentElement.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(10px)",
            transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper-50 overflow-hidden"
        >
          {/* Formas decorativas de fondo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Orbes difuminados que derivan */}
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 -left-24 w-[460px] h-[460px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(23,156,218,0.45), transparent 70%)" }}
            />
            <motion.div
              animate={{ x: [0, -34, 0], y: [0, 24, 0], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-28 -right-20 w-[520px] h-[520px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(17,160,192,0.42), transparent 70%)" }}
            />
            <motion.div
              animate={{ x: [0, 24, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 right-[-7rem] w-[360px] h-[360px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(200,230,229,0.55), transparent 70%)" }}
            />
            <motion.div
              animate={{ y: [0, -18, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-[-6rem] w-[340px] h-[340px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(69,182,227,0.40), transparent 70%)" }}
            />

            {/* Siluetas de llama grandes en esquinas */}
            <motion.div
              animate={{ rotate: [-4, 4, -4], y: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 right-8 lg:right-24 text-spirit-400/20"
            >
              <svg width="260" height="338" viewBox="0 0 200 260" fill="currentColor">
                <path d="M100 8c-6 28-46 60-46 110a46 46 0 0 0 92 0c0-50-40-82-46-110z" />
              </svg>
            </motion.div>
            <motion.div
              animate={{ rotate: [5, -3, 5], y: [0, 12, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 left-6 lg:left-24 text-spirit-300/20"
            >
              <svg width="220" height="286" viewBox="0 0 200 260" fill="currentColor">
                <path d="M100 8c-6 28-46 60-46 110a46 46 0 0 0 92 0c0-50-40-82-46-110z" />
              </svg>
            </motion.div>

            {/* Anillos concéntricos descentrados */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="w-[560px] h-[560px] rounded-full border border-spirit-400/25"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-[760px] h-[760px] rounded-full border border-spirit-300/18" />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-[980px] h-[980px] rounded-full border border-spirit-200/14" />
            </div>

            {/* Formas geométricas dispersas */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute top-[18%] left-[14%] w-16 h-16 rounded-2xl border-2 border-spirit-400/30"
            />
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[22%] right-[16%] w-12 h-12 rounded-full bg-spirit-300/25"
            />
            <motion.div
              animate={{ rotate: [0, 45, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[26%] right-[26%] w-8 h-8 border-2 border-spirit-300/35 rotate-45"
            />
            <div className="absolute bottom-[30%] left-[22%] w-3 h-3 rounded-full bg-spirit-400/40" />
            <div className="absolute top-[40%] left-[8%] w-2 h-2 rounded-full bg-spirit-500/40" />
            <div className="absolute top-[60%] right-[10%] w-2.5 h-2.5 rounded-full bg-spirit-400/35" />

            {/* Cruz de guías blueprint */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-spirit-400/25 to-transparent" />
            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-spirit-400/25 to-transparent" />
          </div>

          {/* Glow radial ambiental que respira */}
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[460px] h-[460px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(23,156,218,0.18), rgba(23,156,218,0) 65%)",
            }}
          />

          {/* Partículas de luz flotando */}
          {[14, 30, 48, 66, 84].map((left, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-spirit-400"
              style={{
                left: `${left}%`,
                width: i % 2 === 0 ? 4 : 2.5,
                height: i % 2 === 0 ? 4 : 2.5,
                boxShadow: "0 0 10px rgba(23,156,218,0.7)",
              }}
              initial={{ bottom: "20%", opacity: 0 }}
              animate={{ bottom: "75%", opacity: [0, 0.8, 0] }}
              transition={{
                duration: 3.5 + (i % 3),
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Logo que se llena de agua viva */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10"
            style={{ width: SIZE, height: SIZE }}
          >
            {/* 1· Silueta fantasma (siempre visible, tenue) */}
            <img
              src={LOGO}
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-[0.14]"
              aria-hidden
            />

            {/* 2· Líquido subiendo, recortado a la silueta del logo */}
            <div className="absolute inset-0" style={maskStyle}>
              <motion.div
                initial={{ height: "0%" }}
                animate={{ height: "115%" }}
                transition={{ duration: 2.1, ease: [0.65, 0, 0.35, 1] }}
                className="absolute bottom-0 inset-x-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-spirit-600 via-spirit-500 to-spirit-400" />

                {/* superficie ondulante frontal */}
                <div className="absolute -top-2 left-0 h-5 w-[200%] wave-drift text-spirit-400">
                  <svg width="100%" height="100%" viewBox="0 0 1440 90" preserveAspectRatio="none" fill="currentColor">
                    <path d={WAVE} />
                  </svg>
                </div>
                {/* superficie ondulante trasera */}
                <div className="absolute -top-1 left-0 h-5 w-[200%] wave-drift-slow text-spirit-300 opacity-70">
                  <svg width="100%" height="100%" viewBox="0 0 1440 90" preserveAspectRatio="none" fill="currentColor">
                    <path d={WAVE} />
                  </svg>
                </div>

                {/* burbujas internas */}
                {[25, 50, 70].map((left, i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full bg-paper-50/50"
                    style={{ left: `${left}%`, width: 4, height: 4 }}
                    initial={{ bottom: "0%", opacity: 0 }}
                    animate={{ bottom: "90%", opacity: [0, 0.8, 0] }}
                    transition={{ duration: 2 + i * 0.4, delay: 0.5 + i * 0.3, repeat: Infinity, ease: "easeIn" }}
                  />
                ))}
              </motion.div>
            </div>

            {/* 3· Logo real "cobra vida" cuando el agua terminó de llenar */}
            <motion.img
              src={LOGO}
              alt="Comunidad Cristiana Renacer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 8px 26px rgba(23,156,218,0.35))" }}
            />
          </motion.div>

          {/* Etiqueta + barra de progreso fina */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative z-10 mt-8 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-ink-400">
              Renacer · 2026
            </span>
            <div className="h-px w-32 bg-ink-200 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.1, ease: [0.65, 0, 0.35, 1] }}
                className="h-full w-full bg-gradient-to-r from-spirit-500 to-spirit-300"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
