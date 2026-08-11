'use client'

import { AnimatePresence, motion } from 'motion/react'
import type { Dictionary, Product } from '@/lib/content'
import { SITE } from '@/lib/site'
import { IconClose, IconTrash } from './icons'

export type CartLine = { product: Product; qty: number }

type Props = {
  open: boolean
  onClose: () => void
  lines: CartLine[]
  cart: Dictionary['shop']['cart']
  format: (value: number) => string
  onRemove: (id: string) => void
  onQty: (id: string, delta: number) => void
}

/** O'ngdan chiqadigan savat paneli. */
export default function ShopCart({ open, onClose, lines, cart, format, onRemove, onQty }: Props) {
  const total = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0)
  const count = lines.reduce((sum, line) => sum + line.qty, 0)

  const checkoutText = encodeURIComponent(
    `${cart.title}: ${lines.map((l) => `${l.product.name} x${l.qty}`).join(', ')} — ${format(total)}`,
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,20,0.45)', zIndex: 300 }}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-label={cart.title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(400px, 92vw)', zIndex: 301,
              background: 'var(--shop-surface)', display: 'flex', flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.22)',
            }}
          >
            <div className="flex items-center justify-between" style={{ padding: '18px 20px', borderBottom: '1px solid var(--shop-border)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--shop-text)' }}>
                {cart.title} {count > 0 && <span style={{ color: 'var(--shop-accent)' }}>({count})</span>}
              </h2>
              <button type="button" className="shop-icon-btn" onClick={onClose} aria-label={cart.close}>
                <IconClose width={16} height={16} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
              {lines.length === 0 && (
                <p style={{ color: 'var(--shop-muted)', fontSize: 14, textAlign: 'center', marginTop: 40 }}>{cart.empty}</p>
              )}

              <AnimatePresence initial={false}>
                {lines.map((line) => (
                  <motion.div
                    key={line.product.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.25 }}
                    className="shop-card"
                    style={{ padding: 12, marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--shop-text)' }}>{line.product.name}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--shop-accent)', fontWeight: 700, marginTop: 2 }}>
                        {format(line.product.price * line.qty)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button type="button" className="shop-icon-btn" style={{ width: 28, height: 28 }} onClick={() => onQty(line.product.id, -1)} aria-label="-">−</button>
                      <span style={{ minWidth: 20, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{line.qty}</span>
                      <button type="button" className="shop-icon-btn" style={{ width: 28, height: 28 }} onClick={() => onQty(line.product.id, 1)} aria-label="+">+</button>
                    </div>
                    <button type="button" className="shop-icon-btn" onClick={() => onRemove(line.product.id)} aria-label={cart.remove}>
                      <IconTrash width={15} height={15} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div style={{ padding: 18, borderTop: '1px solid var(--shop-border)' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                <span style={{ color: 'var(--shop-muted)', fontSize: 13.5 }}>{cart.total}</span>
                <motion.span
                  key={total}
                  initial={{ scale: 0.9, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--shop-text)' }}
                >
                  {format(total)}
                </motion.span>
              </div>
              <a
                className="shop-btn"
                style={{ width: '100%', pointerEvents: lines.length ? 'auto' : 'none', opacity: lines.length ? 1 : 0.5 }}
                href={`${SITE.telegram}?text=${checkoutText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cart.checkout}
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="shop-btn shop-btn--ghost"
                style={{ width: '100%', marginTop: 10 }}
              >
                {SITE.phone}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
