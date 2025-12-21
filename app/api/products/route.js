import { NextResponse } from "next/server";

import Product from "@/models/product";
import jwt from 'jsonwebtoken';
export async function GET(req) {
    const token=req.cookies.get('token')?.value;
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const sellerId=decoded.sellerId;
    const products=Product.findMany({sellerId});
    return NextResponse.json(products,{status:200});

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
    const token=req.cookies.get('token')?.value;
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const sellerId=decoded.sellerId;
    const data = await req.json();
    const product = Product.findOne({ name: data.name, description: data.description, sellerId: sellerId });
    if (product) {
        NextResponse.json({ success: false, message: 'You have already added that product for sale. You can update the product properties by their id' })
    }
    else {
      const newproduct= await Product.Create({
            ...data,
            sellerId
        })
        return Response.json(
            newproduct,
            { status: 201 }
        );
    }
}