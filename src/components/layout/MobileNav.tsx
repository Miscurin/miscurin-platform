'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

export interface MobileNavItem {
  label: string
  href: string
  icon: ReactNode
  activeIcon?: ReactNode
  badge?: number
}

interface MobileNavProps {
  items: MobileNavItem[]
  className?: string
}

export function MobileNav({ items, className }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile navigation"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[200]',
        'bg-white/95 backdrop-blur-md',
        'border-t border-slate-100 shadow-lg',
        'safe-bottom', // iOS safe area
        className
      )}
    >
      <div className="flex items-stretch">
        {items.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-3 px-2',
                'transition-colors duration-150',
                'focus:outline-none focus-visible:bg-slate-50',
                isActive ? 'text-brand-600' : 'text-slate-400 hover:text-slate-700'
              )}
            >
              <span className="relative flex items-center justify-center">
                {isActive ? (item.activeIcon ?? item.icon) : item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={cn(
                      'absolute -top-1.5 -right-1.5',
                      'flex h-4 w-4 items-center justify-center',
                      'rounded-full bg-brand-600 text-[9px] font-bold text-white',
                      item.badge > 9 && 'w-5 text-[8px]'
                    )}
                    aria-label={`${item.badge} items`}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </span>
              <span
                className={cn(
                  'text-[10px] font-medium leading-none',
                  isActive ? 'text-brand-600' : 'text-slate-500'
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
