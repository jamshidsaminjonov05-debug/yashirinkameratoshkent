'use client'

import type { ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

type Props = {
  children: ReactNode
  /** Maksimal burilish burchagi (daraja). */
  strength?: number
  className?: string
}

/** Sichqoncha harakatiga qarab 3D burilib turadigan blok (hero paneli uchun). */
export default function TiltCard({ children, strength = 6, className }: Props) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 120, damping: 18 })

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left) / rect.width - 0.5)
        y.set((event.clientY - rect.top) / rect.height - 0.5)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}
