import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { setToken } from './query/auth.query'
 
const protectedRoutes = ['/admin']
const authRoutes = ['/login', '/signup']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const tokenFromQuery = req.nextUrl.searchParams.get('token')
  if (tokenFromQuery) {
    const token = tokenFromQuery;
    await setToken(token);
    
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isAuthRoute = authRoutes.some(route => path.startsWith(route))
 
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value
 
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