import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EmptyStateAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

interface EmptyStateProps {
  icon?: ReactNode
  illustration?: ReactNode
  title: string
  description?: string
  action?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  variant?: 'default' | 'compact' | 'card'
  className?: string
}

function DefaultIcon() {
  return (
    <svg
      className="h-12 w-12 text-slate-300"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function EmptyState({
  icon,
  illustration,
  title,
  description,
  action,
  secondaryAction,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const isCompact = variant === 'compact'
  const isCard = variant === 'card'

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        isCompact ? 'gap-3 py-8' : 'gap-6 py-16',
        isCard && 'bg-white rounded-2xl border border-slate-100 shadow-sm px-8',
        className
      )}
    >
      {/* Illustration or icon */}
      {illustration ? (
        <div className={cn(isCompact ? 'mb-0' : 'mb-2')}>{illustration}</div>
      ) : (
        <div
          className={cn(
            'flex items-center justify-center rounded-2xl bg-slate-50',
            isCompact ? 'h-12 w-12' : 'h-16 w-16'
          )}
        >
          {icon ?? <DefaultIcon />}
        </div>
      )}

      {/* Text */}
      <div className={cn('flex flex-col gap-2', isCompact ? 'gap-1' : 'gap-2')}>
        <p
          className={cn(
            'font-semibold text-slate-800',
            isCompact ? 'text-sm' : 'text-lg'
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              'text-slate-500 max-w-sm mx-auto',
              isCompact ? 'text-xs' : 'text-sm'
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {(action ?? secondaryAction) && (
        <div
          className={cn(
            'flex flex-wrap items-center justify-center',
            isCompact ? 'gap-2' : 'gap-3'
          )}
        >
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl font-medium transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500',
                isCompact ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm',
                action.variant === 'secondary'
                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              )}
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl font-medium transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400',
                'text-slate-600 hover:text-slate-900',
                isCompact ? 'text-xs' : 'text-sm'
              )}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
