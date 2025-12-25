import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
export async function GET(req) {
    //set the cookie to '' and maxAge 1 to logout and then redirect to home page
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('token', '', { maxAge: 0, path: '/' });
    
    return response;

}



