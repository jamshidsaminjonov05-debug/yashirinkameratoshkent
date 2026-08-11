/**
 * Sayt bo'yicha yagona haqiqat manbai (single source of truth).
 * Ma'lumotlar do'konning rasmiy Telegram kanalidan olingan: @yashirincamera
 */
export const SITE = {
  name: 'YASHIRIN CAMERA',
  /** Rus tilidagi brend nomi (Telegram kanal sarlavhasi). */
  nameRu: 'Скрытая Камера',
  legalName: "YASHIRIN CAMERA - optom va chakana savdo do'koni",
  /** Ishlab chiqarish domeni. Vercel/boshqa hostda NEXT_PUBLIC_SITE_URL bilan almashtiring. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yashirincamera.uz').replace(/\/$/, ''),
  phone: '+998 95 040-40-20',
  phoneHref: '+998950404020',
  phone2: '+998 95 040-40-60',
  phone2Href: '+998950404060',
  /** Servis xizmati - o'rnatish, sozlash va ta'mirlash. */
  servicePhone: '+998 90 976-66-69',
  servicePhoneHref: '+998909766669',
  /** Do'kon qaysi yildan beri ishlaydi (footer, "biz haqimizda" va JSON-LD uchun). */
  foundedYear: 2013,
  /** Nechta davlatga yetkazib beriladi. */
  countriesServed: 98,
  /** Telegram profil (operator bilan yozishish) */
  telegram: 'https://t.me/yashirincamera',
  /** Telegram kanal (yangi mahsulotlar) */
  telegramChannel: 'https://t.me/yashirincamera',
  telegramHandle: '@yashirincamera',
  email: 'info@yashirincamera.uz',
  logo: '/logo.svg',
  // trailingSlash: true bo'lgani uchun yakuniy slash bilan - qayta yo'naltirishsiz ochiladi
  ogImage: '/opengraph-image/',
  priceRange: '400000 - 1400000 UZS',
  currency: 'UZS',
  address: {
    street: 'Olmazor tumani',
    locality: 'Toshkent',
    region: 'Toshkent shahri',
    postalCode: '100000',
    country: 'UZ',
  },
  geo: { lat: 41.343, lng: 69.203 },
  /** Yetkazib berish xizmati */
  delivery: {
    partner: 'BTS EXPRESS',
    days: '1-2',
    tashkentPrice: 20000,
  },
  /** Search Console tasdiqlash kodlari — .env.local orqali to'ldiriladi. */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? 'SIZNING_GOOGLE_VERIFICATION_KODINGIZ',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? 'SIZNING_YANDEX_VERIFICATION_KODINGIZ',
  },
} as const

export const abs = (path: string) => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
