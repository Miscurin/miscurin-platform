import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { PROTECTED_PREFIXES, AUTH_ROUTES } from '@/constants/routes'
import { isSafeRedirect } from '@/utils/url'

export async function middleware(request: NextRequest) {
  // If Supabase is not configured yet, pass all requests through
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl === 'your_supabase_project_url'
  ) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[]
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refresh session — do not remove; keeps tokens alive
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )
  if (!user && isProtected) {
    const loginUrl = new URL('/login', request.url)
    if (isSafeRedirect(pathname)) {
      loginUrl.searchParams.set('redirectTo', pathname)
    }
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth routes
  const isAuthRoute = (AUTH_ROUTES as readonly string[]).includes(pathname)
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
