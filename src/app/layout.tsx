import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/contexts/ToastContext'
import { Toaster } from '@/components/ui/Toaster'

export const metadata: Metadata = {
  title: {
    default: 'Miscurin',
    template: '%s | Miscurin',
  },
  description: 'Miscurin Commerce Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
}
