'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export default function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null)

  // Subtle parallax on the image column
  useEffect(() => {
    function onScroll() {
      if (!imageRef.current) return
      const y = window.scrollY
      imageRef.current.style.transform = `translateY(${y * 0.12}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      aria-label="Hero — New Collection SS26"
      className="relative flex min-h-[100svh] flex-col lg:flex-row overflow-hidden bg-[#F7F6F4]"
    >
      {/* ── Left: Text ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-8 pb-16 pt-36 lg:px-16 lg:py-0 lg:max-w-[55%]">
        {/* Overline */}
        <p className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-brand-600" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
            New Collection · SS26
          </span>
        </p>

        {/* Headline */}
        <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[1.02] tracking-[-0.025em] text-slate-900">
          Where Style
          <br />
          <span className="italic text-slate-500">Meets</span>
          <br />
          Intent.
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-[380px] text-base leading-relaxed text-slate-500">
          Refined essentials and editorial pieces for the discerning wardrobe. Crafted to endure every season.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/new-arrivals"
            className={cn(
              'inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-8 py-4',
              'text-[13px] font-semibold uppercase tracking-[0.1em] text-white',
              'hover:bg-brand-700 transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2'
            )}
          >
            Shop Now
          </Link>
          <Link
            href="/collections"
            className={cn(
              'inline-flex items-center gap-2.5 rounded-full border border-slate-300 px-8 py-4',
              'text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-700',
              'hover:border-slate-900 hover:text-slate-900 transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2'
            )}
          >
            Explore Collection
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 flex gap-10 border-t border-slate-200 pt-8">
          {[
            { value: '12K+', label: 'Global Orders' },
            { value: '120+', label: 'Countries' },
            { value: '4.9', label: 'Avg. Rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-normal text-slate-900">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-400 tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Image ──────────────────────────────────────────────── */}
      <div className="relative lg:flex-1 h-[60vw] lg:h-auto min-h-[400px] overflow-hidden">
        {/* Parallax wrapper */}
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85"
            alt="New Collection SS26 — editorial fashion portrait"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-top"
            draggable={false}
          />
          {/* Subtle left gradient fade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F6F4] to-transparent lg:block hidden" />
        </div>

        {/* Editorial label — top right */}
        <div className="absolute top-8 right-8 z-10 hidden lg:block">
          <div className="rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600 shadow-sm">
            SS 26
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-2">
          <div className="h-10 w-[1px] bg-slate-400/60 animate-bounce-sm" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500 rotate-90 origin-center translate-x-4 mt-2">
            Scroll
          </p>
        </div>
      </div>
    </section>
  )
}
