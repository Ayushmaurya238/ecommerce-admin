import { NextResponse } from "next/server";
import Product from "@/models/product";
import jwt from 'jsonwebtoken'
// import jwt from 'jsonwebtoken'
export default async function GET(req, { params }) {
    const productId = { params };
    const token = jwt.cookies.get('token')?.value;
    if (!token) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        )
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return Response.json(
            { message: 'Invalid token' },
            { status: 401 }
        )
    }
    const product = Product.findOne({ _id: productid, sellerId: sellerId });
    NextResponse.json(product, { status: 200 });

}

export default async function PUT(req, { params }) {
    const productid = { params };
    const token = jwt.cookies.get('token')?.value;
    if (!token) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        )
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return Response.json(
            { message: 'Invalid token' },
            { status: 401 }
        )
    }
    const sellerId = decoded.sellerId;
    const body = await req.json();
    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
        return Response.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 })
    }
    const { name, description, price, stock, category, images, isActive } = body;
    // Product.update({_id:productid},{$set{}})
    const product = Product.findOne({ _id: productid, sellerId: sellerId });
    if (!product) {
        return Response.json({ message: 'Product not found' }, { status: 404 })
    }
    Product.updateOne(product, { $set: { name, description, price, stock, category, images, isActive } })

    return Response.json({ message: 'Updated product successfully' }, { status: 200 });
}

export default async function DELETE(req, { params }) {
    const productid = { params };
    const token = jwt.cookies.get('token')?.value;
    if (!token) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        )
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return Response.json(
            { message: 'Invalid token' },
            { status: 401 }
        )
    }
    const sellerId = decoded.sellerId;
    const product = Product.findOne({ _id: productid, sellerId: sellerId });
    if (!product) {
        return Response.json({ message: 'Product not found' }, { status: 404 });
    }
    Product.deleteOne({ _id: productid });
    return Response.json({ message: 'Product deleted successfully' });
}