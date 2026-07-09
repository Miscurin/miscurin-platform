import type { Metadata } from 'next'
import Link from 'next/link'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Reset Password',
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Reset your password
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Choose a strong new password for your account
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <ResetPasswordForm />
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-slate-500">
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
