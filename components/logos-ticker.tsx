import {
  IconBadge, IconClock, IconCreditCard, IconGlobe, IconLock, IconSend, IconShieldCheck, IconTruck,
} from '@/components/icons'
import type { Dictionary } from '@/lib/content'

/** Ticker bandlariga mos ikonkalar (dictionary'dagi tartib bo'yicha). */
const tickerIcons = [
  IconBadge, // 100% original mahsulot
  IconLock, // oldindan to'lovsiz - xavfsiz
  IconTruck, // BTS EXPRESS pochta
  IconClock, // 1-2 kunda yetkazish
  IconCreditCard, // naqd yoki plastik karta
  IconSend, // Telegram orqali buyurtma
  IconGlobe, // butun O'zbekiston bo'ylab
  IconShieldCheck, // sifat kafolatlangan
]

export default function LogosTicker({ ticker }: { ticker: Dictionary['ticker'] }) {
  const items = ticker.items.map((label, i) => ({ label, Icon: tickerIcons[i] ?? IconBadge }))
  const doubled = [...items, ...items]

  return (
    <section style={{ padding: '48px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>{ticker.note}</p>
      <div
        aria-hidden="true"
        className="ticker-wrap"
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div className="ticker-track flex" style={{ gap: 44, whiteSpace: 'nowrap', width: 'max-content' }}>
          {doubled.map(({ label, Icon }, i) => (
            <span
              key={`${label}-${i}`}
              className="flex items-center gap-2.5"
              style={{ color: 'rgba(255,255,255,0.42)', fontSize: 15, fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: 0.2 }}
            >
              <Icon width={17} height={17} style={{ color: 'rgba(245, 166, 35,0.75)' }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
