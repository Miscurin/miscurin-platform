import type { Metadata } from 'next'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import HomeNav from '@/components/sections/HomeNav'
import HeroSection from '@/components/sections/HeroSection'
import CategoriesSection from '@/components/sections/CategoriesSection'
import NewArrivalsSection from '@/components/sections/NewArrivalsSection'
import TrendingBanner from '@/components/sections/TrendingBanner'
import BestSellersSection from '@/components/sections/BestSellersSection'
import WhyMiscurin from '@/components/sections/WhyMiscurin'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import InstagramGallery from '@/components/sections/InstagramGallery'
import NewsletterSection from '@/components/sections/NewsletterSection'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Miscurin — Premium Fashion, Globally',
  description:
    'Discover the new SS26 collection. Refined essentials and editorial pieces for the discerning wardrobe. Free shipping on orders over $150.',
  openGraph: {
    title: 'Miscurin — Premium Fashion, Globally',
    description: 'Refined essentials and editorial pieces for the discerning wardrobe.',
    type: 'website',
  },
}

const FOOTER_COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Miscurin', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    heading: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/new-arrivals' },
      { label: 'Women', href: '/women' },
      { label: 'Men', href: '/men' },
      { label: 'Accessories', href: '/accessories' },
      { label: 'Sale', href: '/sale' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping & Delivery', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
]

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/miscurin',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/miscurin',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/miscurin',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <HomeNav />
      <main id="main-content">
        <HeroSection />
        <CategoriesSection />
        <NewArrivalsSection />
        <TrendingBanner />
        <BestSellersSection />
        <WhyMiscurin />
        <TestimonialsSection />
        <InstagramGallery />
        <NewsletterSection />
      </main>
      <Footer
        tagline="Refined essentials and editorial pieces for the discerning wardrobe."
        columns={FOOTER_COLUMNS}
        legalLinks={LEGAL_LINKS}
        socialLinks={SOCIAL_LINKS}
      />
    </>
  )
}
