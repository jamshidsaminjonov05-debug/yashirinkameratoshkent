import type { Metadata, Viewport } from 'next'
import { fontClassName } from '@/app/fonts'
import '@/app/globals.css'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('ru')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090f',
  colorScheme: 'dark',
}

/** Rus tilidagi ildiz layout - "/" manzili uchun. */
export default function RuRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" dir="ltr" className={fontClassName}>
      <body>{children}</body>
    </html>
  )
}
