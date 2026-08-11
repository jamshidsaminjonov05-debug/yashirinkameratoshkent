import type { Metadata } from 'next'
import { getDictionary } from '@/lib/content'
import { htmlLang, ogLocale, otherLocale, pagePath, routes, type Locale, type PageKey } from '@/lib/i18n'
import { SITE, abs } from '@/lib/site'

/**
 * Har bir til uchun to'liq meta teglar to'plami.
 * Next.js buni <head> ichida title, description, canonical, hreflang,
 * robots, Open Graph, Twitter va verification teglariga aylantiradi.
 */
export function buildMetadata(locale: Locale, page: PageKey = 'home'): Metadata {
  const d = getDictionary(locale)
  const path = pagePath(page, locale)
  const meta =
    page === 'shop'
      ? {
          title: d.shop.meta.title,
          description: d.shop.meta.description,
          keywords: d.shop.meta.keywords,
          ogTitle: d.shop.meta.title,
          ogDescription: d.shop.meta.description,
        }
      : {
          title: d.meta.title,
          description: d.meta.description,
          keywords: d.meta.keywords,
          ogTitle: d.meta.ogTitle,
          ogDescription: d.meta.ogDescription,
        }

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: meta.title,
      template: `%s | ${SITE.name}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    applicationName: SITE.name,
    generator: 'Next.js',
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: 'shopping',
    referrer: 'origin-when-cross-origin',
    formatDetection: { telephone: true, address: true, email: true },
    alternates: {
      canonical: path,
      languages: {
        ru: routes[page].ru,
        uz: routes[page].uz,
        'x-default': routes[page].ru,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[otherLocale(locale)]],
      url: abs(path),
      siteName: SITE.name,
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [SITE.ogImage],
    },
    verification: {
      google: SITE.verification.google,
      yandex: SITE.verification.yandex,
    },
    other: {
      // Next.js robots API bingbot'ni qamrab olmaydi - qo'lda qo'shamiz.
      bingbot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      'geo.region': 'UZ-TK',
      'geo.placename': SITE.address.locality,
      'geo.position': `${SITE.geo.lat};${SITE.geo.lng}`,
      ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
    },
  }
}

/**
 * JSON-LD strukturaviy ma'lumotlar (schema.org @graph):
 * WebSite + WebPage + Store (LocalBusiness) + mahsulotlar ro'yxati + breadcrumb.
 * Google va Yandex boy snippetlari (Rich Snippets) uchun.
 */
export function buildJsonLd(locale: Locale, page: PageKey = 'home') {
  const d = getDictionary(locale)
  const path = pagePath(page, locale)
  const pageUrl = abs(path)
  const homeUrl = abs(pagePath('home', locale))
  const lang = htmlLang[locale]
  const isShop = page === 'shop'
  const pageTitle = isShop ? d.shop.meta.title : d.meta.title
  const pageDescription = isShop ? d.shop.meta.description : d.meta.description
  /** Mahsulot rasmi hali yuklanmagan bo'lsa - do'kon logotipi ishlatiladi. */
  const productImage = (image: string) => abs(image || SITE.ogImage)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: SITE.name,
        description: d.meta.siteDescription,
        publisher: { '@id': `${SITE.url}/#store` },
        inLanguage: ['uz-UZ', 'ru-RU'],
      },
      {
        '@type': isShop ? 'CollectionPage' : 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@id': `${SITE.url}/#store` },
        primaryImageOfPage: { '@id': `${SITE.url}/#logo` },
        inLanguage: lang,
      },
      {
        '@type': 'Store',
        '@id': `${SITE.url}/#store`,
        name: SITE.name,
        alternateName: locale === 'ru' ? SITE.nameRu : SITE.name,
        legalName: SITE.legalName,
        foundingDate: String(SITE.foundedYear),
        description: d.meta.siteDescription,
        url: `${SITE.url}/`,
        image: abs(SITE.ogImage),
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE.url}/#logo`,
          url: abs(SITE.logo),
          contentUrl: abs(SITE.logo),
          width: SITE.logoSize,
          height: SITE.logoSize,
          caption: SITE.name,
        },
        telephone: [SITE.phone, SITE.phone2, SITE.servicePhone],
        email: SITE.email,
        priceRange: SITE.priceRange,
        currenciesAccepted: SITE.currency,
        paymentAccepted: locale === 'ru' ? 'Наличные, Карта, Перевод' : "Naqd pul, Karta, O'tkazma",
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE.geo.lat,
          longitude: SITE.geo.lng,
        },
        areaServed: [
          { '@type': 'City', name: locale === 'ru' ? 'Ташкент' : 'Toshkent' },
          { '@type': 'Country', name: locale === 'ru' ? 'Узбекистан' : "O'zbekiston" },
        ],
        sameAs: [SITE.instagram, SITE.telegram],
        hasOfferCatalog: { '@id': `${pageUrl}#catalog` },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#catalog`,
        name: d.products.title,
        numberOfItems: d.products.items.length,
        itemListElement: d.products.items.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            '@id': `${pageUrl}#product-${product.id}`,
            name: product.name,
            description: product.desc,
            image: productImage(product.image),
            category: d.products.eyebrow,
            brand: { '@type': 'Brand', name: SITE.name },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: SITE.currency,
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              url: isShop ? `${pageUrl}#${product.id}` : `${pageUrl}#mahsulotlar`,
              seller: { '@id': `${SITE.url}/#store` },
            },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'ru' ? 'Главная' : 'Bosh sahifa',
            item: homeUrl,
          },
          isShop
            ? {
                '@type': 'ListItem',
                position: 2,
                name: locale === 'ru' ? 'Магазин' : "Do'kon",
                item: pageUrl,
              }
            : {
                '@type': 'ListItem',
                position: 2,
                name: d.products.eyebrow,
                item: `${pageUrl}#mahsulotlar`,
              },
        ],
      },
    ],
  }
}
