/** Mahsulot kartasi. `image` bo'sh bo'lsa - o'rniga rasm joyi (placeholder) chiziladi. */
export interface Product {
  id: string
  /** Rasm manzili. Bo'sh string = rasm hali yuklanmagan. */
  image: string
  name: string
  desc: string
  /** Kalit so'zli alt matni (SEO). Rasm qo'yilganda ishlatiladi. */
  alt: string
  price: number
  /** Chegirmadan oldingi narx (ixtiyoriy). */
  oldPrice?: number
  tag: string
  /** Filtrlar uchun kategoriya id'si (shop.filters.categories.options bilan mos). */
  category: string
  /** Qo'shimcha filtr: qurilma turi. */
  type: string
}

/** Barcha matnlar shu shakl bo'yicha uz/ru tillarida yoziladi. */
export interface Dictionary {
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
    siteDescription: string
  }
  a11y: {
    skipToContent: string
    mainNav: string
    openMenu: string
    langSwitcher: string
    switchToUz: string
    switchToRu: string
  }
  nav: {
    catalog: string
    features: string
    pricing: string
    blog: string
    contact: string
    cart: string
    demo: string
  }
  hero: {
    badgeNew: string
    badgeUpdate: string
    title: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    panelAria: string
    /** Hero orqa fon rasmi uchun alt matni (SEO) */
    imageAlt: string
  }
  panel: {
    tabs: string[]
    stats: { label: string; value: string; change: string; up: boolean }[]
    connect: { title: string; subtitle: string; action: string; rows: { name: string; sub: string }[] }
    chart: { title: string; subtitle: string }
  }
  ticker: { note: string; items: string[] }
  /** "Nima uchun YASHIRIN CAMERA" - bento to'r: 4 ta karta */
  features: {
    eyebrow: string
    title: string
    subtitle: string
    /** Chap yuqori karta: qadamlar ro'yxati */
    steps: { title: string; desc: string; rows: { id: string; label: string }[] }
    /** O'rta yuqori karta: raqamli ko'rsatkich */
    stat: { title: string; desc: string; label: string; value: string; change: string }
    /** O'ng baland karta: nur konusi grafikasi */
    create: { title: string; desc: string }
    /** Pastki keng karta: bo'limlar daraxti */
    sections: { title: string; desc: string; items: { label: string; depth: number }[] }
  }
  catalog: {
    eyebrow: string
    title: string
    p1: string
    p2: string
    cta: string
    checks: string[]
    panel: {
      groupTitle: string
      items: { label: string; depth: number }[]
      features: { name: string; desc: string }[]
    }
  }
  products: {
    eyebrow: string
    title: string
    subtitle: string
    priceFrom: string
    order: string
    seeAll: string
    items: Product[]
  }
  detectors: {
    eyebrow: string
    title: string
    p1: string
    p2: string
    cta: string
    checks: string[]
    panel: { features: { name: string; desc: string }[]; chips: string[] }
  }
  pricing: {
    eyebrow: string
    title: string
    subtitle: string
    popular: string
    perKit: string
    plans: { price: number; name: string; desc: string; features: string[]; cta: string; highlighted: boolean }[]
  }
  blog: {
    eyebrow: string
    title: string
    subtitle: string
    readMore: string
    posts: { slug: string; title: string; tag: string; excerpt: string; alt: string; image: string; author: string; date: string; dateTime: string }[]
  }
  cta: { eyebrow: string; title: string; desc: string; primary: string; secondary: string }
  /** Onlayn do'kon sahifasi (/magazin/ va /uz/dokon/). */
  shop: {
    meta: { title: string; description: string; keywords: string[] }
    sidebar: {
      home: string
      products: string
      productLinks: string[]
      orders: string
      payment: string
      warranty: string
      support: string
      helpDesk: string
      settings: string
      backToSite: string
    }
    header: {
      title: string
      subtitle: string
      searchPlaceholder: string
      userName: string
      userRole: string
    }
    toolbar: {
      breadcrumbRoot: string
      breadcrumbCurrent: string
      showingPrefix: string
      showingSuffix: string
      searchPlaceholder: string
      filter: string
      cartCta: string
    }
    filters: {
      categories: { label: string; all: string; options: { id: string; label: string }[] }
      price: { label: string; all: string; options: { id: string; label: string; min: number; max: number }[] }
      rangeLabel: string
      type: { label: string; all: string; options: { id: string; label: string }[] }
      sort: { label: string; options: { id: string; label: string }[] }
      apply: string
      reset: string
    }
    card: { addToCart: string; added: string; wishlist: string; buy: string; imageSoon: string }
    cart: { title: string; empty: string; total: string; checkout: string; items: string; remove: string; close: string }
    empty: { title: string; desc: string; reset: string }
  }
  footer: {
    tagline: string
    columns: { title: string; links: { label: string; href: string }[] }[]
    contactsTitle: string
    addressLabel: string
    /** Servis raqami yonidagi yozuv (o'rnatish, sozlash, ta'mirlash). */
    serviceLabel: string
    hours: string
    rights: string
    legal: string[]
  }
}
