import type { CSSProperties } from 'react'
import Image from 'next/image'

type MarkProps = {
  /** Belgi balandligi (va kengligi), px. */
  size?: number
  className?: string
  /** Ekranni o'qib beruvchi dasturlar uchun matn. Bo'sh bo'lsa - bezak sifatida o'qilmaydi. */
  alt?: string
  priority?: boolean
}

/**
 * YASHIRIN CAMERA belgisi - yoyilgan patli qush boshi (`public/logo.png`).
 * Rasm foni shaffof: qorong'i landing sahifada ham, yorug' do'kon sahifasida ham ishlaydi.
 * Ranglari: kulrang #a4a8ad va sariq #f5a623 (brend palitrasi - `lib/site.ts` dagi `brandColors`).
 */
export function BrandMark({ size = 36, className, alt = '', priority = false }: MarkProps) {
  return (
    <Image
      src="/logo.png"
      width={size}
      height={size}
      alt={alt}
      priority={priority}
      className={className}
      style={{ display: 'block', flexShrink: 0, height: 'auto' }}
    />
  )
}

type Props = {
  /** Logotip balandligi, px. Ichidagi hamma o'lcham shundan hisoblanadi. */
  height?: number
  /** `white` - qorong'i fon uchun, `dark` - yorug' fon uchun (do'kon sahifasi). */
  variant?: 'white' | 'dark'
  /** Faqat qush belgisi (matnsiz) kerak bo'lsa. */
  markOnly?: boolean
}

/**
 * YASHIRIN CAMERA logotipi: qush belgisi + so'z-logotip.
 * Matn rasm emas - har qanday ekranda tiniq va qidiruv tizimi brend nomini o'qiy oladi.
 */
export function BrandWordmark({ height = 30, variant = 'white', markOnly = false }: Props) {
  return (
    <span
      className="brand-mark"
      data-tone={variant}
      style={{ '--bh': `${height}px` } as CSSProperties}
    >
      <BrandMark size={Math.round(height * 1.18)} className="brand-mark__bird" />
      {!markOnly && (
        <span className="brand-mark__stack">
          <span className="brand-mark__name">YASHIRIN</span>
          <span className="brand-mark__sub">CAMERA</span>
        </span>
      )}
    </span>
  )
}
