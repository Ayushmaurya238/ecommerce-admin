
'use server'
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export function middleware(req) {
    const token=req.cookies.get('token')?.value||null;
    if(!token){
       return  NextResponse.redirect(new URL('/',req.url));
    }
    const decoded=jwt.verify(token,process.env.YJWT_SECRET);
    if(!decoded){
       return NextResponse.redirect(new URL('/',req.url));
    }
    const { pathname } = req.nextUrl;
    if (pathname.startsWith('/login') || pathname.startsWith('/register')   ) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
}