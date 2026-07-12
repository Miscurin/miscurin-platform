'use client'

import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  indeterminate?: boolean
}

const sizeMap = {
  sm: { box: 'h-3.5 w-3.5 rounded', label: 'text-sm', description: 'text-xs' },
  md: { box: 'h-4 w-4 rounded', label: 'text-sm', description: 'text-xs' },
  lg: { box: 'h-5 w-5 rounded-md', label: 'text-base', description: 'text-sm' },
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      size = 'md',
      indeterminate = false,
      className,
      id: idProp,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const descId = `${id}-desc`
    const s = sizeMap[size]

    return (
      <div className={cn('flex gap-3', className)}>
        <div className="flex items-start pt-0.5">
          <div className="relative flex items-center justify-center">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              disabled={disabled}
              aria-describedby={description ?? error ? descId : undefined}
              aria-invalid={!!error}
              className={cn(
                'appearance-none border bg-white',
                'transition-all duration-150',
                'focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1',
                'checked:bg-brand-600 checked:border-brand-600',
                'disabled:cursor-not-allowed disabled:opacity-50',
                s.box,
                error
                  ? 'border-error-400 focus:ring-error-200'
                  : 'border-slate-300 hover:border-slate-400'
              )}
              {...props}
            />
            {/* Check icon */}
            <svg
              className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              {indeterminate ? (
                <path
                  d="M3 6h6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
        </div>

        {(label ?? description ?? error) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'font-medium text-slate-800 leading-none cursor-pointer',
                  s.label,
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {(description ?? error) && (
              <p
                id={descId}
                className={cn(
                  s.description,
                  error ? 'text-error-600' : 'text-slate-500'
                )}
              >
                {error ?? description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
