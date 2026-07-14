'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

const NAV_LINKS = [
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/sale', accent: true },
]

interface HomeNavProps {
  cartCount?: number
  wishlistCount?: number
}

export default function HomeNav({ cartCount = 0, wishlistCount = 0 }: HomeNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 72)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50)
    }
  }, [searchOpen])

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navTextClass = scrolled
    ? 'text-slate-800 hover:text-slate-900'
    : 'text-slate-800 hover:text-slate-900'

  const iconClass = scrolled
    ? 'text-slate-700 hover:text-slate-900'
    : 'text-slate-700 hover:text-slate-900'

  return (
    <>
      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[300] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-start pt-28 px-8 animate-fade-in">
          <div className="w-full max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Search Miscurin
            </p>
            <div className="relative border-b-2 border-slate-900 pb-2">
              <input
                ref={searchRef}
                type="search"
                placeholder="Search for styles, collections…"
                className="w-full text-2xl font-light text-slate-900 bg-transparent outline-none placeholder:text-slate-300"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="Close search"
              >
                <Icon name="x" size="lg" />
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {['New Arrivals', 'Coats', 'Dresses', 'Accessories', 'Sale'].map((term) => (
                <button
                  key={term}
                  type="button"
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main nav */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[200] transition-all duration-300',
          scrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-slate-100 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex h-[68px] items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-baseline gap-px group"
              aria-label="Miscurin — return to homepage"
            >
              <span className="font-display text-[22px] tracking-[-0.02em] text-slate-900 font-normal leading-none">
                Miscurin
              </span>
              <span className="w-1 h-1 rounded-full bg-brand-600 ml-[2px] mb-[3px] group-hover:scale-150 transition-transform duration-200" />
            </Link>

            {/* Desktop center links */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-150',
                    'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[1.5px]',
                    'after:bg-current after:scale-x-0 after:transition-transform after:duration-200 after:origin-left',
                    'hover:after:scale-x-100',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm',
                    link.accent ? 'text-error-600 hover:text-error-700' : navTextClass
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right icons */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Search */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className={cn(
                  'p-2.5 rounded-xl transition-colors duration-150',
                  'hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
                  iconClass
                )}
              >
                <Icon name="search" size="sm" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label={wishlistCount > 0 ? `Wishlist (${wishlistCount} items)` : 'Wishlist'}
                className={cn(
                  'relative p-2.5 rounded-xl transition-colors duration-150',
                  'hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
                  iconClass
                )}
              >
                <Icon name="heart" size="sm" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-600 text-[8px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={cartCount > 0 ? `Cart (${cartCount} items)` : 'Cart'}
                className={cn(
                  'relative p-2.5 rounded-xl transition-colors duration-150',
                  'hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
                  iconClass
                )}
              >
                <Icon name="shopping-bag" size="sm" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-600 text-[8px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                aria-label="Account"
                className={cn(
                  'p-2.5 rounded-xl transition-colors duration-150',
                  'hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
                  iconClass
                )}
              >
                <Icon name="user" size="sm" />
              </Link>
            </div>

            {/* Mobile right */}
            <div className="lg:hidden flex items-center gap-1">
              <Link
                href="/cart"
                aria-label="Cart"
                className={cn('relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors', iconClass)}
              >
                <Icon name="shopping-bag" size="sm" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-600 text-[8px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className={cn('p-2.5 rounded-xl hover:bg-slate-100 transition-colors', iconClass)}
              >
                {mobileOpen ? <Icon name="x" size="sm" /> : <Icon name="menu" size="sm" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-[68px] bg-white z-[190] overflow-y-auto animate-fade-in">
            <nav className="flex flex-col px-6 pt-4 pb-12 gap-0" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-between py-5 border-b border-slate-100',
                    'text-2xl font-light tracking-tight transition-colors duration-150',
                    link.accent ? 'text-error-600' : 'text-slate-900 hover:text-brand-600',
                    i === 0 && 'border-t'
                  )}
                >
                  {link.label}
                  <Icon name="arrow-right" size="sm" className="text-slate-400" />
                </Link>
              ))}

              <div className="mt-8 flex flex-col gap-4">
                <Link href="/account" className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors" onClick={() => setMobileOpen(false)}>
                  <Icon name="user" size="sm" />
                  Account
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors" onClick={() => setMobileOpen(false)}>
                  <Icon name="heart" size="sm" />
                  Wishlist
                </Link>
                <button type="button" onClick={() => { setMobileOpen(false); setSearchOpen(true) }} className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  <Icon name="search" size="sm" />
                  Search
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
