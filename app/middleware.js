import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Not logged in → block protected routes
    if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Seller trying to access admin
        if (pathname.startsWith("/admin") && decoded.role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // Admin trying to access seller dashboard
        if (pathname.startsWith("/dashboard") && decoded.role === "admin") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
