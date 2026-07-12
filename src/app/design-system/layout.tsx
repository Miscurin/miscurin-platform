import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Miscurin component library and design token showcase',
}

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky top banner */}
      <div className="sticky top-0 z-50 bg-slate-900 text-white text-xs font-medium py-2 px-4 text-center tracking-wide">
        🎨 Miscurin Design System — internal reference only
      </div>
      {children}
    </div>
  )
}
