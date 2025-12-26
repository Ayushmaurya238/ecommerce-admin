import { NextResponse } from "next/server";
import Product from "@/models/product";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import { productSchema } from "@/validators/product";

/* ================= HELPER ================= */
function getSellerId(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.sellerId;
  } catch {
    return null;
  }
}

/* ================= GET PRODUCT ================= */
export async function GET(req, { params }) {
  await dbConnect();

  const sellerId = getSellerId(req);
  if (!sellerId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const product = await Product.findOne({ _id: id, sellerId });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product, { status: 200 });
}

/* ================= UPDATE PRODUCT ================= */
export async function PUT(req, { params }) {
  await dbConnect();

  const sellerId = getSellerId(req);
  if (!sellerId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const product = await Product.findOne({ _id: id, sellerId });
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  await Product.updateOne(
    { _id: id },
    { $set: parsed.data }
  );

  return NextResponse.json(
    { message: "Product updated successfully" },
    { status: 200 }
  );
}

/* ================= DELETE PRODUCT ================= */
export async function DELETE(req, { params }) {
  await dbConnect();

  const sellerId = getSellerId(req);
  if (!sellerId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const product = await Product.findOne({ _id: id, sellerId });
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  await Product.deleteOne({ _id: id });

  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );
}


export async function PATCH(req, { params }) {
  await dbConnect()

  const sellerId = getSellerId(req)
  if (!sellerId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params;
  const { isActive } = await req.json()

  const product = await Product.findOne({ _id: id, sellerId })
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }

  product.isActive = isActive
  await product.save()

  return NextResponse.json({ success: true })
}
