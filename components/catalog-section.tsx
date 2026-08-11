import Link from 'next/link'
import {
  IconCheck, IconChevron, IconCircleDot, IconCloud, IconLock, IconPlay, IconSatellite, IconShieldCheck, IconSparkle,
} from '@/components/icons'
import type { Dictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'

const featureIcons = [IconSatellite, IconCloud, IconLock]

export default function CatalogSection({ catalog, locale }: { catalog: Dictionary['catalog']; locale: Locale }) {
  const shop = pagePath('shop', locale)

  return (
    <section id="katalog" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(30,168,50,0.07)', top: 0, left: -100 }} />
      <div className="max-w-screen-xl mx-auto px-5 relative" style={{ zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
          {/* Chap: matn + ro'yxat */}
          <div>
            <div className="reveal">
              <p className="section-eyebrow" style={{ textAlign: 'left' }}>{catalog.eyebrow}</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 42px)', color: '#fff', lineHeight: 1.12, marginBottom: 16 }}>{catalog.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 8 }}>{catalog.p1}</p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>{catalog.p2}</p>
              <Link className="btn-secondary" href={shop} style={{ marginBottom: 28 }}>{catalog.cta}</Link>
            </div>
            <div className="reveal reveal-delay-1 flex flex-col gap-3">
              {catalog.checks.map((text) => (
                <div key={text} className="check-item">
                  <span className="check-icon"><IconCheck width={15} height={15} /></span>
                  <span style={{ fontSize: 15 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* O'ng: bo'limlar maketi */}
          <div className="reveal reveal-delay-2">
            <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(140,80,30,0.5), transparent 70%)' }} />
              <div className="relative" style={{ zIndex: 1 }}>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ background: '#1ea832', color: '#fff', borderRadius: 6, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
                    <IconPlay width={10} height={10} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14 }}>{catalog.panel.groupTitle}</span>
                  <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }} aria-hidden="true"><IconChevron width={13} height={13} /></span>
                  <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                </div>
                {catalog.panel.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-2" style={{ paddingLeft: item.depth * 20, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {item.depth === 0 && (
                      <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }} aria-hidden="true"><IconCircleDot width={14} height={14} /></span>
                    )}
                    <span style={{ fontSize: 14, color: item.depth === 0 ? '#fff' : 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                  </div>
                ))}
                <div style={{ position: 'absolute', top: 26, right: 8, display: 'flex', alignItems: 'flex-start', gap: 8, color: 'rgba(203,189,255,0.85)' }} aria-hidden="true">
                  <IconSparkle width={16} height={16} />
                  <IconSparkle width={24} height={24} style={{ opacity: 0.6 }} />
                </div>
              </div>

              {/* Xavfsizlik bloki */}
              <div style={{ marginTop: 20, borderRadius: 16, overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%, rgba(140,80,30,0.6), transparent 70%)' }} />
                <div className="p-4 relative" style={{ zIndex: 1 }}>
                  {catalog.panel.features.map((item, i) => {
                    const FeatureIcon = featureIcons[i] ?? IconSatellite
                    return (
                      <div key={item.name} className="flex items-center gap-3 mb-3">
                        <span style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(30,168,50,0.16)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                          <FeatureIcon width={19} height={19} />
                        </span>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, margin: 0 }}>{item.name}</h3>
                          <div style={{ color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.4 }}>{item.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-center pb-4">
                  <span
                    style={{ width: 64, height: 64, background: 'linear-gradient(150deg, #2c2c36, #16161d)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.55)' }}
                    aria-hidden="true"
                  >
                    <IconShieldCheck width={28} height={28} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
