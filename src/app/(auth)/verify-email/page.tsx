import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Verify Email',
}

interface VerifyEmailPageProps {
  searchParams: Promise<{ type?: string }>
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams
  const isSignup = params.type === 'signup'

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
          <svg
            className="h-7 w-7 text-brand-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          {isSignup ? 'Check your inbox' : 'Verify your email'}
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          {isSignup
            ? 'We sent a verification link to your email. Please click it to activate your account.'
            : 'Click the link in your email to verify your address.'}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            <strong className="font-medium text-slate-800">
              Didn&apos;t receive it?
            </strong>{' '}
            Check your spam folder or make sure you entered the correct email
            address.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Back to sign in
        </Link>
      </div>

      <p className="text-center text-sm text-slate-500">
        Wrong account?{' '}
        <Link
          href="/register"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Create a new one
        </Link>
      </p>
    </div>
  )
}
