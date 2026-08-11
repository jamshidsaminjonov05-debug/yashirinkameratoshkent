import { Inter, Outfit } from 'next/font/google'

/**
 * Sarlavhalar uchun Outfit (lotin) - dizayn shrifti.
 * Kirill harflari Outfit'da yo'q, shuning uchun --font-heading stekida
 * Inter zaxira sifatida turadi (globals.css'ga qarang).
 */
export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
})

/** Asosiy matn shrifti - lotin va kirill (rus tili uchun). */
export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const fontClassName = `${outfit.variable} ${inter.variable}`
