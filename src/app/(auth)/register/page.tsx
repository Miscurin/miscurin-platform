import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create Account',
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Join Miscurin and get started today
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <RegisterForm />
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
