import { motion } from "motion/react"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: "div" | "span" | "h2" | "h3" | "p" | "li" | "section"
  once?: boolean
}

export default function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
