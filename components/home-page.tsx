import GsapAnimations from '@/components/animations/gsap-animations'
import ScrollProgress from '@/components/animations/scroll-progress'
import Blog from '@/components/blog'
import CatalogSection from '@/components/catalog-section'
import CTABanner from '@/components/cta-banner'
import DetectorsSection from '@/components/detectors-section'
import FeaturesBento from '@/components/features-bento'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import LogosTicker from '@/components/logos-ticker'
import Navbar from '@/components/navbar'
import Pricing from '@/components/pricing'
import Products from '@/components/products'
import { getDictionary } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { buildJsonLd } from '@/lib/seo'

/**
 * Bosh sahifa - ikkala til uchun bitta tuzilma.
 * Sahifada faqat bitta <h1> bo'ladi (Hero), qolgan bo'limlar <h2>, kartalar <h3>.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const jsonLd = buildJsonLd(locale, 'home')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* JSON-LD strukturaviy ma'lumotlar (Google / Yandex rich snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* WordPress uslubidagi XFN profil havolasi - React uni <head> ga ko'taradi */}
      <link rel="profile" href="https://gmpg.org/xfn/11" />

      <a className="skip-link" href="#asosiy">{d.a11y.skipToContent}</a>

      <ScrollProgress />
      <GsapAnimations />
      <Navbar locale={locale} nav={d.nav} a11y={d.a11y} />

      <main id="asosiy">
        <Hero hero={d.hero} panel={d.panel} locale={locale} />
        <LogosTicker ticker={d.ticker} />
        <FeaturesBento features={d.features} />
        <CatalogSection catalog={d.catalog} locale={locale} />
        <Products products={d.products} shopCard={d.shop.card} locale={locale} />
        <DetectorsSection detectors={d.detectors} locale={locale} />
        <Pricing pricing={d.pricing} locale={locale} />
        <Blog blog={d.blog} />
        <CTABanner cta={d.cta} locale={locale} />
      </main>

      <Footer footer={d.footer} />
    </div>
  )
}
