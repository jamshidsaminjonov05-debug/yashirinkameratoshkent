'use client'

import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PriceRange from './price-range'
import { IconCheck, IconChevron } from './icons'
import type { Dictionary } from '@/lib/content'

export type Draft = {
  categories: string[]
  prices: string[]
  types: string[]
  range: { min: number; max: number }
}

type Props = {
  filters: Dictionary['shop']['filters']
  draft: Draft
  setDraft: (next: Draft) => void
  counts: { categories: Record<string, number>; prices: Record<string, number>; types: Record<string, number> }
  total: number
  bounds: { min: number; max: number; step: number }
  format: (value: number) => string
  onApply: () => void
  onReset: () => void
}

/** Ochilib-yopiladigan filtr bo'limi. */
function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div style={{ marginBottom: 12 }}>
      <button type="button" className="shop-select" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        {title}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ display: 'inline-flex', color: 'var(--shop-muted)' }}>
          <IconChevron width={16} height={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '10px 4px 2px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Bitta checkbox qatori (belgilanganda "galochka" chiziladi). */
function CheckRow({
  label, count, checked, onChange,
}: { label: string; count?: number; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="shop-checkbox">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="box">
        <AnimatePresence initial={false}>
          {checked && (
            <motion.span
              key="check"
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              style={{ display: 'inline-flex', color: '#fff' }}
            >
              <IconCheck width={12} height={12} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span>{label}</span>
      {typeof count === 'number' && <span className="shop-count">({count})</span>}
    </label>
  )
}

const toggle = (list: string[], id: string, on: boolean) => (on ? [...list, id] : list.filter((x) => x !== id))

export default function ShopFilters({
  filters, draft, setDraft, counts, total, bounds, format, onApply, onReset,
}: Props) {
  return (
    <form
      className="shop-card"
      style={{ padding: 18 }}
      onSubmit={(e) => {
        e.preventDefault()
        onApply()
      }}
    >
      <Accordion title={filters.categories.label} defaultOpen>
        <CheckRow
          label={filters.categories.all}
          count={total}
          checked={draft.categories.length === 0}
          onChange={() => setDraft({ ...draft, categories: [] })}
        />
        {filters.categories.options.map((option) => (
          <CheckRow
            key={option.id}
            label={option.label}
            count={counts.categories[option.id] ?? 0}
            checked={draft.categories.includes(option.id)}
            onChange={(on) => setDraft({ ...draft, categories: toggle(draft.categories, option.id, on) })}
          />
        ))}
      </Accordion>

      <Accordion title={filters.price.label} defaultOpen>
        <CheckRow
          label={filters.price.all}
          count={total}
          checked={draft.prices.length === 0}
          onChange={() => setDraft({ ...draft, prices: [] })}
        />
        {filters.price.options.map((option) => (
          <CheckRow
            key={option.id}
            label={option.label}
            count={counts.prices[option.id] ?? 0}
            checked={draft.prices.includes(option.id)}
            onChange={(on) => setDraft({ ...draft, prices: toggle(draft.prices, option.id, on) })}
          />
        ))}
      </Accordion>

      <div style={{ margin: '4px 4px 16px' }}>
        <PriceRange
          label={filters.rangeLabel}
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={draft.range}
          onChange={(range) => setDraft({ ...draft, range })}
        />
      </div>

      <Accordion title={filters.type.label}>
        <CheckRow
          label={filters.type.all}
          count={total}
          checked={draft.types.length === 0}
          onChange={() => setDraft({ ...draft, types: [] })}
        />
        {filters.type.options.map((option) => (
          <CheckRow
            key={option.id}
            label={option.label}
            count={counts.types[option.id] ?? 0}
            checked={draft.types.includes(option.id)}
            onChange={(on) => setDraft({ ...draft, types: toggle(draft.types, option.id, on) })}
          />
        ))}
      </Accordion>

      <motion.button type="submit" className="shop-btn" style={{ width: '100%', marginTop: 4 }} whileTap={{ scale: 0.97 }}>
        {filters.apply}
      </motion.button>

      <button
        type="button"
        onClick={onReset}
        style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', color: 'var(--shop-muted)', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}
      >
        {filters.reset}
      </button>
    </form>
  )
}
