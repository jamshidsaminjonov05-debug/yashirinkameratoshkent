# yashirincamera

YASHIRIN CAMERA (ru: «Скрытая Камера») — Toshkentdagi yashirin mini kameralar, diktofonlar va
xavfsizlik detektorlari onlayn do'koni. 2013 yildan beri optom va chakana savdo.
Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + GSAP + Motion. Sayt ikki tilli: **ru** va **uz**.

## Development Server

`$PORT` (standart 8443) da dev server ishlaydi:

```
npm run dev        # next dev -H 0.0.0.0 (PORT env o'qiladi)
npm run build      # ishlab chiqarish build (Node server rejimi)
npm start          # build qilingan saytni ishga tushirish
NEXT_OUTPUT=export npm run build   # to'liq statik sayt -> out/
```

`.figma/make/deploy` statik eksport rejimidan foydalanadi (`out/` papkasi).

## Sahifalar (manzillar)

| Sahifa | ru | uz |
| --- | --- | --- |
| Bosh sahifa (landing) | `/` | `/uz/` |
| Onlayn do'kon (katalog) | `/magazin/` | `/uz/dokon/` |

Manzillar `lib/i18n.ts` dagi `routes` obyektida. Yangi sahifa qo'shilsa - avval shu yerga
yoziladi, keyin `buildMetadata(locale, page)` va `app/sitemap.ts` avtomatik qamrab oladi.

## Project Structure

- `app/(ru)/layout.tsx`, `app/(ru)/page.tsx`, `app/(ru)/magazin/page.tsx` — rus tilidagi ildiz layout va sahifalar
- `app/(uz)/layout.tsx`, `app/(uz)/uz/page.tsx`, `app/(uz)/uz/dokon/page.tsx` — o'zbek tilidagi layout va sahifalar
  (ikkita ildiz layout — shuning uchun `app/layout.tsx` YO'Q va bo'lmasligi kerak)
- `app/(ru)/template.tsx`, `app/(uz)/template.tsx` — sahifalararo o'tish animatsiyasi
- `app/globals.css` — Tailwind import + `:root` o'zgaruvchilar + `@layer components { ... }`
- `app/fonts.ts` — next/font: Outfit (sarlavha) va Inter (matn, kirill)
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/icon.svg`
- `components/home-page.tsx` — landing tuzilmasi; `components/shop/shop-page.tsx` — do'kon tuzilmasi
- `components/animations/*` — GSAP va Motion yordamchilari (pastga qarang)
- `components/shop/*` — do'kon: sidebar, filtrlar, narx slayderi, savat, mahsulot to'ri, ikonkalar
- `components/product-image.tsx` — mahsulot rasmi yoki "rasm tez orada" joyi
- `lib/content/uz.ts`, `lib/content/ru.ts` — **barcha matnlar va mahsulotlar**; `types.ts` — ularning shakli
- `lib/i18n.ts` — tillar, sahifa manzillari, hreflang kodlari
- `lib/seo.ts` — `buildMetadata(locale, page)` va `buildJsonLd(locale, page)`
- `lib/site.ts` — domen, telefon, manzil, tasdiqlash kodlari

## Ma'lumot manbai

Brend ma'lumotlari (nom, telefonlar, tajriba, yetkazib berish qamrovi) rasmiy Telegram
kanalidan olingan: **https://t.me/yashirincamera** — 2013 yildan beri xizmat, 98 ta davlatga
yetkazib berish, savdo raqamlari +998 95 040-40-20 / +998 95 040-40-60, servis +998 90 976-66-69.
Mahsulot va narx ma'lumotlari egasining eski saytidan: **https://zbek.jimdofree.com/**

- Kontakt, telefonlar va brend raqamlari — `lib/site.ts`
- 25 ta mahsulot (nomi, narxi, tavsifi, rasmi) — `lib/content/uz.ts` va `ru.ts`
- Mahsulot rasmlari — `public/img/products/*.webp` (fayl nomlari kalit so'zli)
- Hero rasmi — `public/hero.webp` (qora fonda, `mix-blend-mode: screen` bilan fonga singadi)
- Logotip — `public/logo.svg` (JSON-LD uchun) va `components/brand.tsx` (saytdagi so'z-logotip)

## Mahsulot rasmlari

Har bir mahsulotning `image` maydoni `public/img/products/` dagi faylga ishora qiladi.
Yangi mahsulot qo'shsangiz: rasmni shu papkaga kalit so'zli nom bilan qo'ying va
`lib/content/uz.ts` / `ru.ts` ga `image` hamda `alt` yozing. `image: ""` qoldirilsa —
avtomatik "rasm tez orada" placeholderi chiziladi (`components/product-image.tsx`).

## Animatsiyalar

Ikki kutubxona, ikki xil vazifa:

- **GSAP + ScrollTrigger** (`components/animations/gsap-animations.tsx`) — kirish/scroll animatsiyalari.
  Faqat `gsap.from()` ishlatiladi: HTML matn to'liq ko'rinadigan holatda keladi, animatsiya JS
  ishga tushgach boshlanadi (SEO uchun muhim). Belgilar (server komponentlarda ham ishlaydi):
  - `.reveal` (+ `.reveal-delay-1..5`) — pastdan suzib chiqish
  - `data-anim="stagger"` — bolalari ketma-ket chiqadi
  - `data-parallax="60"` — scroll bilan siljish
  - `data-counter` — raqamni 0 dan sanash
  - `data-float` — sekin "suzish"
  - `data-magnetic` — sichqonchaga intiladigan tugma
  - `.hero-word > span` — sarlavha so'zlari
- **Motion** (`motion/react`) — interaktiv holatlar: hover/tap (`HoverLift`), 3D burilish (`TiltCard`),
  scroll progress chizig'i, akkordeonlar, savat paneli, filtrlangan to'rning `layout` animatsiyasi.

`prefers-reduced-motion` yoqilganda GSAP animatsiyalari umuman ishga tushmaydi va Motion
komponentlari statik holatda qoladi.

## Matn qo'shish yoki o'zgartirish

Komponentlarga hech qachon matn qattiq yozilmaydi. Har bir satr `lib/content/uz.ts` va
`lib/content/ru.ts` da bo'lishi shart — ikkalasi ham `Dictionary` tipiga mos kelishi kerak
(`lib/content/types.ts`). Yangi maydon qo'shsangiz, avval tipni yangilang.

## SEO qoidalari

- Har bir sahifada faqat **bitta `<h1>`**. Bo'limlar `<h2>`, kartalar `<h3>`.
- Har bir `<img>` da kalit so'zli `alt` bo'lishi shart.
- Meta teglar faqat `lib/seo.ts` orqali; layoutlarda qo'lda `<meta>` yozilmaydi.
- Canonical va hreflang (`ru`, `uz`, `x-default`) har bir sahifa uchun avtomatik.
- Domen yoki telefon o'zgarsa — faqat `lib/site.ts` tahrirlanadi.
- Search Console kodlari `.env.local` orqali: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`,
  `NEXT_PUBLIC_YANDEX_VERIFICATION`, `NEXT_PUBLIC_SITE_URL`.

## Styling

Tailwind CSS v4 `@tailwindcss/postcss` orqali. **Muhim:** loyihaning o'z klasslari
(`.card`, `.btn-primary`, `.shop-*` ...) `app/globals.css` dagi `@layer components { ... }`
ichida yoziladi — shunda Tailwind utilitalari (`hidden`, `md:hidden`) doim ustun bo'ladi.
Inline `style` ichiga `display` yozmang: u responsive klasslarni bekor qiladi
(shu sabab mobil menyu tugmasi uchun `.burger` klassi bor).

Landing sahifa qorong'i mavzuda (`:root` o'zgaruvchilari), do'kon sahifasi yorug' mavzuda
(`.shop` ichidagi `--shop-*` o'zgaruvchilari).

Brend rangi — logotipdagi yashil `#1ea832`. Kodda hech qachon qattiq yozilmaydi, faqat
`--brand`, `--brand-glow`, `--brand-dim`, `--border-brand` (qorong'i mavzu) va `--shop-accent`,
`--shop-soft` (do'kon) orqali ishlatiladi. Rang o'zgarsa — shu o'zgaruvchilar tahrirlanadi.

## Code quality

- Apostrofli matnlar uchun qo'sh tirnoq: `"do'kon"`.
- JSX teglari yopilgan, qavslar muvozanatda bo'lsin.
- Komponentlar default export qilinadi.
- `'use client'` faqat kerak bo'lganda: navbar, til almashtirgich, animatsiyalar, do'kon filtrlari va savat.
