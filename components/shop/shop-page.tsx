import Link from 'next/link'
import GsapAnimations from '@/components/animations/gsap-animations'
import LanguageSwitcher from '@/components/language-switcher'
import ShopCatalog from '@/components/shop/shop-catalog'
import ShopSidebar from '@/components/shop/shop-sidebar'
import { getDictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'
import { buildJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'

/**
 * Onlayn do'kon sahifasi: chapda menyu, o'ngda filtrlar va mahsulotlar to'ri.
 * Sahifadagi yagona <h1> - "Mahsulotlar katalogi" (ShopCatalog ichida).
 */
export default function ShopPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const jsonLd = buildJsonLd(locale, 'shop')

  return (
    <div className="shop">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a className="skip-link" href="#mahsulotlar">{d.a11y.skipToContent}</a>
      <GsapAnimations />

      <div className="shop-app">
        <ShopSidebar sidebar={d.shop.sidebar} locale={locale} />
        <main className="shop-main">
          <ShopCatalog shop={d.shop} products={d.products.items} locale={locale} />
        </main>
      </div>

      <footer
        className="flex items-center justify-center gap-4 flex-wrap"
        style={{ maxWidth: 1320, margin: '18px auto 0', color: '#6f6f78', fontSize: 12.5 }}
      >
        <span>© 2026 {SITE.name}</span>
        <a href={`tel:${SITE.phoneHref}`} style={{ color: '#6f6f78', textDecoration: 'none' }}>{SITE.phone}</a>
        <Link href={pagePath('home', locale)} style={{ color: 'var(--shop-accent)', textDecoration: 'none', fontWeight: 600 }}>
          {d.shop.sidebar.backToSite}
        </Link>
        <LanguageSwitcher locale={locale} labels={d.a11y} page="shop" tone="light" />
      </footer>
    </div>
  )
}
