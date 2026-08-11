'use client'

import { motion } from 'motion/react'

type Props = {
  label: string
  min: number
  max: number
  step: number
  value: { min: number; max: number }
  onChange: (next: { min: number; max: number }) => void
}

/** Ikki tutqichli narx oralig'i slayderi (rasmda: "Custom Price Range"). */
export default function PriceRange({ label, min, max, step, value, onChange }: Props) {
  const span = Math.max(max - min, 1)
  const leftPercent = ((value.min - min) / span) * 100
  const rightPercent = ((value.max - min) / span) * 100
  // Pufakcha panel chetidan chiqib ketmasligi uchun chegaralaymiz
  const bubblePercent = Math.min(Math.max(rightPercent, 16), 84)
  const compact = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--shop-text)' }}>{label}</div>

      {/* Joriy qiymat "pufakchasi" */}
      <div style={{ position: 'relative', height: 30 }}>
        <motion.span
          animate={{ left: `${bubblePercent}%` }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          style={{
            position: 'absolute',
            transform: 'translateX(-50%)',
            background: 'var(--shop-accent)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
            boxShadow: '0 6px 14px rgba(30,168,50,0.35)',
          }}
        >
          {compact(value.min)} - {compact(value.max)}
        </motion.span>
      </div>

      {/* Trek va tutqichlar */}
      <div style={{ position: 'relative', height: 20 }}>
        <div style={{ position: 'absolute', top: 8, left: 0, right: 0, height: 4, borderRadius: 999, background: '#dceee0' }} />
        <motion.div
          animate={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          style={{ position: 'absolute', top: 8, height: 4, borderRadius: 999, background: 'var(--shop-accent)' }}
        />
        <input
          className="range-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.min}
          aria-label={`${label} - min`}
          onChange={(e) => onChange({ ...value, min: Math.min(Number(e.target.value), value.max - step) })}
        />
        <input
          className="range-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.max}
          aria-label={`${label} - max`}
          onChange={(e) => onChange({ ...value, max: Math.max(Number(e.target.value), value.min + step) })}
        />
      </div>

      {/* Qo'lda kiritish */}
      <div className="flex items-center gap-2" style={{ marginTop: 14 }}>
        <input
          type="number"
          className="shop-input"
          style={{ paddingLeft: 8, paddingRight: 4, borderRadius: 10, fontSize: 11, minWidth: 0, textAlign: 'center' }}
          value={value.min}
          min={min}
          max={value.max}
          step={step}
          aria-label={`${label} - min`}
          onChange={(e) => onChange({ ...value, min: Math.max(min, Math.min(Number(e.target.value) || min, value.max - step)) })}
        />
        <span style={{ color: 'var(--shop-muted)' }}>—</span>
        <input
          type="number"
          className="shop-input"
          style={{ paddingLeft: 8, paddingRight: 4, borderRadius: 10, fontSize: 11, minWidth: 0, textAlign: 'center' }}
          value={value.max}
          min={value.min}
          max={max}
          step={step}
          aria-label={`${label} - max`}
          onChange={(e) => onChange({ ...value, max: Math.min(max, Math.max(Number(e.target.value) || max, value.min + step)) })}
        />
      </div>
    </div>
  )
}
