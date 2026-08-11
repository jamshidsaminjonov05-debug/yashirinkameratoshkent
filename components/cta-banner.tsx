import Link from 'next/link'
import type { Dictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'

export default function CTABanner({ cta, locale }: { cta: Dictionary['cta']; locale: Locale }) {
  const shop = pagePath('shop', locale)

  return (
    <section style={{ padding: '60px 20px' }}>
      <div
        className="reveal max-w-screen-xl mx-auto"
        style={{ background: 'linear-gradient(135deg, #1a0e08, #2a1508)', border: '1px solid rgba(30,168,50,0.3)', borderRadius: 24, padding: 'clamp(32px, 5vw, 60px)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(30,168,50,0.1)' }}
      >
        <div data-parallax="40" style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,168,50,0.15), transparent 70%)' }} />
        <p style={{ color: '#1ea832', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, position: 'relative' }}>{cta.eyebrow}</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 52px)', color: '#fff', lineHeight: 1.1, marginBottom: 16, position: 'relative' }}>{cta.title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7, position: 'relative' }}>{cta.desc}</p>
        <div className="flex flex-wrap gap-3 justify-center" style={{ position: 'relative' }}>
          <Link className="btn-primary" href={shop} data-magnetic>{cta.primary}</Link>
          <a className="btn-secondary" href="#narxlar">{cta.secondary}</a>
        </div>
      </div>
    </section>
  )
}
