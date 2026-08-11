'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Brauzer sessiyasida birinchi yuklanish bo'ldimi (SSR HTML yashirin bo'lmasligi uchun). */
let hasNavigated = false

/**
 * Sahifalar orasida o'tishda yumshoq fade (app/template.tsx orqali).
 * Birinchi yuklanishda animatsiya yo'q - HTML darhol ko'rinadi (SEO uchun muhim).
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const animateIn = useRef(hasNavigated)

  useEffect(() => {
    hasNavigated = true
  }, [])

  if (reduced) return <>{children}</>

  return (
    <motion.div
      initial={animateIn.current ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
