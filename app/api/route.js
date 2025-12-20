import { NextResponse } from "next/server";

export async function GET(req) {
    // let data=await fetch('/');
    console.log(req)
    return NextResponse.json({success:true,req})
    
}