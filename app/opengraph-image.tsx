import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

/** Statik eksport (NEXT_OUTPUT=export) rejimida ham build vaqtida yaratiladi. */
export const dynamic = 'force-static'

export const alt = 'YASHIRIN CAMERA - yashirin mini kameralar, diktofonlar va detektorlar Toshkentda'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          background: 'linear-gradient(135deg, #09090f 0%, #0b2412 60%, #0d3d1b 100%)',
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
            background: 'radial-gradient(circle, rgba(30,168,50,0.45), rgba(30,168,50,0) 70%)',
          }}
        />
        {/* Logotip: yashil halqa + ikki qatorli brend nomi */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, border: '8px solid #1ea832', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 62, fontWeight: 900, color: '#ffffff', letterSpacing: -1, lineHeight: 1 }}>
              YASHIRIN
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', letterSpacing: 14, marginTop: 8 }}>
              CAMERA
            </div>
          </div>
        </div>
        <div style={{ marginTop: 34, fontSize: 44, fontWeight: 700, color: '#ffffff', lineHeight: 1.15, maxWidth: 950 }}>
          Yashirin mini kameralar, GPS proslushka va diktofonlar
        </div>
        <div style={{ marginTop: 20, fontSize: 32, color: '#4ade80', fontWeight: 700 }}>
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
