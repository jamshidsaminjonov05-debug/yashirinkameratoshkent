import type { Locale } from '@/lib/i18n'
import type { Dictionary, Product } from './types'
import { ru } from './ru'
import { uz } from './uz'

export const dictionaries: Record<Locale, Dictionary> = { ru, uz }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]

/**
 * Narxni mahalliy formatda chiqarish: 390 000 so'm / 390 000 сум.
 * Intl o'rniga qo'lda ajratish - server va brauzer bir xil natija berishi uchun.
 */
export function formatPrice(locale: Locale, value: number): string {
  const formatted = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${formatted} ${locale === 'ru' ? 'сум' : "so'm"}`
}

export type { Dictionary, Product }
