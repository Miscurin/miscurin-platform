import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

const CATEGORIES = [
  {
    label: 'Men',
    href: '/men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    alt: "Men's fashion editorial",
    position: 'object-top',
  },
  {
    label: 'Women',
    href: '/women',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80',
    alt: "Women's fashion editorial",
    position: 'object-center',
  },
  {
    label: 'Accessories',
    href: '/accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    alt: 'Accessories editorial',
    position: 'object-center',
  },
  {
    label: 'Footwear',
    href: '/footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    alt: 'Footwear editorial',
    position: 'object-center',
  },
]

export default function CategoriesSection() {
  return (
    <section aria-label="Shop by category" className="py-24 lg:py-32 bg-white">
      {/* Heading */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mb-12 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-600 mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-normal tracking-tight text-slate-900">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/collections"
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
        >
          All Categories
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Cards grid */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              aria-label={`Shop ${cat.label}`}
              className={cn(
                'group relative overflow-hidden rounded-2xl lg:rounded-3xl',
                'aspect-[3/4] block',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2'
              )}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className={cn(
                  'object-cover transition-transform duration-700 ease-out will-change-transform',
                  'group-hover:scale-105',
                  cat.position
                )}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent transition-opacity duration-300 group-hover:from-slate-900/90" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-display text-2xl lg:text-3xl font-normal text-white leading-none">
                      {cat.label}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium uppercase tracking-widest text-white/60 transition-opacity duration-200 group-hover:text-white/90">
                      Shop Now
                    </p>
                  </div>
                  <div className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full',
                    'bg-white/10 backdrop-blur-sm border border-white/20',
                    'transition-all duration-200 group-hover:bg-white group-hover:border-white',
                  )}>
                    <svg
                      className={cn(
                        'h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-900'
                      )}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
