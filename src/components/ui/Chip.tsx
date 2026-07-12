'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ChipVariant = 'default' | 'brand' | 'success' | 'warning' | 'error'

interface ChipProps {
  variant?: ChipVariant
  selected?: boolean
  removable?: boolean
  disabled?: boolean
  onRemove?: () => void
  onClick?: () => void
  className?: string
  children: ReactNode
}

const variantMap: Record<ChipVariant, { base: string; selected: string }> = {
  default: {
    base: 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    selected: 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800',
  },
  brand: {
    base: 'border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100',
    selected: 'border-brand-600 bg-brand-600 text-white hover:bg-brand-700',
  },
  success: {
    base: 'border-success-100 bg-success-50 text-success-700 hover:bg-success-100',
    selected: 'border-success-600 bg-success-600 text-white hover:bg-success-700',
  },
  warning: {
    base: 'border-warning-100 bg-warning-50 text-warning-700 hover:bg-warning-100',
    selected: 'border-warning-600 bg-warning-600 text-white hover:bg-warning-700',
  },
  error: {
    base: 'border-error-100 bg-error-50 text-error-700 hover:bg-error-100',
    selected: 'border-error-600 bg-error-600 text-white hover:bg-error-700',
  },
}

export function Chip({
  variant = 'default',
  selected = false,
  removable = false,
  disabled = false,
  onRemove,
  onClick,
  className,
  children,
}: ChipProps) {
  const styles = variantMap[variant]
  const isInteractive = !!onClick

  return (
    <span
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      aria-pressed={isInteractive ? selected : undefined}
      aria-disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium',
        'transition-colors duration-150',
        selected ? styles.selected : styles.base,
        isInteractive && !disabled && 'cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) onRemove?.()
          }}
          disabled={disabled}
          aria-label="Remove"
          className={cn(
            'flex-shrink-0 rounded-full p-0.5',
            'hover:bg-black/10 transition-colors duration-100',
            selected && 'hover:bg-white/20'
          )}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  )
}
