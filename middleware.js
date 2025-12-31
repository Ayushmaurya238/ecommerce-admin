// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // ✅ Use jose instead of jsonwebtoken

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // 1. Not logged in → block protected routes
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    try {
      // ✅ In jose, you must encode the secret
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // 2. Seller trying to access admin
      if (pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // 3. Admin trying to access seller dashboard
      if (pathname.startsWith("/dashboard") && payload.role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      
      // 4. Logged in users shouldn't see login page
      if (pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL(payload.role === 'admin' ? '/admin' : '/dashboard', req.url));
      }

    } catch (error) {
      // If token is invalid/expired, clear it and send to login
      console.error("JWT Verification failed:", error.message);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};