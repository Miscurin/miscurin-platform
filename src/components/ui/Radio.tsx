'use client'

import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
}

interface RadioGroupProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

const sizeMap = {
  sm: { circle: 'h-3.5 w-3.5', dot: 'h-1.5 w-1.5', label: 'text-sm' },
  md: { circle: 'h-4 w-4', dot: 'h-2 w-2', label: 'text-sm' },
  lg: { circle: 'h-5 w-5', dot: 'h-2.5 w-2.5', label: 'text-base' },
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      error,
      size = 'md',
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
              type="radio"
              disabled={disabled}
              aria-describedby={description ?? error ? descId : undefined}
              {...(error ? { 'aria-errormessage': descId } : {})}
              className={cn(
                'appearance-none rounded-full border bg-white',
                'transition-all duration-150',
                'focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1',
                'checked:bg-brand-600 checked:border-brand-600',
                'disabled:cursor-not-allowed disabled:opacity-50',
                s.circle,
                error
                  ? 'border-error-400 focus:ring-error-200'
                  : 'border-slate-300 hover:border-slate-400'
              )}
              {...props}
            />
            {/* Dot */}
            <span
              className={cn(
                'pointer-events-none absolute rounded-full bg-white',
                'opacity-0 transition-opacity duration-150',
                s.dot
              )}
              aria-hidden="true"
            />
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
                  'text-xs',
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

Radio.displayName = 'Radio'

export function RadioGroup({
  label,
  error,
  hint,
  required,
  className,
  children,
}: RadioGroupProps) {
  return (
    <fieldset className={cn('border-0 p-0 m-0', className)}>
      {label && (
        <legend className="text-sm font-medium text-slate-700 mb-3">
          {label}
          {required && (
            <span className="ml-1 text-error-500" aria-hidden="true">
              *
            </span>
          )}
        </legend>
      )}
      <div className="flex flex-col gap-3">{children}</div>
      {(hint ?? error) && (
        <p
          className={cn(
            'mt-2 text-xs',
            error ? 'text-error-600' : 'text-slate-500'
          )}
        >
          {error ?? hint}
        </p>
      )}
    </fieldset>
  )
}

export { Radio }
