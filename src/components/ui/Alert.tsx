type AlertVariant = 'error' | 'success' | 'warning' | 'info'

interface AlertProps {
  variant: AlertVariant
  title?: string
  message: string
  className?: string
}

const variantConfig: Record<
  AlertVariant,
  { bg: string; border: string; icon: string; title: string; text: string }
> = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '⚠',
    title: 'text-red-800',
    text: 'text-red-700',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '✓',
    title: 'text-green-800',
    text: 'text-green-700',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '⚠',
    title: 'text-amber-800',
    text: 'text-amber-700',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'ℹ',
    title: 'text-blue-800',
    text: 'text-blue-700',
  },
}

export default function Alert({
  variant,
  title,
  message,
  className = '',
}: AlertProps) {
  const config = variantConfig[variant]

  return (
    <div
      role="alert"
      className={`rounded-lg border ${config.bg} ${config.border} px-4 py-3 ${className}`}
    >
      <div className="flex gap-2.5">
        <span
          className={`text-sm font-semibold leading-5 ${config.title} flex-shrink-0`}
          aria-hidden="true"
        >
          {config.icon}
        </span>
        <div>
          {title && (
            <p className={`text-sm font-semibold ${config.title}`}>{title}</p>
          )}
          <p className={`text-sm ${config.text}`}>{message}</p>
        </div>
      </div>
    </div>
  )
}
