import type { Metadata } from 'next'
import Link from 'next/link'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Forgot your password?
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <ForgotPasswordForm />
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-slate-500">
        Remember your password?{' '}
        <Link
          href="/login"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
