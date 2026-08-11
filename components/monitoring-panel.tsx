import { BrandWordmark } from '@/components/brand'
import { MiniBarChart, Sparkline } from '@/components/charts'
import { IconBell, IconMic, IconTrendDown, IconTrendUp, IconUser, IconVideo, IconWifi } from '@/components/icons'
import type { Dictionary } from '@/lib/content'

const rowIcons = [IconVideo, IconWifi, IconMic]

/**
 * Kameralarni boshqarish panelining ko'rgazmali maketi (dekorativ).
 * Kichik ekranlarda ustunlar soni kamayadi - aks holda panel gorizontal
 * scroll hosil qiladi (grid elementlari min-content dan kichrayolmaydi).
 */
export default function MonitoringPanel({ panel, label }: { panel: Dictionary['panel']; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.08)', fontSize: 11, minWidth: 0 }}
    >
      {/* Topbar */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <BrandWordmark height={20} />
        {panel.tabs.map((t) => (
          <span key={t} className="hidden md:inline" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{t}</span>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(245, 166, 35,0.9)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconBell width={13} height={13} />
          </span>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(245, 166, 35,0.22)', color: '#86e79a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconUser width={13} height={13} />
          </span>
        </div>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {panel.stats.map((s) => (
          <div key={s.label} className="p-3" style={{ borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', minWidth: 0 }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8, marginBottom: 3, letterSpacing: 1 }}>{s.label}</div>
            <div data-counter style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{s.value}</div>
            <div className="flex items-center justify-between gap-2 mt-1" style={{ minWidth: 0 }}>
              <span className="flex items-center gap-1" style={{ color: s.up ? '#f5c06a' : '#f87171', fontSize: 8, whiteSpace: 'nowrap' }}>
                {s.up ? <IconTrendUp width={10} height={10} /> : <IconTrendDown width={10} height={10} />}
                {s.change}
              </span>
              <span className="hidden sm:inline"><Sparkline color={s.up ? '#f5c06a' : '#f87171'} up={s.up} /></span>
            </div>
          </div>
        ))}
      </div>

      {/* Tana qismi */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="p-3" style={{ borderRight: '1px solid rgba(255,255,255,0.06)', minWidth: 0 }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 10, marginBottom: 4 }}>{panel.connect.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, marginBottom: 8 }}>{panel.connect.subtitle}</div>
          {panel.connect.rows.map((item, i) => {
            const RowIcon = rowIcons[i] ?? IconVideo
            return (
              <div key={item.name} className="flex items-center justify-between gap-2 py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', minWidth: 0 }}>
                <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 7, background: 'rgba(245, 166, 35,0.14)', color: '#86e79a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <RowIcon width={12} height={12} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: '#fff', fontSize: 9, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8 }}>{item.sub}</div>
                  </div>
                </div>
                <span style={{ color: '#f5a623', fontSize: 8, background: 'rgba(245, 166, 35,0.12)', padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>{panel.connect.action}</span>
              </div>
            )
          })}
        </div>
        <div className="p-3" style={{ minWidth: 0 }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 10, marginBottom: 4 }}>{panel.chart.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, marginBottom: 8 }}>{panel.chart.subtitle}</div>
          <MiniBarChart />
        </div>
      </div>
    </div>
  )
}
