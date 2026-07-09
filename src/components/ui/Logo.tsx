import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const sizeMap = {
  sm: { text: 'text-lg', dot: 'w-2 h-2' },
  md: { text: 'text-2xl', dot: 'w-2.5 h-2.5' },
  lg: { text: 'text-3xl', dot: 'w-3 h-3' },
}

export default function Logo({ size = 'md', href = '/' }: LogoProps) {
  const { text, dot } = sizeMap[size]

  const content = (
    <span className="inline-flex items-center gap-1.5 select-none">
      <span className={`${dot} rounded-full bg-brand-600 flex-shrink-0`} />
      <span className={`${text} font-semibold tracking-tight text-slate-900`}>
        Miscurin
      </span>
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    )
  }

  return content
}
