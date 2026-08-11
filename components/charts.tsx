import type { CSSProperties } from 'react'

// ── Mini sparkline SVG ──────────────────────────────────────────────────────
export function Sparkline({ color = '#f5a623', up = true }: { color?: string; up?: boolean }) {
  const d = up
    ? 'M0 20 Q10 18 20 15 Q30 12 40 16 Q50 20 60 10 Q70 4 80 6'
    : 'M0 6 Q10 10 20 14 Q30 18 40 12 Q50 8 60 16 Q70 20 80 18'
  return (
    <svg width="80" height="28" viewBox="0 0 80 28" fill="none" className="sparkline" aria-hidden="true" focusable="false">
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ── Mini bar chart ──────────────────────────────────────────────────────────
export function MiniBarChart() {
  const bars = [
    { h: 35, delay: '0s' }, { h: 55, delay: '0.1s' }, { h: 40, delay: '0.2s' },
    { h: 70, delay: '0.3s' }, { h: 50, delay: '0.4s' }, { h: 85, delay: '0.5s' },
    { h: 60, delay: '0.6s' }, { h: 45, delay: '0.7s' },
  ]
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 90 }} aria-hidden="true">
      {bars.map((b, i) => (
        <div
          key={i}
          className="rounded-t-sm bar-animate"
          style={{
            width: 14,
            background: i === 5 ? '#f5a623' : 'rgba(245, 166, 35,0.35)',
            '--bar-h': b.h + 'px',
            '--bar-delay': b.delay,
            height: b.h,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}
