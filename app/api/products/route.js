import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
export async function GET(req) {
    // let data=await fetch('/');
    // console.log(req)
    return NextResponse.json({success:true,req})
    
}
/*req.body=
{
name:string,
description:fdsa,
price:33,
stock:32,
category: electronic/digital devices/ stationary things/ books/ ,
image: [..urls]
isActive:
},{
timestamp:updated or lauchtime fas..
}

*/


export async function POST(req) {
    let data=await req.json();
    const client=await clientPromise;
    const db=client.db('ecommerceDB')
    const products=db.collection('products')
    


}