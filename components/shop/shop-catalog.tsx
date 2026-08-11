'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ProductImage from '@/components/product-image'
import ShopCart, { type CartLine } from './shop-cart'
import ShopFilters, { type Draft } from './shop-filters'
import { IconBag, IconBell, IconFilter, IconHeart, IconHelp, IconMoon, IconSearch } from './icons'
import { formatPrice, type Dictionary, type Product } from '@/lib/content'
import type { Locale } from '@/lib/i18n'

type Props = {
  shop: Dictionary['shop']
  products: Product[]
  locale: Locale
}

const STORAGE_KEY = 'yashirincamera_cart'

const roundTo = (value: number, step: number) => Math.round(value / step) * step

export default function ShopCatalog({ shop, products, locale }: Props) {
  const format = (value: number) => formatPrice(locale, value)

  // Narx chegaralari - mahsulotlardan hisoblanadi
  const bounds = useMemo(() => {
    const prices = products.map((p) => p.price)
    const step = 10000
    return {
      min: roundTo(Math.min(...prices), step),
      max: roundTo(Math.max(...prices), step),
      step,
    }
  }, [products])

  const emptyDraft = useMemo<Draft>(
    () => ({ categories: [], prices: [], types: [], range: { min: bounds.min, max: bounds.max } }),
    [bounds],
  )

  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [applied, setApplied] = useState<Draft>(emptyDraft)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(shop.filters.sort.options[0].id)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Savatni brauzer xotirasidan tiklash / saqlash
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setCart(JSON.parse(saved))
    } catch {
      /* xotira mavjud emas */
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      /* xotira mavjud emas */
    }
  }, [cart])

  const counts = useMemo(() => {
    const categories: Record<string, number> = {}
    const types: Record<string, number> = {}
    const prices: Record<string, number> = {}
    products.forEach((p) => {
      categories[p.category] = (categories[p.category] ?? 0) + 1
      types[p.type] = (types[p.type] ?? 0) + 1
      shop.filters.price.options.forEach((option) => {
        if (p.price >= option.min && p.price < option.max) prices[option.id] = (prices[option.id] ?? 0) + 1
      })
    })
    return { categories, types, prices }
  }, [products, shop.filters.price.options])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const buckets = shop.filters.price.options.filter((o) => applied.prices.includes(o.id))

    const list = products.filter((p) => {
      if (applied.categories.length && !applied.categories.includes(p.category)) return false
      if (applied.types.length && !applied.types.includes(p.type)) return false
      if (p.price < applied.range.min || p.price > applied.range.max) return false
      if (buckets.length && !buckets.some((b) => p.price >= b.min && p.price < b.max)) return false
      if (q && !(`${p.name} ${p.desc} ${p.tag}`.toLowerCase().includes(q))) return false
      return true
    })

    const sorted = [...list]
    if (sort === 'cheap') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'expensive') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name, locale))
    return sorted
  }, [products, applied, query, sort, shop.filters.price.options, locale])

  const lines: CartLine[] = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = products.find((p) => p.id === id)
          return product ? { product, qty } : null
        })
        .filter((line): line is CartLine => line !== null),
    [cart, products],
  )

  const cartCount = lines.reduce((sum, line) => sum + line.qty, 0)

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }

  const changeQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = { ...prev }
      const qty = (next[id] ?? 0) + delta
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }

  const removeLine = (id: string) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  return (
    <>
      {/* ── Yuqori panel ───────────────────────────────────────── */}
      <header
        className="flex items-center gap-4 flex-wrap"
        style={{ padding: '20px 24px', borderBottom: '1px solid var(--shop-border)', background: 'var(--shop-surface)' }}
      >
        <div style={{ flex: '1 1 220px', minWidth: 0 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--shop-text)', letterSpacing: -0.4 }}>
            {shop.header.title}
          </h1>
          <p style={{ color: 'var(--shop-muted)', fontSize: 12.5, margin: '4px 0 0' }}>{shop.header.subtitle}</p>
        </div>

        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 340 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--shop-muted)', display: 'inline-flex' }}>
            <IconSearch width={16} height={16} />
          </span>
          <input
            className="shop-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={shop.header.searchPlaceholder}
            aria-label={shop.header.searchPlaceholder}
          />
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="shop-icon-btn" aria-label="Bildirishnomalar"><IconBell width={16} height={16} /></button>
          <button type="button" className="shop-icon-btn" aria-label="Yordam"><IconHelp width={16} height={16} /></button>
          <button type="button" className="shop-icon-btn" aria-label="Mavzu"><IconMoon width={16} height={16} /></button>

          <div
            className="flex items-center gap-2"
            style={{ background: 'var(--shop-accent)', color: '#fff', borderRadius: 999, padding: '5px 14px 5px 6px' }}
          >
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
              {shop.header.userName.slice(0, 1)}
            </span>
            <span style={{ lineHeight: 1.1 }}>
              <span style={{ display: 'block', fontSize: 12, fontWeight: 700 }}>{shop.header.userName}</span>
              <span style={{ display: 'block', fontSize: 10, opacity: 0.85 }}>{shop.header.userRole}</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── Kontent: filtrlar + mahsulotlar ────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 18, padding: 18 }}>
        <div className="shop-grid-wrap" style={{ display: 'grid', gap: 18 }}>
          {/* Asboblar paneli */}
          <div className="shop-card flex items-center gap-3 flex-wrap" style={{ padding: '12px 16px' }}>
            <div style={{ flex: '1 1 200px', minWidth: 0 }}>
              <nav aria-label="breadcrumb" style={{ fontSize: 12.5, color: 'var(--shop-muted)' }}>
                {shop.toolbar.breadcrumbRoot} <span style={{ margin: '0 6px' }}>/</span>
                <span style={{ color: 'var(--shop-text)', fontWeight: 600 }}>{shop.toolbar.breadcrumbCurrent}</span>
              </nav>
              <div style={{ fontSize: 12.5, color: 'var(--shop-muted)', marginTop: 2 }}>
                {shop.toolbar.showingPrefix}{' '}
                <motion.b key={visible.length} initial={{ scale: 0.8, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} style={{ color: 'var(--shop-text)' }}>
                  {visible.length}
                </motion.b>{' '}
                {shop.toolbar.showingSuffix}
              </div>
            </div>

            <label className="shop-select" style={{ width: 'auto', gap: 10 }}>
              <IconFilter width={15} height={15} />
              <span className="sr-only-label" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                {shop.filters.sort.label}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label={shop.filters.sort.label}
                style={{ border: 'none', background: 'none', font: 'inherit', color: 'inherit', outline: 'none', cursor: 'pointer' }}
              >
                {shop.filters.sort.options.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>

            <button type="button" className="shop-btn shop-btn--ghost lg:hidden" onClick={() => setFiltersOpen((v) => !v)}>
              <IconFilter width={15} height={15} />
              {shop.toolbar.filter}
            </button>

            <motion.button type="button" className="shop-btn" onClick={() => setCartOpen(true)} whileTap={{ scale: 0.96 }}>
              <IconBag width={15} height={15} />
              {shop.toolbar.cartCta}
              <AnimatePresence initial={false}>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 520, damping: 20 }}
                    style={{ background: '#fff', color: 'var(--shop-accent)', borderRadius: 999, fontSize: 11, fontWeight: 800, padding: '1px 7px' }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="shop-content" style={{ display: 'grid', gap: 18 }}>
            {/* Filtrlar (mobil holatda ochilib-yopiladi) */}
            <div className="shop-filter-col">
              <div className="hidden lg:block">
                <ShopFilters
                  filters={shop.filters}
                  draft={draft}
                  setDraft={setDraft}
                  counts={counts}
                  total={products.length}
                  bounds={bounds}
                  format={format}
                  onApply={() => setApplied(draft)}
                  onReset={() => {
                    setDraft(emptyDraft)
                    setApplied(emptyDraft)
                  }}
                />
              </div>

              <AnimatePresence initial={false}>
                {filtersOpen && (
                  <motion.div
                    key="mobile-filters"
                    className="lg:hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ShopFilters
                      filters={shop.filters}
                      draft={draft}
                      setDraft={setDraft}
                      counts={counts}
                      total={products.length}
                      bounds={bounds}
                      format={format}
                      onApply={() => {
                        setApplied(draft)
                        setFiltersOpen(false)
                      }}
                      onReset={() => {
                        setDraft(emptyDraft)
                        setApplied(emptyDraft)
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mahsulotlar to'ri */}
            <div id="mahsulotlar">
              <h2
                style={{
                  fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700,
                  margin: '0 0 12px', color: 'var(--shop-text)',
                }}
              >
                {shop.sidebar.productLinks[0]}{' '}
                <span style={{ color: 'var(--shop-muted)', fontWeight: 500 }}>({visible.length})</span>
              </h2>

              {visible.length === 0 ? (
                <div className="shop-card" style={{ padding: 48, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{shop.empty.title}</div>
                  <p style={{ color: 'var(--shop-muted)', fontSize: 13.5, marginBottom: 18 }}>{shop.empty.desc}</p>
                  <button
                    type="button"
                    className="shop-btn"
                    onClick={() => {
                      setDraft(emptyDraft)
                      setApplied(emptyDraft)
                      setQuery('')
                    }}
                  >
                    {shop.empty.reset}
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}
                >
                  <AnimatePresence mode="popLayout">
                    {visible.map((product) => {
                      const inCart = Boolean(cart[product.id])
                      const liked = wishlist.includes(product.id)

                      return (
                        <motion.article
                          key={product.id}
                          id={product.id}
                          layout
                          initial={{ opacity: 0, y: 18, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                          whileHover={{ y: -6 }}
                          className="shop-product-card"
                        >
                          <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <ProductImage src={product.image} alt={product.alt} label={shop.card.imageSoon} height={150} variant="light" />
                            <span
                              style={{
                                position: 'absolute', top: 10, left: 10, background: 'rgba(30,168,50,0.95)', color: '#fff',
                                fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999,
                              }}
                            >
                              {product.tag}
                            </span>
                          </div>

                          <div style={{ padding: 14, display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, margin: '0 0 5px', color: 'var(--shop-text)' }}>
                              {product.name}
                            </h3>
                            <p style={{ color: 'var(--shop-muted)', fontSize: 11.5, lineHeight: 1.5, margin: '0 0 14px', flex: 1 }}>
                              {product.desc}
                            </p>

                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14.5, fontWeight: 800, color: 'var(--shop-text)' }}>
                                  <data value={product.price}>{format(product.price)}</data>
                                </div>
                                {product.oldPrice && (
                                  <s style={{ fontSize: 11, color: 'var(--shop-muted)' }}>{format(product.oldPrice)}</s>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5">
                                <motion.button
                                  type="button"
                                  className="shop-icon-btn"
                                  data-active={liked}
                                  style={{ width: 30, height: 30 }}
                                  whileTap={{ scale: 0.85 }}
                                  aria-pressed={liked}
                                  aria-label={shop.card.wishlist}
                                  onClick={() =>
                                    setWishlist((prev) => (prev.includes(product.id) ? prev.filter((x) => x !== product.id) : [...prev, product.id]))
                                  }
                                >
                                  <IconHeart width={15} height={15} fill={liked ? 'currentColor' : 'none'} />
                                </motion.button>

                                <motion.button
                                  type="button"
                                  className="shop-icon-btn"
                                  data-active={inCart}
                                  style={{ width: 30, height: 30 }}
                                  whileTap={{ scale: 0.85 }}
                                  aria-label={shop.card.addToCart}
                                  title={inCart ? shop.card.added : shop.card.addToCart}
                                  onClick={() => addToCart(product.id)}
                                >
                                  <IconBag width={15} height={15} />
                                </motion.button>
                              </div>
                            </div>

                            <motion.button
                              type="button"
                              className="shop-btn"
                              style={{ width: '100%', marginTop: 12, padding: '9px 16px', fontSize: 12.5 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                addToCart(product.id)
                                setCartOpen(true)
                              }}
                            >
                              {shop.card.buy}
                            </motion.button>
                          </div>
                        </motion.article>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShopCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={lines}
        cart={shop.cart}
        format={format}
        onRemove={removeLine}
        onQty={changeQty}
      />
    </>
  )
}
