'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export interface ProductCardProps {
  id: string
  name: string
  brand?: string
  price: number
  originalPrice?: number
  currency?: string
  image: string
  imageAlt?: string
  badge?: string
  isWishlisted?: boolean
  onWishlistToggle?: (id: string) => void
  onAddToCart?: (id: string) => void
  href?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isSoldOut?: boolean
  className?: string
}

function formatPrice(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  currency = 'USD',
  image,
  imageAlt,
  badge,
  isWishlisted = false,
  onWishlistToggle,
  onAddToCart,
  href,
  rating,
  reviewCount,
  isNew,
  isSoldOut,
  className,
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(isWishlisted)
  const [imageLoaded, setImageLoaded] = useState(false)
  const hasDiscount = originalPrice && originalPrice > price
  const discountPct = hasDiscount
    ? Math.round((1 - price / originalPrice) * 100)
    : null

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    setWishlisted((prev) => !prev)
    onWishlistToggle?.(id)
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    onAddToCart?.(id)
  }

  const ImageWrapper = href ? Link : 'div'

  return (
    <article
      className={cn('group flex flex-col', isSoldOut && 'opacity-80', className)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4]">
        <ImageWrapper
          href={href ?? '#'}
          className="block h-full w-full"
          tabIndex={href ? 0 : -1}
        >
          <Image
            src={image}
            alt={imageAlt ?? name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-transform duration-500 ease-spring',
              'group-hover:scale-105',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Loading shimmer */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-skeleton" />
          )}
        </ImageWrapper>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {badge && (
            <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              {badge}
            </span>
          )}
          {isNew && !badge && (
            <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
          )}
          {hasDiscount && discountPct && (
            <span className="rounded-full bg-error-600 px-2.5 py-1 text-[11px] font-semibold text-white">
              -{discountPct}%
            </span>
          )}
          {isSoldOut && (
            <span className="rounded-full bg-slate-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        {onWishlistToggle && (
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            className={cn(
              'absolute top-3 right-3 flex h-9 w-9 items-center justify-center',
              'rounded-full bg-white/90 backdrop-blur-sm shadow-sm',
              'transition-all duration-200',
              'hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
              'opacity-0 group-hover:opacity-100 focus:opacity-100'
            )}
          >
            <svg
              className={cn(
                'h-4 w-4 transition-colors duration-150',
                wishlisted
                  ? 'text-error-500 fill-error-500'
                  : 'text-slate-600 fill-none'
              )}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
          </button>
        )}

        {/* Quick add */}
        {onAddToCart && !isSoldOut && (
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 p-3',
              'translate-y-full group-hover:translate-y-0',
              'transition-transform duration-200 ease-out'
            )}
          >
            <button
              type="button"
              onClick={handleAddToCart}
              className={cn(
                'w-full rounded-xl bg-white/95 backdrop-blur-sm border border-slate-100',
                'py-2.5 text-sm font-semibold text-slate-900 shadow-lg',
                'hover:bg-white transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
              )}
            >
              Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5 flex flex-col gap-1">
        {brand && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            {brand}
          </p>
        )}
        <p className="text-sm font-medium text-slate-800 leading-snug line-clamp-2">
          {href ? (
            <Link href={href} className="hover:text-brand-600 transition-colors duration-150">
              {name}
            </Link>
          ) : (
            name
          )}
        </p>

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < Math.round(rating)
                    ? 'text-warning-500 fill-warning-500'
                    : 'text-slate-200 fill-slate-200'
                )}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            {reviewCount !== undefined && (
              <span className="text-[11px] text-slate-400 ml-0.5">
                ({reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'text-sm font-semibold',
              hasDiscount ? 'text-error-600' : 'text-slate-900'
            )}
          >
            {formatPrice(price, currency)}
          </span>
          {hasDiscount && originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(originalPrice, currency)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
