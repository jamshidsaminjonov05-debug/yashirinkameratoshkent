'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import type { Dictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { BrandWordmark } from '@/components/brand'
import {
  IconBack, IconBag, IconCamera, IconCard, IconChevron, IconGrid,
  IconHelp, IconSettings, IconShield, IconUsers,
} from './icons'

type Props = {
  sidebar: Dictionary['shop']['sidebar']
  locale: Locale
}

/** Chap tomondagi do'kon menyusi (rasmga mos). */
export default function ShopSidebar({ sidebar, locale }: Props) {
  const [openProducts, setOpenProducts] = useState(true)
  const home = pagePath('home', locale)

  const mainItems = [
    { icon: <IconBag />, label: sidebar.orders },
    { icon: <IconCard />, label: sidebar.payment },
    { icon: <IconShield />, label: sidebar.warranty },
    { icon: <IconUsers />, label: sidebar.support },
  ]

  const bottomItems = [
    { icon: <IconHelp />, label: sidebar.helpDesk },
    { icon: <IconSettings />, label: sidebar.settings },
  ]

  return (
    <aside className="shop-aside" data-anim="stagger">
      {/* Logotip */}
      <Link href={home} aria-label={SITE.name} style={{ textDecoration: 'none', padding: '4px 8px 22px', display: 'inline-flex' }}>
        <BrandWordmark height={34} variant="dark" />
      </Link>

      <Link href={home} className="shop-nav-item">
        <IconGrid />
        {sidebar.home}
      </Link>

      {/* Mahsulotlar - ochiladigan bo'lim */}
      <button
        type="button"
        className="shop-nav-item"
        data-active={openProducts}
        aria-expanded={openProducts}
        onClick={() => setOpenProducts((v) => !v)}
      >
        <IconCamera />
        {sidebar.products}
        <motion.span
          animate={{ rotate: openProducts ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ marginLeft: 'auto', display: 'inline-flex' }}
        >
          <IconChevron width={16} height={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {openProducts && (
          <motion.div
            key="product-links"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {sidebar.productLinks.map((label, i) => (
              <a key={label} href="#mahsulotlar" className="shop-sub-item" data-active={i === 1}>
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {mainItems.map((item) => (
        <a key={item.label} href="#mahsulotlar" className="shop-nav-item">
          {item.icon}
          {item.label}
        </a>
      ))}

      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <div style={{ borderTop: '1px solid var(--shop-border)', paddingTop: 12 }}>
          {bottomItems.map((item) => (
            <a key={item.label} href="#aloqa" className="shop-nav-item">
              {item.icon}
              {item.label}
            </a>
          ))}
          <Link href={home} className="shop-nav-item" style={{ color: 'var(--shop-accent)', fontWeight: 600 }}>
            <IconBack />
            {sidebar.backToSite}
          </Link>
        </div>
      </div>
    </aside>
  )
}
