import type { MetadataRoute } from 'next'
import { SITE, abs } from '@/lib/site'

/** Statik eksport rejimida ham build vaqtida yaratiladi. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/static/chunks/'],
      },
      { userAgent: 'Yandex', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
    ],
    sitemap: abs('/sitemap.xml'),
    host: SITE.url,
  }
}
