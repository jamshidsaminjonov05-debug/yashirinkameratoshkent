import type { MetadataRoute } from 'next'
import { routes } from '@/lib/i18n'
import { abs } from '@/lib/site'

/** Statik eksport rejimida ham build vaqtida yaratiladi. */
export const dynamic = 'force-static'

const languagesFor = (page: 'home' | 'shop') => ({
  ru: abs(routes[page].ru),
  uz: abs(routes[page].uz),
  'x-default': abs(routes[page].ru),
})

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const pages = ['home', 'shop'] as const

  return pages.flatMap((page) =>
    (['ru', 'uz'] as const).map((locale) => ({
      url: abs(routes[page][locale]),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: page === 'home' ? 1 : 0.9,
      alternates: { languages: languagesFor(page) },
    })),
  )
}
