import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react"

interface Props {
  value: number
  suffix?: string
  duration?: number
}

export default function NumberTicker({ value, suffix = "", duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString())
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay)
    return () => unsub()
  }, [rounded])

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [inView, value, mv, duration])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
