import { NextRequest, NextResponse } from 'next/server'
import { setAccessToken, getAccessToken } from "@/lib/auth"
 
const protectedRoutes = ['/admin', '/profile', '/password/change']
const authRoutes = ['/login', '/signup', '/password/forgot', '/password/reset']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const tokenFromQuery = req.nextUrl.searchParams.get('token')
  if (tokenFromQuery) {
    const token = tokenFromQuery;
    await setAccessToken(token);
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isAuthRoute = authRoutes.some(route => path.startsWith(route))
 
  const token = await getAccessToken();
 
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)'],
}