import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TiltCard from '@/components/animations/tilt-card'
import MonitoringPanel from '@/components/monitoring-panel'
import type { Dictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'

type Props = {
  hero: Dictionary['hero']
  panel: Dictionary['panel']
  locale: Locale
}

/**
 * Hero - markazlashtirilgan kompozitsiya:
 * belgi → sarlavha → tavsif → tugmalar → mahsulot rasmi → boshqaruv paneli.
 * Uch qatlam scrollda turli tezlikda suzadi (GSAP parallaks).
 */
export default function Hero({ hero, panel, locale }: Props) {
  const shop = pagePath('shop', locale)
  // Sarlavha so'zma-so'z animatsiya qilinadi (GSAP), matn HTML'da to'liq qoladi.
  const words = hero.title.split(' ')

  return (
    <section id="bosh" className="hero-section">
      <div className="glow-orb animate-glow-pulse hero-glow" aria-hidden="true" />

      <div className="hero-inner max-w-screen-xl mx-auto px-5">
        {/* ── Matn qismi ────────────────────────────────────────────── */}
        <div className="hero-copy">
          <div data-hero-item className="hero-badges">
            <span className="hero-badge--new">{hero.badgeNew}</span>
            <Link href={shop} className="hero-badge--link">
              {hero.badgeUpdate}
            </Link>
          </div>

          <h1 className="hero-title">
            {words.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span className="hero-word">
                  <span>{word}</span>
                </span>
                {i < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>

          <p data-hero-item className="hero-desc">{hero.description}</p>

          <div data-hero-item className="hero-actions">
            <a className="btn-secondary" href="#katalog">{hero.ctaSecondary}</a>
            <Link className="btn-primary" href={shop} data-magnetic>{hero.ctaPrimary}</Link>
          </div>
        </div>

        {/* ── Mahsulot rasmi (markazda) ─────────────────────────────── */}
        <div className="hero-bg">
          <Image
            src="/hero.webp"
            alt={hero.imageAlt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 720px"
            className="hero-bg__img"
          />
          <div aria-hidden="true" className="hero-bg__fade" />
        </div>

        {/* ── Boshqaruv paneli ──────────────────────────────────────── */}
        <div className="hero-panel">
          <div data-hero-item>
            <TiltCard strength={5}>
              <MonitoringPanel panel={panel} label={hero.panelAria} />
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
