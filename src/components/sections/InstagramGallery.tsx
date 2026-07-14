import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

const POSTS = [
  {
    id: 'ig-1',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    alt: 'Editorial fashion portrait — runway look',
    span: 'row-span-2',
  },
  {
    id: 'ig-2',
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    alt: 'Street style — shopping scene',
    span: '',
  },
  {
    id: 'ig-3',
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    alt: 'Monochrome collection — backstage detail',
    span: '',
  },
  {
    id: 'ig-4',
    src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    alt: 'Accessories campaign — leather goods',
    span: 'row-span-2',
  },
  {
    id: 'ig-5',
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    alt: 'Outerwear editorial — coat styling',
    span: '',
  },
  {
    id: 'ig-6',
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    alt: 'Women's collection — warm palette',
    span: '',
  },
]

export default function InstagramGallery() {
  return (
    <section aria-label="Follow us on Instagram" className="py-24 lg:py-32 bg-[#F7F6F4]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-600 mb-3">
            @miscurin
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-normal tracking-tight text-slate-900">
            Follow the Story
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-sm mx-auto">
            Daily inspiration from our creative team and community.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-[auto] gap-3 lg:gap-4"
          style={{ gridTemplateRows: 'repeat(2, 260px)' }}
        >
          {POSTS.map((post) => (
            <Link
              key={post.id}
              href="https://instagram.com/miscurin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram post — ${post.alt}`}
              className={cn(
                'group relative overflow-hidden rounded-2xl bg-slate-100',
                post.span,
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
              )}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 text-white text-sm font-medium">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  View Post
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="https://instagram.com/miscurin"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2.5 rounded-full border border-slate-300 px-8 py-3.5',
              'text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-700',
              'hover:border-slate-900 hover:text-slate-900 transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400'
            )}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow @miscurin
          </Link>
        </div>
      </div>
    </section>
  )
}
