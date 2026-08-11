import type { Metadata } from 'next'
import ShopPage from '@/components/shop/shop-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata('uz', 'shop')

export default function Page() {
  return <ShopPage locale="uz" />
}
