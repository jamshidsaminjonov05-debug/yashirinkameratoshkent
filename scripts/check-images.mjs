/**
 * Build oldidan rasm manzillarini tekshiradi.
 *
 * lib/content/*.ts ichidagi har bir `image:` va `src="/..."` manzili
 * public/ papkasida haqiqatan bor-yo'qligini qaraydi. Yo'q bo'lsa - build
 * to'xtaydi, chunki next/image mavjud bo'lmagan faylda xato beradi.
 *
 * `image: ""` - ataylab bo'sh qoldirilgan (placeholder chiziladi), o'tkazib yuboriladi.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

/** Tekshiriladigan fayllar: matn lug'atlari va rasm ishlatadigan komponentlar. */
const sources = [
  join(root, 'lib', 'content', 'uz.ts'),
  join(root, 'lib', 'content', 'ru.ts'),
  ...readdirSync(join(root, 'components')).filter((f) => f.endsWith('.tsx')).map((f) => join(root, 'components', f)),
]

const referenced = new Map()

/** Izohlar ichidagi misol manzillar hisobga olinmasin. */
const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

for (const file of sources) {
  const text = stripComments(readFileSync(file, 'utf8'))
  // "/img/products/xxx.webp", "/hero.webp", "/logo.svg" ko'rinishidagi manzillar
  for (const match of text.matchAll(/["'](\/[\w./-]+\.(?:webp|png|jpg|jpeg|svg|avif))["']/g)) {
    const url = match[1]
    if (!referenced.has(url)) referenced.set(url, file.replace(root, '').replace(/\\/g, '/'))
  }
}

const missing = [...referenced].filter(([url]) => !existsSync(join(publicDir, url)))

if (missing.length > 0) {
  console.error(`\n  ${missing.length} ta rasm public/ ichida topilmadi:\n`)
  for (const [url, from] of missing) console.error(`    ${url}   (${from})`)
  console.error('\n  Rasmni public/ ga qo\'ying yoki manzilni to\'g\'rilang.\n')
  process.exit(1)
}

console.log(`  Rasmlar tekshirildi: ${referenced.size} ta manzil, hammasi joyida.`)
