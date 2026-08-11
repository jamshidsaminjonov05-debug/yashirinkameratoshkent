'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/** Sahifa yuqorisidagi o'qish/scroll progress chizig'i. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 200,
        background: 'linear-gradient(90deg, #1ea832, #fbbf24)',
        pointerEvents: 'none',
      }}
    />
  )
}
