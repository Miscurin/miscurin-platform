import { forwardRef, type SelectHTMLAttributes, useId } from 'react'
import { cn } from '@/lib/cn'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  size?: SelectSize
  options?: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

const sizeMap: Record<SelectSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg pr-8',
  md: 'h-10 px-3.5 text-sm rounded-xl pr-9',
  lg: 'h-12 px-4 text-base rounded-xl pr-10',
}

const iconSizeMap: Record<SelectSize, string> = {
  sm: 'right-2.5 h-3.5 w-3.5',
  md: 'right-3 h-4 w-4',
  lg: 'right-3.5 h-4 w-4',
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      options,
      placeholder,
      fullWidth = false,
      className,
      id: idProp,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const hintId = `${id}-hint`
    const hasError = !!error

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-slate-700"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-error-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            aria-describedby={hint || error ? hintId : undefined}
            aria-invalid={hasError}
            className={cn(
              'w-full appearance-none bg-white border font-normal text-slate-900',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
              sizeMap[size],
              hasError
                ? 'border-error-400 focus:border-error-500 focus:ring-error-200'
                : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100',
              !props.value && !props.defaultValue && 'text-slate-400',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </option>
            ))}
            {children}
          </select>

          {/* Chevron icon */}
          <div
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400',
              iconSizeMap[size]
            )}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {(hint ?? error) && (
          <p
            id={hintId}
            className={cn(
              'text-xs',
              hasError ? 'text-error-600' : 'text-slate-500'
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
