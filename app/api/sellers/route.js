import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";
/*
seller 
{

email:
phone_number:
categories:All/ books 
shopname:
isverified:

}
{
timestamp:true
}

*/
export default async function POST(req) {
    let data = await req.json();
    const client = await clientPromise();
    const db = client.db('ecommerceDB');
    let sellers = db.collection('seller');
    const seller = sellers.findOne({ email: data.email })
    if (seller) {
        return Response.json({ success: false, message: 'Seller already existed !' })
    }
    else {
        sellers.insertOne({
            name: data.name,
            phone_no: data.phone_no,
            email: data.email,
            shop_name: data.shop_name,
        });
        return Response.json({ success: true, message: 'New seller created' });
    }
}