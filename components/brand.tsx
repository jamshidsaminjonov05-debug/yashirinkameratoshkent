import type { CSSProperties } from 'react'

type Props = {
  /** Logotip balandligi, px. Ichidagi hamma o'lcham shundan hisoblanadi. */
  height?: number
  /** `white` - qorong'i fon uchun, `dark` - yorug' fon uchun (do'kon sahifasi). */
  variant?: 'white' | 'dark'
}

/**
 * YASHIRIN CAMERA so'z-logotipi - rasm emas, matn.
 * Telegram kanalidagi logotip kompozitsiyasini takrorlaydi:
 * burchak qavslar ichida YASHIRIN, tagida chiziq va CAMERA.
 *
 * Rasm o'rniga matn bo'lgani uchun: har qanday ekranda tiniq, tarmoqdan
 * hech narsa yuklanmaydi va qidiruv tizimi brend nomini o'qiy oladi.
 */
export function BrandWordmark({ height = 30, variant = 'white' }: Props) {
  return (
    <span
      className="brand-mark"
      data-tone={variant}
      style={{ '--bh': `${height}px` } as CSSProperties}
    >
      <span aria-hidden="true" className="brand-mark__corner brand-mark__corner--tl" />
      <span className="brand-mark__stack">
        <span className="brand-mark__name">YASHIRIN</span>
        <span className="brand-mark__sub">CAMERA</span>
      </span>
      <span aria-hidden="true" className="brand-mark__corner brand-mark__corner--br" />
    </span>
  )
}
