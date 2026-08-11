import Link from 'next/link'
import HoverLift from '@/components/animations/hover-lift'
import ProductImage from '@/components/product-image'
import { formatPrice, type Dictionary } from '@/lib/content'
import { pagePath, type Locale } from '@/lib/i18n'

type Props = {
  products: Dictionary['products']
  shopCard: Dictionary['shop']['card']
  locale: Locale
}

/** Bosh sahifadagi ommabop mahsulotlar (to'liq ro'yxat do'kon sahifasida). */
export default function Products({ products, shopCard, locale }: Props) {
  const shop = pagePath('shop', locale)
  const featured = products.items.slice(0, 6)

  return (
    <section id="mahsulotlar" style={{ padding: '80px 0' }}>
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="reveal text-center mb-12">
          <p style={{ color: '#1ea832', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{products.eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: '#fff', marginBottom: 12 }}>{products.title}</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>{products.subtitle}</p>
        </div>

        <div data-anim="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {featured.map((item) => (
            <HoverLift key={item.id} as="article" className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <ProductImage src={item.image} alt={item.alt} label={shopCard.imageSoon} height={200} />
                <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(30,168,50,0.9)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{item.tag}</span>
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, marginBottom: 8, lineHeight: 1.3 }}>{item.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{item.desc}</p>
                <div className="flex flex-col  gap-3" style={{ marginTop: 'auto' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{products.priceFrom}</div>
                    <div className="flex items-baseline gap-2">
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>
                        <data value={item.price}>{formatPrice(locale, item.price)}</data>
                      </div>
                      {item.oldPrice && (
                        <s style={{ color: 'var(--text-muted)', fontSize: 12 }}>{formatPrice(locale, item.oldPrice)}</s>
                      )}
                    </div>
                  </div>
                  <Link className="btn-primary" href={shop} style={{ padding: '10px 20px', fontSize: 13 }}>
                    {products.order}
                  </Link>
                </div>
              </div>
            </HoverLift>
          ))}
        </div>

        <div className="reveal flex justify-center" style={{ marginTop: 32 }}>
          <Link className="btn-secondary" href={shop} data-magnetic>{products.seeAll}</Link>
        </div>
      </div>
    </section>
  )
}
