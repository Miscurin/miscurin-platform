'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/cn'

const BESTSELLERS = [
  {
    id: 'bs-1',
    name: 'Classic Leather Tote',
    brand: 'Miscurin Studio',
    price: 425,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    rating: 5,
    reviewCount: 214,
    badge: 'Best Seller',
  },
  {
    id: 'bs-2',
    name: 'Cashmere Turtleneck',
    brand: 'Miscurin Studio',
    price: 355,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&q=80',
    rating: 5,
    reviewCount: 187,
  },
  {
    id: 'bs-3',
    name: 'Straight Leg Jeans',
    brand: 'Miscurin Studio',
    price: 195,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
    rating: 4,
    reviewCount: 342,
    badge: 'Best Seller',
  },
  {
    id: 'bs-4',
    name: 'Suede Chelsea Boots',
    brand: 'Miscurin Studio',
    price: 495,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    rating: 5,
    reviewCount: 128,
  },
  {
    id: 'bs-5',
    name: 'Silk Wrap Skirt',
    brand: 'Miscurin Studio',
    price: 215,
    originalPrice: 280,
    image: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&q=80',
    rating: 4,
    reviewCount: 96,
  },
  {
    id: 'bs-6',
    name: 'Merino Wool Blazer',
    brand: 'Miscurin Studio',
    price: 545,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    rating: 5,
    reviewCount: 73,
    badge: 'Best Seller',
  },
]

export default function BestSellersSection() {
  const { toast } = useToast()
  const trackRef = useRef<HTMLDivElement>(null)
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set())

  function scroll(dir: 'left' | 'right') {
    if (!trackRef.current) return
    const by = trackRef.current.clientWidth * 0.75
    trackRef.current.scrollBy({ left: dir === 'right' ? by : -by, behavior: 'smooth' })
  }

  function handleWishlist(id: string) {
    setWishlisted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        toast.info('Removed from wishlist')
      } else {
        next.add(id)
        toast.success('Added to wishlist')
      }
      return next
    })
  }

  function handleAddToCart(id: string) {
    const p = BESTSELLERS.find((p) => p.id === id)
    if (p) toast.success(`${p.name} added to bag`, { title: 'Added to Bag' })
  }

  return (
    <section aria-label="Best Sellers" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-600 mb-3">
              Most Loved
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-normal tracking-tight text-slate-900">
              Best Sellers
            </h2>
          </div>

          {/* Nav controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/best-sellers"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group mr-4"
            >
              View All
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-slate-200',
                'text-slate-600 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50',
                'transition-all duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-slate-200',
                'text-slate-600 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50',
                'transition-all duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable track — bleeds to edges */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-6 lg:px-12"
        style={{ scrollbarWidth: 'none' }}
      >
        {BESTSELLERS.map((product) => (
          <div
            key={product.id}
            className="snap-start flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[340px]"
          >
            <ProductCard
              {...product}
              href={`/products/${product.id}`}
              isWishlisted={wishlisted.has(product.id)}
              onWishlistToggle={handleWishlist}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
        {/* Right padding ghost */}
        <div className="flex-shrink-0 w-6 lg:w-12" aria-hidden="true" />
      </div>
    </section>
  )
}
