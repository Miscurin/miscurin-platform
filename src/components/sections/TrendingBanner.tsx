import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export default function TrendingBanner() {
  return (
    <section
      aria-label="Trending — The Monochrome Edit"
      className="relative overflow-hidden bg-slate-900"
      style={{ minHeight: '85vh' }}
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85"
        alt="The Monochrome Edit — editorial fashion campaign"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-60"
        priority={false}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[85vh] flex-col justify-end pb-16 lg:pb-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-brand-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-400">
                Trending Collection
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
              The Monochrome
              <br />
              <span className="italic text-white/70">Edit</span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              Tonal dressing elevated to an art form. A curated selection of pieces designed to work seamlessly together — and apart.
            </p>

            {/* Badge + CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/collections/monochrome"
                className={cn(
                  'inline-flex items-center gap-3 rounded-full bg-white px-8 py-4',
                  'text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-900',
                  'hover:bg-brand-50 transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
                )}
              >
                Shop Collection
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <span className="text-sm font-medium text-white/50">
                Limited availability
              </span>
            </div>
          </div>

          {/* Floating stats */}
          <div className="mt-16 flex gap-8 lg:gap-16">
            {[
              { value: '42', label: 'Pieces' },
              { value: '6', label: 'Colourways' },
              { value: 'SS26', label: 'Season' },
            ].map((stat) => (
              <div key={stat.label} className="border-t border-white/20 pt-4">
                <p className="font-display text-2xl font-normal text-white">{stat.value}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-widest text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
