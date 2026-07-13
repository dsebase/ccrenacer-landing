import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(true)
  const [hovering, setHovering] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 25, stiffness: 350, mass: 0.4 })
  const sy = useSpring(y, { damping: 25, stiffness: 350, mass: 0.4 })

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setEnabled(false)
      return
    }

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      const interactive =
        t.closest("a, button, input, textarea, select, [data-cursor='hover']")
      setHovering(!!interactive)
    }

    window.addEventListener("pointermove", move)
    document.addEventListener("pointerover", over)

    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[90] hidden lg:block" aria-hidden>
      {/* Anillo decorativo que sigue al puntero nativo (que ahora siempre es visible) */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.9 : 1,
            borderColor: hovering ? "#179CDA" : "rgba(10,15,18,0.35)",
            opacity: hovering ? 1 : 0.7,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-7 w-7 rounded-full border"
        />
      </motion.div>
    </div>
  )
}
