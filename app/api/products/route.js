import { NextResponse } from "next/server";
import { productSchema } from "@/validators/product";
import Product from "@/models/product";
import jwt from 'jsonwebtoken';
export async function GET(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return Response.json({ message: 'Unauthorised' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return Response.json({ message: 'Invalid Token!' }, { status: 401 });
    }
    const sellerId = decoded.sellerId;
    const products = Product.findMany({ sellerId });
    return NextResponse.json(products, { status: 200 });
}

export async function POST(req) {
    const data = await req.json();
    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
        return Response.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 })
    }
    const token = req.cookies.get('token')?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sellerId = decoded.sellerId;

    const product = Product.findOne({ name: data.name, description: data.description, sellerId: sellerId });
    if (product) {
        NextResponse.json({ success: false, message: 'You have already added that product for sale. You can update the product properties by their id' })
    }
    else {
        const newproduct = await Product.Create({
            ...data,
            sellerId
        })
        return Response.json(
            newproduct,
            { status: 200 }
        );
    }
}