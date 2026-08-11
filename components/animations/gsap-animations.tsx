'use client'

import { useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Saytdagi barcha scroll animatsiyalari shu yerda.
 *
 * Muhim: barcha animatsiyalar `gsap.from()` orqali qilinadi - ya'ni HTML'da
 * matn to'liq ko'rinadigan holatda keladi va faqat JS ishga tushgach
 * animatsiya boshlanadi. Bu SEO (indekslash) uchun xavfsiz.
 *
 * Belgilar:
 *  - `.reveal`           - pastdan suzib chiqadi (`.reveal-delay-1..5` - kechikish)
 *  - `[data-anim="stagger"]` - bolalari ketma-ket chiqadi
 *  - `[data-parallax]`   - scroll bilan sekin siljiydi
 *  - `[data-counter]`    - raqam 0 dan haqiqiy qiymatgacha sanaydi
 *  - `.hero-word`        - sarlavha so'zlari birin-ketin chiqadi
 */
export default function GsapAnimations() {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Uzoq "sekinlashuv"dan keyin animatsiya joyida qotib qolmasligi uchun
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Harakatni kamaytirish yoqilgan bo'lsa - hech narsa animatsiya qilinmaydi.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1) Sarlavha so'zlari
        const heroTweens: gsap.core.Tween[] = []
        const words = gsap.utils.toArray<HTMLElement>('.hero-word > span')
        if (words.length) {
          heroTweens.push(gsap.from(words, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.045,
            delay: 0.15,
          }))
        }

        // 2) Hero ichidagi qolgan elementlar
        heroTweens.push(gsap.from('[data-hero-item]', {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          delay: 0.55,
        }))

        /*
         * Xavfsizlik chorasi: agar biror sabab bilan animatsiya tugamasa
         * (masalan brauzer freym bermasa), 4 soniyadan keyin hero matni
         * majburan to'liq ko'rinadigan holatga o'tkaziladi.
         */
        const safety = window.setTimeout(() => {
          heroTweens.forEach((tween) => {
            if (tween.progress() < 1) tween.progress(1)
          })
        }, 4000)

        /*
         * 2b) Hero parallaksi: scroll paytida uch qatlam turli tezlikda suzadi
         *     - matn tepaga tezroq va asta so'nadi
         *     - mahsulot rasmi sekinroq (orqada turgandek)
         *     - boshqaruv paneli eng tez tepaga
         */
        const heroSection = document.querySelector('.hero-section')
        if (heroSection) {
          const mobile = window.matchMedia('(max-width: 767px)').matches
          const k = mobile ? 0.5 : 1
          gsap
            .timeline({
              scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5,
              },
            })
            .to('.hero-copy', { yPercent: -18 * k, opacity: mobile ? 0.5 : 0.2, ease: 'none' }, 0)
            .to('.hero-bg', { yPercent: 12 * k, scale: 1 + 0.04 * k, ease: 'none' }, 0)
            .to('.hero-panel', { yPercent: -22 * k, ease: 'none' }, 0)
            .to('.hero-glow', { yPercent: 60 * k, ease: 'none' }, 0)
        }

        // 3) `.reveal` bloklari - ekranga kirganda
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          const delayClass = Array.from(el.classList).find((c) => c.startsWith('reveal-delay-'))
          const delay = delayClass ? Number(delayClass.split('-').pop()) * 0.08 : 0
          gsap.from(el, {
            y: 34,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.out',
            delay,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })

        // 4) Ketma-ket chiquvchi gridlar
        gsap.utils.toArray<HTMLElement>('[data-anim="stagger"]').forEach((group) => {
          const children = Array.from(group.children) as HTMLElement[]
          if (!children.length) return
          gsap.from(children, {
            y: 28,
            opacity: 0,
            scale: 0.97,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.07,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          })
        })

        // 5) Parallaks fon shakllari
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const strength = Number(el.dataset.parallax || 60)
          gsap.to(el, {
            y: strength,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          })
        })

        // 6) Raqamlarni sanash
        gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
          const raw = el.textContent ?? ''
          const match = raw.match(/[\d\s.,]+/)
          if (!match) return
          const numeric = Number(match[0].replace(/[\s,]/g, ''))
          if (!Number.isFinite(numeric)) return
          const decimals = (match[0].split('.')[1] ?? '').trim().length
          const prefix = raw.slice(0, match.index ?? 0)
          const suffix = raw.slice((match.index ?? 0) + match[0].length)
          const state = { value: 0 }

          gsap.to(state, {
            value: numeric,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            onUpdate: () => {
              const shown = decimals
                ? state.value.toFixed(decimals)
                : Math.round(state.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              el.textContent = `${prefix}${shown}${suffix}`
            },
            onComplete: () => {
              el.textContent = raw
            },
          })
        })

        // 7) Kartalarning yumshoq "float" effekti
        gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
          gsap.to(el, {
            y: -10,
            duration: 2.6 + i * 0.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        })

        // 8) Magnit tugmalar - sichqoncha yaqinlashganda tugma unga intiladi
        const cleanups: (() => void)[] = []
        if (window.matchMedia('(hover: hover)').matches) {
          gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
            const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
            const move = (event: PointerEvent) => {
              const rect = el.getBoundingClientRect()
              xTo((event.clientX - (rect.left + rect.width / 2)) * 0.28)
              yTo((event.clientY - (rect.top + rect.height / 2)) * 0.42)
            }
            const leave = () => {
              xTo(0)
              yTo(0)
            }
            el.addEventListener('pointermove', move)
            el.addEventListener('pointerleave', leave)
            cleanups.push(() => {
              el.removeEventListener('pointermove', move)
              el.removeEventListener('pointerleave', leave)
            })
          })
        }

        return () => {
          window.clearTimeout(safety)
          cleanups.forEach((fn) => fn())
        }
      })

      return () => mm.revert()
    })

    // Shriftlar yuklangach o'lchamlar o'zgaradi - triggerlarni yangilaymiz.
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {})
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return null
}
