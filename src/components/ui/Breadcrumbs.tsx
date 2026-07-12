import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  maxItems?: number
  className?: string
}

const DefaultSeparator = () => (
  <svg
    className="h-3.5 w-3.5 text-slate-300 flex-shrink-0"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 12l4-4-4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Breadcrumbs({
  items,
  separator,
  maxItems,
  className,
}: BreadcrumbsProps) {
  const sep = separator ?? <DefaultSeparator />

  let visibleItems = items
  let hasEllipsis = false

  if (maxItems && items.length > maxItems) {
    hasEllipsis = true
    const keep = Math.max(1, maxItems - 1)
    visibleItems = [
      items[0]!,
      ...items.slice(items.length - keep),
    ]
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1
          const showEllipsis = hasEllipsis && index === 1

          return (
            <li key={index} className="flex items-center gap-1.5">
              {showEllipsis && (
                <>
                  <span className="text-sm text-slate-400 select-none">…</span>
                  <span className="flex items-center">{sep}</span>
                </>
              )}

              {isLast ? (
                <span
                  className="flex items-center gap-1 text-sm font-medium text-slate-800"
                  aria-current="page"
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : item.href ? (
                <>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 text-sm text-slate-500',
                      'hover:text-slate-900 transition-colors duration-150',
                      'focus:outline-none focus-visible:underline'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                  <span className="flex items-center">{sep}</span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className="flex items-center">{sep}</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
