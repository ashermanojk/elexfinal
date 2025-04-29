import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware that just handles redirection for admin routes
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  
  // Skip middleware for login page or API routes
  if (pathname === '/login' || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check for client-side auth token cookie
    const authToken = req.cookies.get('auth_token')?.value
    
    // If no auth token, redirect to login
    if (!authToken) {
      const url = new URL('/login', req.url)
      url.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

// Configure the middleware to run only on admin routes and login
export const config = {
  matcher: ['/admin/:path*', '/login'],
} 