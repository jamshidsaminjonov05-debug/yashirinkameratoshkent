import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

/** Statik eksport (NEXT_OUTPUT=export) rejimida ham build vaqtida yaratiladi. */
export const dynamic = 'force-static'

export const alt = 'YASHIRIN CAMERA - yashirin mini kameralar, diktofonlar va detektorlar Toshkentda'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Logotip - Satori (next/og) tarmoqdan rasm o'qiy olmaydi, shuning uchun
 * `public/logo.png` build vaqtida o'qilib, data URI sifatida joylanadi.
 */
const MARK_SRC = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public', 'logo.png')).toString('base64')}`

/** Ijtimoiy tarmoqlar uchun 1200x630 rasm (og:image / twitter:image). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #141118 0%, #221e27 55%, #2e2416 100%)',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 166, 35,0.42), rgba(245, 166, 35,0) 70%)',
          }}
        />
        {/* Logotip: qush belgisi + ikki qatorli brend nomi */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK_SRC} width={104} height={104} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 62, fontWeight: 900, color: '#ffffff', letterSpacing: -1, lineHeight: 1 }}>
              YASHIRIN
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: SITE.brandColors.accent, letterSpacing: 14, marginTop: 8 }}>
              CAMERA
            </div>
          </div>
        </div>
        <div style={{ marginTop: 34, fontSize: 44, fontWeight: 700, color: '#ffffff', lineHeight: 1.15, maxWidth: 950 }}>
          Yashirin mini kameralar, GPS proslushka va diktofonlar
        </div>
        <div style={{ marginTop: 20, fontSize: 32, color: SITE.brandColors.accent, fontWeight: 700 }}>
          {`Toshkent · ${SITE.phone}`}
        </div>
        <div style={{ marginTop: 12, fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
          {`${SITE.foundedYear} yildan beri · ${SITE.countriesServed} ta davlatga yetkazib berish`}
        </div>
      </div>
    ),
    size,
  )
}
