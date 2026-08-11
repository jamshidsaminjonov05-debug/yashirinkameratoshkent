/**
 * Sayt bo'yicha yagona haqiqat manbai (single source of truth).
 * Ma'lumotlar do'konning rasmiy Instagram profilidan olingan: @yashirincamera.uz
 * (Telegram: @Yashirincamera_tashkent)
 */
export const SITE = {
  name: 'YASHIRIN CAMERA',
  /** Rus tilidagi brend nomi (Instagram profil sarlavhasi). */
  nameRu: 'Скрытая Камера',
  legalName: "YASHIRIN CAMERA - optom va chakana savdo do'koni",
  /** Ishlab chiqarish domeni. Vercel/boshqa hostda NEXT_PUBLIC_SITE_URL bilan almashtiring. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yashirincamera.uz').replace(/\/$/, ''),
  phone: '+998 99 086-99-99',
  phoneHref: '+998990869999',
  phone2: '+998 93 811-99-99',
  phone2Href: '+998938119999',
  /** Servis xizmati - o'rnatish, sozlash va ta'mirlash. */
  servicePhone: '+998 70 052-88-88',
  servicePhoneHref: '+998700528888',
  /** Do'kon qaysi yildan beri ishlaydi (footer, "biz haqimizda" va JSON-LD uchun). */
  foundedYear: 2013,
  /** Nechta davlatga yetkazib beriladi. */
  countriesServed: 98,
  /** Telegram profil (operator bilan yozishish) */
  telegram: 'https://t.me/Yashirincamera_tashkent',
  /** Telegram kanal (yangi mahsulotlar) */
  telegramChannel: 'https://t.me/Yashirincamera_tashkent',
  telegramHandle: '@Yashirincamera_tashkent',
  /** Instagram profil - asosiy ijtimoiy tarmoq (253 ming obunachi) */
  instagram: 'https://www.instagram.com/yashirincamera.uz/',
  instagramHandle: '@yashirincamera.uz',
  email: 'info@yashirincamera.uz',
  logo: '/logo.png',
  /** Logotipning kvadrat o'lchami (JSON-LD ImageObject uchun) */
  logoSize: 500,
  // trailingSlash: true bo'lgani uchun yakuniy slash bilan - qayta yo'naltirishsiz ochiladi
  ogImage: '/opengraph-image/',
  priceRange: '400000 - 1400000 UZS',
  currency: 'UZS',
  /** Brend ranglari - logotipdagi ranglar (app/globals.css dagi o'zgaruvchilar bilan bir xil) */
  brandColors: {
    /** Logotipdagi sariq - yon "shoxlar" */
    accent: '#f5a623',
    /** Logotipdagi kulrang - patlar, bosh va tumshuq */
    silver: '#a4a8ad',
    /** Logotip foni */
    ink: '#221e27',
  },
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
