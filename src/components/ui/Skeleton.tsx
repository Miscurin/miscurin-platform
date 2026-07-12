import { cn } from '@/lib/cn'

type SkeletonVariant = 'text' | 'rect' | 'circle' | 'rounded'

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  lines?: number
  className?: string
  animate?: boolean
}

interface SkeletonCardProps {
  showImage?: boolean
  lines?: number
  className?: string
}

interface SkeletonProductCardProps {
  className?: string
}

function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  animate = true,
}: SkeletonProps) {
  const base = cn(
    'bg-slate-200',
    animate && 'animate-skeleton',
    variant === 'circle' && 'rounded-full',
    variant === 'rounded' && 'rounded-lg',
    variant === 'rect' && 'rounded',
    variant === 'text' && 'rounded',
    className
  )

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className="flex flex-col gap-2" role="status" aria-label="Loading…">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(base, 'h-4')}
            style={{ ...style, width: i === lines - 1 ? '75%' : '100%' }}
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={base}
      style={style}
      role="status"
      aria-label="Loading…"
      aria-hidden="true"
    />
  )
}

function SkeletonCard({ showImage = true, lines = 3, className }: SkeletonCardProps) {
  return (
    <div
      className={cn('rounded-2xl border border-slate-100 bg-white p-5', className)}
      role="status"
      aria-label="Loading…"
    >
      {showImage && (
        <Skeleton variant="rounded" height={160} className="w-full mb-4" />
      )}
      <div className="flex flex-col gap-3">
        <Skeleton variant="text" height={16} width="60%" />
        <Skeleton variant="text" lines={lines} height={14} />
        <Skeleton variant="text" height={14} width="40%" />
      </div>
    </div>
  )
}

function SkeletonProductCard({ className }: SkeletonProductCardProps) {
  return (
    <div className={cn('group', className)} role="status" aria-label="Loading product…">
      <Skeleton variant="rounded" className="w-full aspect-[3/4] mb-3" />
      <div className="px-1 flex flex-col gap-2">
        <Skeleton variant="text" height={12} width="40%" />
        <Skeleton variant="text" height={14} width="80%" />
        <Skeleton variant="text" height={14} width="30%" />
      </div>
    </div>
  )
}

Skeleton.Card = SkeletonCard
Skeleton.ProductCard = SkeletonProductCard

export { Skeleton }
