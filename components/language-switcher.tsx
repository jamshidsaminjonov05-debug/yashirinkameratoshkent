'use client'

import Link from 'next/link'
import { pagePath, type Locale, type PageKey } from '@/lib/i18n'

type Props = {
  locale: Locale
  labels: { langSwitcher: string; switchToUz: string; switchToRu: string }
  /** Qaysi sahifaning boshqa tildagi manzili ochilsin. */
  page?: PageKey
  /** Yorug' fon uchun (do'kon sahifasi). */
  tone?: 'dark' | 'light'
}

/**
 * UZ / RU almashtirgich.
 * Tillar alohida manzillarda joylashgani uchun (/ va /uz/) almashish oddiy
 * havola orqali amalga oshiriladi - bu qidiruv tizimlari uchun eng to'g'ri usul.
 * Tanlangan til localStorage'da eslab qolinadi.
 */
export default function LanguageSwitcher({ locale, labels, page = 'home', tone = 'dark' }: Props) {
  const remember = (next: Locale) => {
    try {
      window.localStorage.setItem('yashirincamera_lang', next)
    } catch {
      /* localStorage o'chirilgan bo'lsa - e'tiborsiz qoldiramiz */
    }
  }

  const idle = tone === 'light' ? '#8b8b93' : 'rgba(255,255,255,0.5)'

  const linkStyle = (active: boolean) => ({
    color: active ? '#1ea832' : idle,
    fontWeight: active ? 800 : 600,
    fontSize: 12,
    textDecoration: 'none',
    letterSpacing: 0.5,
    transition: 'color 0.2s',
  })

  return (
    <div
      aria-label={labels.langSwitcher}
      className="flex items-center gap-2"
      style={{
        border: `1px solid ${tone === 'light' ? '#ededf0' : 'rgba(255,255,255,0.1)'}`,
        background: tone === 'light' ? '#ffffff' : 'rgba(255,255,255,0.04)',
        borderRadius: 12,
        padding: '6px 12px',
        fontFamily: 'var(--font-heading)',
      }}
    >
      <Link
        href={pagePath(page, 'uz')}
        hrefLang="uz"
        lang="uz"
        prefetch={false}
        aria-current={locale === 'uz' ? 'true' : undefined}
        aria-label={labels.switchToUz}
        onClick={() => remember('uz')}
        style={linkStyle(locale === 'uz')}
      >
        UZ
      </Link>
      <span style={{ color: tone === 'light' ? '#d4d4d8' : 'rgba(255,255,255,0.25)' }}>/</span>
      <Link
        href={pagePath(page, 'ru')}
        hrefLang="ru"
        lang="ru"
        prefetch={false}
        aria-current={locale === 'ru' ? 'true' : undefined}
        aria-label={labels.switchToRu}
        onClick={() => remember('ru')}
        style={linkStyle(locale === 'ru')}
      >
        RU
      </Link>
    </div>
  )
}
