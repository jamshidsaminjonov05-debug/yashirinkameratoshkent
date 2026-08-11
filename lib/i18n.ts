export const locales = ['ru', 'uz'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ru'

/** Sayt sahifalari. Har biri ikkala tilda o'z manziliga ega. */
export type PageKey = 'home' | 'shop'

export const routes: Record<PageKey, Record<Locale, string>> = {
  home: { ru: '/', uz: '/uz/' },
  shop: { ru: '/magazin/', uz: '/uz/dokon/' },
}

/** Har bir til uchun URL prefiksi: ru → "/", uz → "/uz/". */
export const localeRoot: Record<Locale, string> = routes.home

export const pagePath = (page: PageKey, locale: Locale): string => routes[page][locale]

/** <html lang="..."> va hreflang uchun to'liq kodlar. */
export const htmlLang: Record<Locale, string> = {
  ru: 'ru-RU',
  uz: 'uz-UZ',
}

export const ogLocale: Record<Locale, string> = {
  ru: 'ru_RU',
  uz: 'uz_UZ',
}

/** Ichki havola yasash: href('uz', '#katalog') → "/uz/#katalog" */
export function href(locale: Locale, path = ''): string {
  const root = localeRoot[locale]
  if (!path) return root
  if (path.startsWith('#')) return `${root}${path}`
  return `${root}${path.replace(/^\//, '')}`
}

export const otherLocale = (locale: Locale): Locale => (locale === 'ru' ? 'uz' : 'ru')
