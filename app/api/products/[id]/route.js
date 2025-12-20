import { NextResponse } from "next/server"; 
import Product from "@/models/product";
// import jwt from 'jsonwebtoken'
export default async function PUT(req,{params}) {
    const productid={params};
    const body=await req.json();
    // Product.update({_id:productid},{$set{}})

    

}