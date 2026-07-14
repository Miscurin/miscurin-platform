'use client'

import { type FormEvent, useState } from 'react'
import { cn } from '@/lib/cn'
import { useToast } from '@/hooks/useToast'

export default function NewsletterSection() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 900))

    setLoading(false)
    setSubmitted(true)
    toast.success('You're on the list. Welcome to Miscurin.', { title: 'Subscribed' })
  }

  return (
    <section
      aria-label="Newsletter subscription"
      className="relative overflow-hidden bg-slate-900 py-24 lg:py-32"
    >
      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/40 rounded-full blur-3xl translate-y-1/2 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Overline */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-400 mb-4">
            The Edit
          </p>

          {/* Headline */}
          <h2 className="font-display text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-white leading-tight">
            Style Notes, Direct
            <br />
            <span className="italic text-white/60">to You</span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-base leading-relaxed text-white/60 max-w-md mx-auto">
            New arrivals, exclusive offers, and style notes from our creative team — delivered weekly, never spammy.
          </p>

          {/* Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Subscribe to newsletter"
            >
              <label htmlFor="nl-email" className="sr-only">
                Email address
              </label>
              <input
                id="nl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                autoComplete="email"
                className={cn(
                  'flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-4',
                  'text-sm text-white placeholder:text-white/40',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:border-transparent',
                  'transition-colors duration-150'
                )}
              />
              <button
                type="submit"
                disabled={loading || !email}
                className={cn(
                  'flex-shrink-0 rounded-full bg-white px-7 py-4',
                  'text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-900',
                  'hover:bg-brand-50 transition-colors duration-200',
                  'disabled:opacity-60 disabled:cursor-not-allowed',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          ) : (
            <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 max-w-md mx-auto">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success-600">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Welcome to the edit</p>
                <p className="text-xs text-white/50">
                  {email} — you'll hear from us soon.
                </p>
              </div>
            </div>
          )}

          {/* Trust note */}
          <p className="mt-5 text-xs text-white/30">
            No spam, ever. Unsubscribe in one click at any time.
          </p>

          {/* Social proof */}
          <div className="mt-10 flex items-center justify-center gap-6 border-t border-white/10 pt-8">
            {[
              { value: '48K+', label: 'Subscribers' },
              { value: '4.9★', label: 'Avg. Rating' },
              { value: 'Weekly', label: 'Cadence' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-semibold text-white">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
