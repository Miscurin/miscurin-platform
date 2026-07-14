'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const MESSAGES = [
  { icon: '✦', text: 'Free Shipping on orders over $150' },
  { icon: '✦', text: 'Complimentary Returns · Always Free' },
  { icon: '✦', text: 'New Collection SS26 — Now Live' },
  { icon: '✦', text: 'Secure Payments · 128-bit Encryption' },
]

const INTERVAL = 3800

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((c) => (c + 1) % MESSAGES.length)
        setFading(false)
      }, 300)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const msg = MESSAGES[current]

  return (
    <div
      role="region"
      aria-label="Announcements"
      className="bg-slate-900 text-white py-2.5 px-4 text-center relative overflow-hidden"
    >
      <div
        className={cn(
          'flex items-center justify-center gap-2.5 transition-opacity duration-300',
          fading ? 'opacity-0' : 'opacity-100'
        )}
      >
        <span className="text-brand-400 text-[10px]">{msg.icon}</span>
        <span className="text-[11px] font-medium tracking-[0.12em] uppercase">
          {msg.text}
        </span>
        <span className="text-brand-400 text-[10px]">{msg.icon}</span>
      </div>

      {/* Dot indicators */}
      <div
        className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1"
        aria-hidden="true"
      >
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-[2px] rounded-full transition-all duration-300',
              i === current ? 'w-4 bg-brand-400' : 'w-1.5 bg-white/20'
            )}
          />
        ))}
      </div>
    </div>
  )
}
