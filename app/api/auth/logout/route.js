import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'https://ecommerce-admin-three-eta.vercel.app/'));

  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
