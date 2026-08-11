import Link from 'next/link'
import HoverLift from '@/components/animations/hover-lift'
import { IconCheck } from '@/components/icons'
import { formatPrice, type Dictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'

export default function Pricing({ pricing, locale }: { pricing: Dictionary['pricing']; locale: Locale }) {
  const shop = pagePath('shop', locale)

  return (
    <section id="narxlar" style={{ padding: '80px 0' }}>
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="reveal text-center mb-12">
          <p style={{ color: '#f5a623', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{pricing.eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: '#fff', marginBottom: 12 }}>{pricing.title}</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>{pricing.subtitle}</p>
        </div>

        <div data-anim="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {pricing.plans.map((plan) => (
            <HoverLift
              key={plan.name}
              className={`card ${plan.highlighted ? 'card-brand-border' : ''}`}
              lift={plan.highlighted ? 10 : 6}
              style={{ padding: 28, position: 'relative', overflow: 'hidden' }}
            >
              {plan.highlighted && (
                <>
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: '#f5a623', color: '#1b1710', fontSize: 10, fontWeight: 700, padding: '3px 16px', borderRadius: '0 0 8px 8px', letterSpacing: 1 }}>
                    {pricing.popular}
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 120%, rgba(245, 166, 35,0.08), transparent 60%)', pointerEvents: 'none' }} />
                </>
              )}
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(26px, 3vw, 34px)', color: '#fff', lineHeight: 1.1 }}>
                <data value={plan.price}>{formatPrice(locale, plan.price)}</data>{' '}
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-muted)' }}>/ {pricing.perKit}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, marginTop: 8, marginBottom: 8 }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{plan.desc}</p>
              <Link
                href={shop}
                className={plan.highlighted ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center', marginBottom: 24 }}
              >
                {plan.cta}
              </Link>
              <div className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <div key={f} className="check-item" style={{ fontSize: 14 }}>
                    <span className="check-icon" style={{ width: 22, height: 22 }}><IconCheck width={12} height={12} /></span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </HoverLift>
          ))}
        </div>
      </div>
    </section>
  )
}
