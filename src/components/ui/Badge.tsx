import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline'

export type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  pill?: boolean
  className?: string
  children: ReactNode
}

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 border border-slate-200',
  brand: 'bg-brand-50 text-brand-700 border border-brand-200',
  success: 'bg-success-50 text-success-700 border border-success-100',
  warning: 'bg-warning-50 text-warning-700 border border-warning-100',
  error: 'bg-error-50 text-error-700 border border-error-100',
  info: 'bg-info-50 text-info-700 border border-info-100',
  outline: 'bg-transparent text-slate-700 border border-slate-300',
}

const dotColorMap: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  brand: 'bg-brand-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  info: 'bg-info-500',
  outline: 'bg-slate-400',
}

const sizeMap: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-1.5 py-0.5 gap-1',
  md: 'text-xs px-2 py-0.5 gap-1.5',
  lg: 'text-sm px-2.5 py-1 gap-1.5',
}

const dotSizeMap: Record<BadgeSize, string> = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  pill = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        variantMap[variant],
        sizeMap[size],
        pill ? 'rounded-full' : 'rounded-md',
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'rounded-full flex-shrink-0',
            dotColorMap[variant],
            dotSizeMap[size]
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
