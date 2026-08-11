'use client'

import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Ko'tarilish balandligi (px). */
  lift?: number
  /** Hoverda kattalashtirish. */
  scale?: number
  as?: 'div' | 'article' | 'li'
}

/** Hoverda yumshoq ko'tariladigan va bosilganda siqiladigan karta. */
export default function HoverLift({ children, className, style, lift = 6, scale = 1.015, as = 'div' }: Props) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      style={style}
      whileHover={{ y: -lift, scale }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      {children}
    </MotionTag>
  )
}
