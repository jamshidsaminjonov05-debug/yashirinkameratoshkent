import { Sparkline } from '@/components/charts'
import {
  IconCheck, IconChevron, IconCircleDot, IconPackage, IconPhone, IconPlay, IconSparkle, IconStatus, IconTrendUp, IconTruck,
} from '@/components/icons'
import type { Dictionary } from '@/lib/content'

const stepIcons = [IconPhone, IconPackage, IconCheck]

/**
 * "Nima uchun YASHIRIN CAMERA" - bento to'r (4 ta karta):
 *   ┌───────────┬───────────┬─────────┐
 *   │  Buyurtma │  Katalog  │ Yetka-  │
 *   ├───────────┴───────────┤ zib     │
 *   │      Bo'limlar        │ berish  │
 *   └───────────────────────┴─────────┘
 */
export default function FeaturesBento({ features }: { features: Dictionary['features'] }) {
  return (
    <section id="imkoniyatlar" className="bento-section">
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="reveal text-center mb-12">
          <p className="section-eyebrow">{features.eyebrow}</p>
          <h2 className="section-title">{features.title}</h2>
          <p className="section-subtitle">{features.subtitle}</p>
        </div>

        <div className="bento" data-anim="stagger">
          {/* ── 1. Buyurtma qadamlari ─────────────────────────────── */}
          <article className="bento-card bento-card--steps">
            <div className="bento-head">
              <h3 className="bento-title">{features.steps.title}</h3>
              <p className="bento-desc">{features.steps.desc}</p>
            </div>

            <div className="bento-rows" aria-hidden="true">
              {features.steps.rows.map((row, i) => {
                const StepIcon = stepIcons[i] ?? IconCheck
                return (
                  <div key={row.id} className={`bento-row${i === 0 ? ' bento-row--active' : ''}`}>
                    <span className="bento-row__icon"><StepIcon width={15} height={15} /></span>
                    <span className="bento-row__id">{row.id}</span>
                    <span className="bento-row__dot"><IconStatus width={13} height={13} /></span>
                    <span className="bento-row__label">{row.label}</span>
                  </div>
                )
              })}
            </div>
          </article>

          {/* ── 2. Katalog raqami ─────────────────────────────────── */}
          <article className="bento-card bento-card--stat">
            <div className="bento-head">
              <h3 className="bento-title">{features.stat.title}</h3>
              <p className="bento-desc">{features.stat.desc}</p>
            </div>

            <div className="bento-statcard">
              <div className="bento-statcard__row">
                <span className="bento-statcard__label">{features.stat.label}</span>
                <span className="bento-statcard__change"><IconTrendUp width={13} height={13} /> {features.stat.change}</span>
              </div>
              <div className="bento-statcard__row bento-statcard__row--bottom">
                <span data-counter className="bento-statcard__value">{features.stat.value}</span>
                <Sparkline color="#4ade80" up />
              </div>
            </div>
          </article>

          {/* ── 3. Yetkazib berish (baland karta) ─────────────────── */}
          <article className="bento-card bento-card--create">
            <div className="bento-beam" aria-hidden="true">
              <div className="bento-beam__icon">
                <IconTruck width={32} height={32} />
              </div>
            </div>

            <div className="bento-foot">
              <h3 className="bento-title bento-title--left">{features.create.title}</h3>
              <p className="bento-desc bento-desc--left">{features.create.desc}</p>
            </div>
          </article>

          {/* ── 4. Bo'limlar (keng karta) ─────────────────────────── */}
          <article className="bento-card bento-card--sections">
            <div className="bento-foot bento-foot--side">
              <h3 className="bento-title bento-title--left">{features.sections.title}</h3>
              <p className="bento-desc bento-desc--left">{features.sections.desc}</p>
            </div>

            <div className="bento-tree" aria-hidden="true">
              <div className="bento-tree__head">
                <span className="bento-tree__mark"><IconPlay width={11} height={11} /></span>
                <span className="bento-tree__name">YASHIRIN CAMERA</span>
                <span className="bento-tree__caret"><IconChevron width={13} height={13} /></span>
                <span className="bento-tree__dot" />
              </div>
              {features.sections.items.map((item, i) => (
                <div key={i} className="bento-tree__item" style={{ paddingLeft: 6 + item.depth * 18 }}>
                  {item.depth === 0 && <span className="bento-tree__icon"><IconCircleDot width={14} height={14} /></span>}
                  <span className={item.depth === 0 ? 'bento-tree__label' : 'bento-tree__label bento-tree__label--sub'}>
                    {item.label}
                  </span>
                </div>
              ))}
              <span className="bento-tree__spark bento-tree__spark--sm"><IconSparkle width={16} height={16} /></span>
              <span className="bento-tree__spark bento-tree__spark--lg"><IconSparkle width={26} height={26} /></span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
