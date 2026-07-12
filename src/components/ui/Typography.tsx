import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle-lg'
  | 'subtitle'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline'
  | 'label'
  | 'code'

export type TypographyColor =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'brand'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'inherit'

export type TypographyAlign = 'left' | 'center' | 'right'

interface TypographyProps {
  variant?: TypographyVariant
  color?: TypographyColor
  align?: TypographyAlign
  as?: ElementType
  truncate?: boolean
  className?: string
  children: ReactNode
}

const variantMap: Record<
  TypographyVariant,
  { element: ElementType; className: string }
> = {
  display: {
    element: 'h1',
    className: 'text-5xl lg:text-6xl font-semibold tracking-tight leading-none',
  },
  h1: {
    element: 'h1',
    className: 'text-4xl font-semibold tracking-tight leading-tight',
  },
  h2: {
    element: 'h2',
    className: 'text-3xl font-semibold tracking-tight leading-tight',
  },
  h3: {
    element: 'h3',
    className: 'text-2xl font-semibold tracking-tight leading-snug',
  },
  h4: {
    element: 'h4',
    className: 'text-xl font-semibold leading-snug',
  },
  h5: {
    element: 'h5',
    className: 'text-lg font-semibold leading-snug',
  },
  h6: {
    element: 'h6',
    className: 'text-base font-semibold leading-normal',
  },
  'subtitle-lg': {
    element: 'p',
    className: 'text-xl font-medium leading-relaxed',
  },
  subtitle: {
    element: 'p',
    className: 'text-lg font-medium leading-relaxed',
  },
  'body-lg': {
    element: 'p',
    className: 'text-lg font-normal leading-relaxed',
  },
  body: {
    element: 'p',
    className: 'text-base font-normal leading-relaxed',
  },
  'body-sm': {
    element: 'p',
    className: 'text-sm font-normal leading-relaxed',
  },
  caption: {
    element: 'span',
    className: 'text-xs font-normal leading-normal',
  },
  overline: {
    element: 'span',
    className: 'text-xs font-semibold uppercase tracking-widest',
  },
  label: {
    element: 'span',
    className: 'text-sm font-medium leading-none',
  },
  code: {
    element: 'code',
    className: 'text-sm font-mono bg-slate-100 px-1.5 py-0.5 rounded',
  },
}

const colorMap: Record<TypographyColor, string> = {
  default: 'text-slate-900',
  muted: 'text-slate-500',
  subtle: 'text-slate-400',
  brand: 'text-brand-600',
  success: 'text-success-700',
  error: 'text-error-600',
  warning: 'text-warning-700',
  info: 'text-info-600',
  inherit: 'text-inherit',
}

const alignMap: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export function Typography({
  variant = 'body',
  color = 'default',
  align,
  as,
  truncate = false,
  className,
  children,
}: TypographyProps) {
  const config = variantMap[variant]
  const Element = as ?? config.element

  return (
    <Element
      className={cn(
        config.className,
        colorMap[color],
        align && alignMap[align],
        truncate && 'truncate',
        className
      )}
    >
      {children}
    </Element>
  )
}
