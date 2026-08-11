import type { SVGProps } from 'react'

/**
 * YASHIRIN CAMERA ikonka tizimi.
 *
 * Barcha ikonkalar bitta uslubda: 24x24 to'r, faqat chiziq (stroke),
 * qalinlik 1.6, uchlari yumaloq, rang `currentColor` dan olinadi.
 * Emoji ishlatilmaydi - ular tizim shriftiga bog'liq va har qurilmada
 * boshqacha chiqadi.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
  ...props,
})

/* ── Navigatsiya va interfeys ──────────────────────────────────────── */

export const IconGrid = (p: IconProps) => (
  <svg {...base(p)}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>
)

export const IconSearch = (p: IconProps) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
)

export const IconBell = (p: IconProps) => (
  <svg {...base(p)}><path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 3.2.8 4.7 1.6 5.6H4.9c.8-.9 1.6-2.4 1.6-5.6Z" /><path d="M10.2 18.6a2 2 0 0 0 3.6 0" /></svg>
)

export const IconMoon = (p: IconProps) => (
  <svg {...base(p)}><path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z" /></svg>
)

export const IconHelp = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.4" /><circle cx="12" cy="16.8" r="0.6" fill="currentColor" /></svg>
)

export const IconSettings = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v2.4M12 18.8v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" /></svg>
)

export const IconChevron = (p: IconProps) => (
  <svg {...base(p)}><path d="m6 9.5 6 6 6-6" /></svg>
)

export const IconChevronRight = (p: IconProps) => (
  <svg {...base(p)}><path d="m9.5 6 6 6-6 6" /></svg>
)

export const IconFilter = (p: IconProps) => (
  <svg {...base(p)}><path d="M4 7h16M7 12h10M10 17h4" /></svg>
)

export const IconClose = (p: IconProps) => (
  <svg {...base(p)}><path d="m6.5 6.5 11 11M17.5 6.5l-11 11" /></svg>
)

export const IconCheck = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2.4, ...p })}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
)

export const IconTrash = (p: IconProps) => (
  <svg {...base(p)}><path d="M4.5 7h15M9.5 7V5.4A1.4 1.4 0 0 1 10.9 4h2.2a1.4 1.4 0 0 1 1.4 1.4V7" /><path d="M6.5 7 7.4 20h9.2L17.5 7" /></svg>
)

export const IconPlus = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 5.5v13M5.5 12h13" /></svg>
)

export const IconArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}><path d="M8 16 16 8" /><path d="M9.5 8H16v6.5" /></svg>
)

export const IconBack = (p: IconProps) => (
  <svg {...base(p)}><path d="M10 6 4.5 12 10 18" /><path d="M4.5 12H19" /></svg>
)

export const IconUser = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="8.5" r="3.4" /><path d="M5 19.5c.7-3.3 3.4-5.2 7-5.2s6.3 1.9 7 5.2" /></svg>
)

export const IconUsers = (p: IconProps) => (
  <svg {...base(p)}><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19.5c.6-3 2.9-4.8 5.5-4.8s4.9 1.8 5.5 4.8" /><path d="M16 5.6a3.2 3.2 0 0 1 0 6.2" /><path d="M17.5 14.9c2 .5 3.4 2.1 3.9 4.6" /></svg>
)

/* ── Mahsulot va xizmat ikonkalari ─────────────────────────────────── */

export const IconCamera = (p: IconProps) => (
  <svg {...base(p)}><rect x="2.5" y="6.5" width="19" height="12" rx="3" /><circle cx="12" cy="12.5" r="3.4" /><path d="M8.5 6.5 9.7 4.4h4.6l1.2 2.1" /></svg>
)

export const IconVideo = (p: IconProps) => (
  <svg {...base(p)}><rect x="2.5" y="7" width="12.5" height="10" rx="2.5" /><path d="M15 11.5 21 8.5v7l-6-3z" /></svg>
)

export const IconMic = (p: IconProps) => (
  <svg {...base(p)}><rect x="9" y="3" width="6" height="10.5" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" /><path d="M12 18v3" /></svg>
)

export const IconWifi = (p: IconProps) => (
  <svg {...base(p)}><path d="M3.5 9.2a13 13 0 0 1 17 0" /><path d="M6.6 12.6a8.5 8.5 0 0 1 10.8 0" /><path d="M9.7 15.9a4 4 0 0 1 4.6 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></svg>
)

export const IconSatellite = (p: IconProps) => (
  <svg {...base(p)}><path d="M4.5 14.5 9.5 9.5" /><path d="m7 7 3 3" /><rect x="2.6" y="12.4" width="6" height="4.2" rx="1.4" transform="rotate(-45 2.6 12.4)" /><path d="M13.5 4.6a7.5 7.5 0 0 1 5.9 5.9" /><path d="M13 8.7a3.6 3.6 0 0 1 2.3 2.3" /><path d="M9.6 16.1 6 19.7" /></svg>
)

export const IconMapPin = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 21c4-4.4 6-7.6 6-10a6 6 0 1 0-12 0c0 2.4 2 5.6 6 10Z" /><circle cx="12" cy="11" r="2.4" /></svg>
)

export const IconHeadphones = (p: IconProps) => (
  <svg {...base(p)}><path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" /><rect x="2.8" y="13.4" width="4.4" height="6.2" rx="2.2" /><rect x="16.8" y="13.4" width="4.4" height="6.2" rx="2.2" /></svg>
)

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.6-7 9.4-4.1-1.8-7-5.2-7-9.4V6l7-2.8Z" /></svg>
)

export const IconShieldCheck = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.6-7 9.4-4.1-1.8-7-5.2-7-9.4V6l7-2.8Z" /><path d="m9.2 11.9 2 2 3.6-3.8" /></svg>
)

export const IconLock = (p: IconProps) => (
  <svg {...base(p)}><rect x="4.6" y="10.4" width="14.8" height="9.6" rx="3" /><path d="M8.4 10.4V8a3.6 3.6 0 0 1 7.2 0v2.4" /><circle cx="12" cy="15.2" r="1.2" fill="currentColor" stroke="none" /></svg>
)

export const IconCloud = (p: IconProps) => (
  <svg {...base(p)}><path d="M7.4 18.5a4.4 4.4 0 0 1-.5-8.8 5.6 5.6 0 0 1 10.7 1.5 3.7 3.7 0 0 1-.6 7.3H7.4Z" /></svg>
)

export const IconTruck = (p: IconProps) => (
  <svg {...base(p)}><path d="M2.8 7.5h11v9h-11z" /><path d="M13.8 10.5h3.6l3.8 3.6v2.4h-7.4z" /><circle cx="7" cy="18" r="1.9" /><circle cx="17" cy="18" r="1.9" /></svg>
)

export const IconPackage = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 3.2 20 7.4v9.2L12 20.8 4 16.6V7.4z" /><path d="M4 7.4 12 11.6l8-4.2" /><path d="M12 11.6v9.2" /></svg>
)

export const IconPhone = (p: IconProps) => (
  <svg {...base(p)}><path d="M6.4 3.8h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.1 5.1l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 4.4 6a2 2 0 0 1 2-2.2Z" /></svg>
)

export const IconSend = (p: IconProps) => (
  <svg {...base(p)}><path d="M20.5 3.5 10.8 13.2" /><path d="M20.5 3.5 14.3 20.5l-3.5-7.3-7.3-3.5z" /></svg>
)

export const IconCreditCard = (p: IconProps) => (
  <svg {...base(p)}><rect x="2.5" y="5.5" width="19" height="13" rx="3" /><path d="M2.5 10h19" /><path d="M6.5 14.5h4" /></svg>
)

export const IconClock = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.6" /><path d="M12 7.4V12l3.1 2" /></svg>
)

export const IconBadge = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 2.9 14.5 5l3-.2.9 2.9 2.6 1.5-1.2 2.8 1.2 2.8-2.6 1.5-.9 2.9-3-.2L12 21.1 9.5 19l-3 .2-.9-2.9L3 14.8 4.2 12 3 9.2l2.6-1.5.9-2.9 3 .2z" /><path d="m9.4 12 1.9 1.9 3.4-3.6" /></svg>
)

export const IconBolt = (p: IconProps) => (
  <svg {...base(p)}><path d="M13.2 2.8 5.4 13.4h5.3l-.9 7.8 7.8-10.6h-5.3z" /></svg>
)

export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.6" /><path d="M3.6 12h16.8" /><path d="M12 3.4a13 13 0 0 1 0 17.2 13 13 0 0 1 0-17.2Z" /></svg>
)

export const IconSparkle = (p: IconProps) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...p })}><path d="M12 2.5c.5 4.6 2.4 6.5 7 7-4.6.5-6.5 2.4-7 7-.5-4.6-2.4-6.5-7-7 4.6-.5 6.5-2.4 7-7Z" /></svg>
)

export const IconPlay = (p: IconProps) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...p })}><path d="M8 5.5v13l10-6.5z" /></svg>
)

export const IconCircleDot = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" /></svg>
)

/** Yarim to'ldirilgan doira - holat ko'rsatkichi */
export const IconStatus = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" /></svg>
)

export const IconTrendUp = (p: IconProps) => (
  <svg {...base(p)}><path d="M4 16.5 9.5 11l3.5 3.5L20 7.5" /><path d="M14.5 7.5H20V13" /></svg>
)

export const IconTrendDown = (p: IconProps) => (
  <svg {...base(p)}><path d="M4 7.5 9.5 13l3.5-3.5 7 7" /><path d="M14.5 16.5H20V11" /></svg>
)

export const IconBag = (p: IconProps) => (
  <svg {...base(p)}><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
)

export const IconHeart = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 19.5s-6.8-4-6.8-8.6A3.9 3.9 0 0 1 12 8.3a3.9 3.9 0 0 1 6.8 2.6c0 4.6-6.8 8.6-6.8 8.6Z" /></svg>
)
