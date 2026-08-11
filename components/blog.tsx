import Image from 'next/image'
import HoverLift from '@/components/animations/hover-lift'
import { IconArrowUpRight, IconUser } from '@/components/icons'
import type { Dictionary } from '@/lib/content'

export default function Blog({ blog }: { blog: Dictionary['blog'] }) {
  return (
    <section id="maqolalar" style={{ padding: '80px 0' }}>
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="reveal text-center mb-12">
          <p style={{ color: '#f5a623', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{blog.eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: '#fff', marginBottom: 12 }}>{blog.title}</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>{blog.subtitle}</p>
        </div>

        <div data-anim="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {blog.posts.map((post) => (
            <HoverLift key={post.slug} as="article" className="card card-hover" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, background: 'rgba(20,20,28,0.72)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', color: '#fff' }} aria-hidden="true">
                  <IconArrowUpRight width={16} height={16} />
                </div>
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(245, 166, 35,0.9)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{post.tag}</div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-4">
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(245, 166, 35,0.16)', color: '#f5c06a', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
                    <IconUser width={15} height={15} />
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                    {post.author} · <time dateTime={post.dateTime}>{post.date}</time>
                  </span>
                </div>
              </div>
            </HoverLift>
          ))}
        </div>
      </div>
    </section>
  )
}
