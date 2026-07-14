import { cn } from '@/lib/cn'

const FEATURES = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Premium Quality',
    description:
      'Every piece is crafted from ethically sourced materials — tested to withstand seasons, not just trends.',
    accent: 'from-brand-50 to-indigo-50',
    iconBg: 'bg-brand-600',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
      </svg>
    ),
    title: 'Worldwide Shipping',
    description:
      'Delivered to 120+ countries in 3–5 business days. Carbon-neutral packaging on every shipment.',
    accent: 'from-success-50 to-emerald-50',
    iconBg: 'bg-success-600',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Secure Checkout',
    description:
      'End-to-end encrypted payments. We accept all major cards, PayPal, and Apple Pay.',
    accent: 'from-violet-50 to-purple-50',
    iconBg: 'bg-violet-600',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'Easy Returns',
    description:
      '30-day free returns on all orders. No questions asked — your satisfaction is our priority.',
    accent: 'from-warning-50 to-amber-50',
    iconBg: 'bg-warning-600',
  },
]

export default function WhyMiscurin() {
  return (
    <section
      aria-label="Why shop with Miscurin"
      className="py-24 lg:py-32 bg-[#F7F6F4]"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-600 mb-3">
            Our Promise
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-normal tracking-tight text-slate-900">
            Why Miscurin
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Every decision we make is guided by one principle — your experience should be exceptional, every time.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
              className={cn(
                'group relative overflow-hidden rounded-2xl lg:rounded-3xl p-8',
                'bg-gradient-to-br',
                feat.accent,
                'border border-white/80',
                'hover:shadow-lg transition-shadow duration-300'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm',
                  feat.iconBg
                )}
              >
                {feat.icon}
              </div>

              {/* Text */}
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {feat.description}
              </p>

              {/* Decorative circle */}
              <div
                className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full opacity-[0.06] bg-slate-900 transition-transform duration-500 group-hover:scale-125"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
