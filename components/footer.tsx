import { BrandWordmark } from '@/components/brand'
import type { Dictionary } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function Footer({ footer }: { footer: Dictionary['footer'] }) {
  const year = 2026

  return (
    <footer id="aloqa" style={{ borderTop: '1px solid var(--border)', padding: '48px 20px 24px' }}>
      <div className="max-w-screen-xl mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 40 }}>
          <div>
            <BrandWordmark height={38} />
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7, marginTop: 12 }}>{footer.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>{col.title}</h2>
              {col.links.map((link) => (
                <a key={link.label} href={link.href} className="footer-link" style={{ display: 'block', fontSize: 13, marginBottom: 8, textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </nav>
          ))}

          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>{footer.contactsTitle}</h2>
            <address style={{ fontStyle: 'normal', color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8 }}>
              <a href={`tel:${SITE.phoneHref}`} className="footer-link" style={{ display: 'block', textDecoration: 'none' }}>{SITE.phone}</a>
              <a href={`tel:${SITE.phone2Href}`} className="footer-link" style={{ display: 'block', textDecoration: 'none' }}>{SITE.phone2}</a>
              <span style={{ display: 'block', marginTop: 8, fontSize: 12 }}>{footer.serviceLabel}</span>
              <a href={`tel:${SITE.servicePhoneHref}`} className="footer-link" style={{ display: 'block', textDecoration: 'none' }}>{SITE.servicePhone}</a>
              <span style={{ display: 'block', marginTop: 8 }}>
                {footer.addressLabel}: {SITE.address.locality}, {SITE.address.street}
              </span>
              <span style={{ display: 'block' }}>{footer.hours}</span>
            </address>
            <div className="flex flex-col gap-1 mt-3">
              <a href={SITE.instagram} className="footer-link" rel="noopener noreferrer" target="_blank" style={{ fontSize: 13, textDecoration: 'none' }}>
                Instagram {SITE.instagramHandle}
              </a>
              <a href={SITE.telegram} className="footer-link" rel="noopener noreferrer" target="_blank" style={{ fontSize: 13, textDecoration: 'none' }}>
                Telegram {SITE.telegramHandle}
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>© {year} {SITE.name}. {footer.rights}</span>
          <div className="flex gap-4">
            {footer.legal.map((t) => (
              <a key={t} href="#aloqa" className="footer-link" style={{ fontSize: 12, textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
