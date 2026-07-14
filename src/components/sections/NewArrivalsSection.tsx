'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'
import { useToast } from '@/hooks/useToast'

const PRODUCTS = [
  {
    id: 'na-1',
    name: 'Fluid Silk Blouse',
    brand: 'Miscurin Studio',
    price: 195,
    image: 'https://images.unsplash.com/photo-1551048632-24e444b48a3e?w=600&q=80',
    isNew: true,
    rating: 5,
    reviewCount: 24,
  },
  {
    id: 'na-2',
    name: 'Structured Wool Coat',
    brand: 'Miscurin Studio',
    price: 595,
    originalPrice: 750,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    rating: 5,
    reviewCount: 61,
  },
  {
    id: 'na-3',
    name: 'Slim Tapered Trousers',
    brand: 'Miscurin Studio',
    price: 185,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4a5f?w=600&q=80',
    isNew: true,
    rating: 4,
    reviewCount: 18,
  },
  {
    id: 'na-4',
    name: 'Leather Derby Shoes',
    brand: 'Miscurin Studio',
    price: 345,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80',
    rating: 5,
    reviewCount: 43,
  },
  {
    id: 'na-5',
    name: 'Canvas Tote Bag',
    brand: 'Miscurin Studio',
    price: 95,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    isNew: true,
    rating: 4,
    reviewCount: 89,
  },
  {
    id: 'na-6',
    name: 'Relaxed Linen Shirt',
    brand: 'Miscurin Studio',
    price: 165,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    rating: 4,
    reviewCount: 37,
  },
  {
    id: 'na-7',
    name: 'Midi Slip Dress',
    brand: 'Miscurin Studio',
    price: 245,
    originalPrice: 310,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80',
    rating: 5,
    reviewCount: 52,
  },
  {
    id: 'na-8',
    name: 'Chunky Knit Sweater',
    brand: 'Miscurin Studio',
    price: 275,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    isNew: true,
    rating: 4,
    reviewCount: 29,
  },
]

export default function NewArrivalsSection() {
  const { toast } = useToast()
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set())

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
    const product = PRODUCTS.find((p) => p.id === id)
    if (product) {
      toast.success(`${product.name} added to bag`, { title: 'Added to Bag' })
    }
  }

  return (
    <section
      aria-label="New Arrivals"
      className="py-24 lg:py-32 bg-[#F7F6F4]"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Heading row */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-600 mb-3">
              Just Dropped
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-normal tracking-tight text-slate-900">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
          >
            View All
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              href={`/products/${product.id}`}
              isWishlisted={wishlisted.has(product.id)}
              onWishlistToggle={handleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/new-arrivals"
            className="rounded-full border border-slate-300 px-8 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  )
}
