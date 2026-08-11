'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { BrandWordmark } from '@/components/brand'
import LanguageSwitcher from '@/components/language-switcher'
import type { Dictionary } from '@/lib/content'
import { href, pagePath, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

type Props = {
  locale: Locale
  nav: Dictionary['nav']
  a11y: Dictionary['a11y']
}

export default function Navbar({ locale, nav, a11y }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const shop = pagePath('shop', locale)

  const links = [
    { label: nav.catalog, hash: '#katalog' },
    { label: nav.features, hash: '#imkoniyatlar' },
    { label: nav.pricing, hash: '#narxlar' },
    { label: nav.blog, hash: '#maqolalar' },
  ]

  const cartLabel = nav.cart

  return (
    <nav
      aria-label={a11y.mainNav}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(9,9,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href={href(locale)} aria-label={SITE.name} style={{ textDecoration: 'none', display: 'inline-flex' }}>
          <BrandWordmark height={40} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} labels={a11y} />
          <a
            href={`tel:${SITE.phoneHref}`}
            className="hidden lg:inline"
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, textDecoration: 'none' }}
          >
            {SITE.phone}
          </a>
          <Link href={shop} className="hidden md:inline" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, textDecoration: 'none' }}>
            {cartLabel}
          </Link>
          <Link href={shop} className="btn-primary hidden md:inline-flex" style={{ padding: '10px 22px', fontSize: 13 }} data-magnetic>
            {nav.demo} →
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={a11y.openMenu}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 36, height: 36, cursor: 'pointer' }}
            className="burger md:hidden"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 18, height: 1.5, background: '#fff', borderRadius: 1 }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden', background: 'rgba(9,9,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ padding: '16px 20px' }}>
              {links.map((item, i) => (
                <motion.a
                  key={item.hash}
                  href={item.hash}
                  onClick={() => setOpen(false)}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: 16, padding: '12px 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="flex gap-3 mt-4">
                <a href="#aloqa" onClick={() => setOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  {nav.contact}
                </a>
                <Link href={shop} onClick={() => setOpen(false)} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {nav.demo} →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
