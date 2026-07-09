import Logo from '@/components/ui/Logo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="flex-shrink-0 px-6 py-5">
        <Logo size="md" />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">{children}</div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 px-6 py-5 text-center">
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Miscurin. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
