import type { Metadata, Viewport } from 'next'
import { fontClassName } from '@/app/fonts'
import '@/app/globals.css'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('uz')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#141118',
  colorScheme: 'dark',
}

/** O'zbek tilidagi ildiz layout - "/uz/" manzili uchun. */
export default function UzRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" dir="ltr" className={fontClassName}>
      <body>{children}</body>
    </html>
  )
}
