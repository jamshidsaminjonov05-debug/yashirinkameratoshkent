type Props = {
  /** Rasm manzili. Bo'sh bo'lsa - o'rniga "rasm tez orada" joyi chiziladi. */
  src: string
  alt: string
  /** Placeholder ustidagi yozuv. */
  label: string
  height: number
  variant?: 'dark' | 'light'
}

/**
 * Mahsulot rasmi.
 * Rasmlar hali yuklanmagani uchun hozircha placeholder ko'rsatiladi -
 * `lib/content/uz.ts` va `ru.ts` dagi `image: ""` maydoniga yo'lni yozsangiz
 * (masalan "/img/products/a9-pro.jpg") avtomatik rasmga almashadi.
 */
export default function ProductImage({ src, alt, label, height, variant = 'dark' }: Props) {
  if (!src) {
    return (
      <div
        className={`image-placeholder${variant === 'light' ? ' image-placeholder--light' : ''}`}
        style={{ height }}
        role="img"
        aria-label={alt}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2.5" y="6" width="19" height="13" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="12.5" r="3.6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8.5 6l1.3-2.2h4.4L15.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <span>{label}</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- mahsulot rasmlari qo'lda yuklanadi
    <img
      src={src}
      alt={alt}
      width={600}
      height={400}
      loading="lazy"
      decoding="async"
      style={{
        width: '100%',
        height,
        // rasm to'liq ko'rinsin (turli nisbatdagi surat va bannerlar bor)
        objectFit: 'contain',
        background: variant === 'light' ? '#f6f6f8' : 'rgba(255,255,255,0.03)',
        padding: 6,
        display: 'block',
      }}
    />
  )
}
