import { cn } from '@/lib/cn'

const REVIEWS = [
  {
    id: 1,
    name: 'Emma L.',
    location: 'London, UK',
    rating: 5,
    date: 'December 2025',
    product: 'Structured Wool Coat',
    review:
      "The wool coat is exceptional — the cut is perfect and the fabric has a weight that feels genuinely luxurious. Worth every penny. I've had three people stop me on the street to ask where it's from.",
    initials: 'EL',
    color: 'bg-brand-600',
  },
  {
    id: 2,
    name: 'Marcus W.',
    location: 'New York, USA',
    rating: 5,
    date: 'November 2025',
    product: 'Merino Wool Blazer',
    review:
      "Fast shipping and the packaging was genuinely beautiful — felt like opening a gift. The blazer fit perfectly with zero alterations needed. This is what premium shopping should feel like.",
    initials: 'MW',
    color: 'bg-slate-700',
  },
  {
    id: 3,
    name: 'Priya S.',
    location: 'Singapore',
    rating: 5,
    date: 'January 2026',
    product: 'Fluid Silk Blouse',
    review:
      "Finally a brand that delivers on both quality and style. The silk blouse drapes beautifully and the colour is exactly as shown. Returns were effortless when I needed a size exchange.",
    initials: 'PS',
    color: 'bg-success-600',
  },
  {
    id: 4,
    name: 'Léa M.',
    location: 'Paris, France',
    rating: 5,
    date: 'February 2026',
    product: 'Midi Slip Dress',
    review:
      "I ordered three pieces in one go and everything arrived perfectly. The slip dress is my new favourite — it works for everything from brunch to evening events. Miscurin has a customer for life.",
    initials: 'LM',
    color: 'bg-violet-600',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            'h-3.5 w-3.5',
            i < count
              ? 'text-warning-500 fill-warning-500'
              : 'text-slate-200 fill-slate-200'
          )}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section
      aria-label="Customer reviews"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-600 mb-3">
              Testimonials
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-normal tracking-tight text-slate-900">
              What Our Customers
              <br className="hidden lg:block" />
              <span className="italic text-slate-400"> Are Saying</span>
            </h2>
          </div>

          {/* Aggregate rating */}
          <div className="flex items-center gap-5 rounded-2xl bg-[#F7F6F4] px-6 py-4 self-start lg:self-auto">
            <div className="text-center">
              <p className="font-display text-4xl font-normal text-slate-900">4.9</p>
              <StarRating count={5} />
              <p className="mt-1 text-xs text-slate-400">2,400+ reviews</p>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div className="text-sm text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-900">Excellent</p>
              <p>Trustpilot rating</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-2xl lg:rounded-3xl border border-slate-100 bg-white p-7 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Top */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <StarRating count={review.rating} />
                  {/* Opening quote mark */}
                  <svg
                    className="h-8 w-8 text-slate-100 fill-current"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M10 8C6.134 8 3 11.134 3 15v9h9v-9H6c0-2.206 1.794-4 4-4V8zm16 0c-3.866 0-7 3.134-7 7v9h9v-9h-6c0-2.206 1.794-4 4-4V8z" />
                  </svg>
                </div>

                <p className="text-sm leading-relaxed text-slate-700">
                  &ldquo;{review.review}&rdquo;
                </p>

                <p className="mt-3 text-xs text-brand-600 font-medium">
                  Purchased: {review.product}
                </p>
              </div>

              {/* Reviewer */}
              <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div
                  className={cn(
                    'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white',
                    review.color
                  )}
                  aria-hidden="true"
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                  <p className="text-xs text-slate-400">{review.location} · {review.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
