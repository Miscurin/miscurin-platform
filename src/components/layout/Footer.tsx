import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  heading: string
  links: FooterLink[]
}

interface SocialLink {
  label: string
  href: string
  icon: ReactNode
}

interface FooterProps {
  logo?: ReactNode
  tagline?: string
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
  legalLinks?: FooterLink[]
  copyright?: string
  className?: string
}

function DefaultLogo() {
  return (
    <div className="flex items-center gap-2 font-semibold text-white text-lg tracking-tight">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
        <span className="text-white text-xs font-bold">M</span>
      </span>
      Miscurin
    </div>
  )
}

export function Footer({
  logo,
  tagline = 'Premium commerce, globally scalable.',
  columns = [],
  socialLinks = [],
  legalLinks = [],
  copyright,
  className,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={cn('bg-slate-900 text-slate-400', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top grid */}
        <div
          className={cn(
            'grid gap-12',
            columns.length > 0
              ? 'grid-cols-1 md:grid-cols-[2fr_repeat(3,1fr)]'
              : 'grid-cols-1'
          )}
        >
          {/* Brand */}
          <div className="flex flex-col gap-4">
            {logo ?? <DefaultLogo />}
            {tagline && (
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                {tagline}
              </p>
            )}
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-xl',
                      'text-slate-400 hover:text-white hover:bg-white/10',
                      'transition-colors duration-150',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
                    )}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {copyright ?? `© ${year} Miscurin. All rights reserved.`}
          </p>

          {legalLinks.length > 0 && (
            <nav
              className="flex items-center gap-6"
              aria-label="Legal"
            >
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}
