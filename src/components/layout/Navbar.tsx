'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  logo?: ReactNode
  links?: NavLink[]
  actions?: ReactNode
  sticky?: boolean
  transparent?: boolean
  className?: string
}

function DefaultLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold text-slate-900 text-lg tracking-tight"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
        <span className="text-white text-xs font-bold">M</span>
      </span>
      Miscurin
    </Link>
  )
}

export function Navbar({
  logo,
  links = [],
  actions,
  sticky = true,
  transparent = false,
  className,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={cn(
        'z-[200] w-full transition-all duration-200',
        sticky && 'sticky top-0',
        transparent && !scrolled
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100',
        scrolled && 'shadow-sm',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">{logo ?? <DefaultLogo />}</div>

          {/* Desktop links */}
          {links.length > 0 && (
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium',
                    'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                    'transition-colors duration-150',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Actions + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">{actions}</div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className={cn(
                'md:hidden flex items-center justify-center h-9 w-9 rounded-xl',
                'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                'transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
              )}
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-slide-down">
          <nav className="flex flex-col px-4 py-3 gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-3 py-2.5 rounded-xl text-sm font-medium',
                  'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
                  'transition-colors duration-150'
                )}
              >
                {link.label}
              </Link>
            ))}
            {actions && (
              <div className="border-t border-slate-100 pt-3 mt-2 flex flex-col gap-2">
                {actions}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
