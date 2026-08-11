import Link from 'next/link'
import { IconBell, IconBolt, IconCheck, IconHeadphones, IconMapPin, IconSatellite } from '@/components/icons'
import type { Dictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'

const panelIcons = [IconSatellite, IconBell, IconBolt]
const [ChipIconA, ChipIconB] = [IconMapPin, IconHeadphones]

export default function DetectorsSection({ detectors, locale }: { detectors: Dictionary['detectors']; locale: Locale }) {
  const shop = pagePath('shop', locale)

  return (
    <section id="detektorlar" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(30,168,50,0.07)', top: 0, right: -100 }} />
      <div className="max-w-screen-xl mx-auto px-5 relative" style={{ zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
          {/* Vizual */}
          <div className="reveal order-2 md:order-1">
            <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 120%, rgba(140,80,30,0.4), transparent 60%)' }} />
              <div className="relative" style={{ zIndex: 1 }}>
                {detectors.panel.features.map((item, i) => {
                  const PanelIcon = panelIcons[i] ?? IconSatellite
                  return (
                    <div key={item.name} className="flex items-center gap-3 mb-3">
                      <span style={{ width: 44, height: 44, borderRadius: 13, background: 'linear-gradient(150deg, #1ea832, #178a2a)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 20px rgba(30,168,50,0.28)' }} aria-hidden="true">
                        <PanelIcon width={20} height={20} />
                      </span>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, margin: 0 }}>{item.name}</h3>
                        <div style={{ color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.4 }}>{item.desc}</div>
                      </div>
                    </div>
                  )
                })}
                <div style={{ position: 'relative', height: 80, marginTop: 8 }} aria-hidden="true">
                  <div className="flex items-center gap-2" style={{ position: 'absolute', left: 10, bottom: 0, background: '#1ea832', color: '#fff', borderRadius: 10, padding: '8px 14px', transform: 'rotate(-6deg)', fontSize: 11, fontWeight: 700 }}>
                    <ChipIconA width={14} height={14} />
                    <span>{detectors.panel.chips[0]}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ position: 'absolute', left: 110, bottom: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px 14px', transform: 'rotate(4deg)', fontSize: 11, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <ChipIconB width={14} height={14} />
                    <span>{detectors.panel.chips[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matn */}
          <div className="reveal reveal-delay-1 order-1 md:order-2">
            <p className="section-eyebrow" style={{ textAlign: 'left' }}>{detectors.eyebrow}</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 42px)', color: '#fff', lineHeight: 1.12, marginBottom: 16 }}>{detectors.title}</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 8 }}>{detectors.p1}</p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>{detectors.p2}</p>
            <Link className="btn-secondary" href={shop} style={{ marginBottom: 28 }}>{detectors.cta}</Link>
            <div className="flex flex-col gap-3">
              {detectors.checks.map((text) => (
                <div key={text} className="check-item">
                  <span className="check-icon"><IconCheck width={15} height={15} /></span>
                  <span style={{ fontSize: 15 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
