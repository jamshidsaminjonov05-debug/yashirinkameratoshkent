import type { NextConfig } from 'next'

/**
 * NEXT_OUTPUT=export bilan build qilinsa - to'liq statik sayt (`out/` papkasi).
 * Oddiy `next build` esa Node serverli (SSR/ISR) rejimni beradi.
 */
const isStaticExport = process.env.NEXT_OUTPUT === 'export'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // AGENTS.md faylini loyiha o'zi boshqaradi - Next uni qayta yozmasin.
  agentRules: false,
  ...(isStaticExport ? { output: 'export' as const } : {}),
  // Trailing slash — hreflang manzillari (https://yashirincamera.uz/uz/) bilan mos bo'lishi uchun.
  trailingSlash: true,
  images: {
    /*
     * MUHIM: `trailingSlash: true` bo'lganda Next rasm manzilini
     * `/_next/image/?url=...` (oxirida slash) qilib yozadi, Vercel'ning
     * rasm optimizatori esa faqat `/_next/image?url=...` ni taniydi -
     * natijada Vercel'da rasmlar chiqmaydi.
     *
     * Barcha rasmlarimiz allaqachon siqilgan .webp (10-70 KB), shuning uchun
     * optimizatorni o'chiramiz: <Image> to'g'ridan-to'g'ri /public dagi
     * faylga murojaat qiladi va hamma joyda bir xil ishlaydi.
     */
    unoptimized: true,
  },
}

export default nextConfig
