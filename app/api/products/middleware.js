import { NextResponse } from "next/server";

import jwt from 'jsonwebtoken'

export default async function middleware(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json({
            message: "Unauthorised"
        },
            {
                status: 401
            })
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const sellerId = decoded.sellerId;
        return NextResponse.next();
    }
    catch {
        return NextResponse.json({
            message: 'Invalid token'
        },
            {
                status: 401
            }
        )
    }

}