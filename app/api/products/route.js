import { NextResponse } from "next/server";
import { productSchema } from "@/validators/product";
import Product from "@/models/product";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";


export const dynamic = "force-dynamic";
export const revalidate = 0;
/* ================= GET PRODUCTS ================= */
export async function GET(req) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const sellerId = decoded.sellerId;

  const products = await Product.find({ sellerId });

  return NextResponse.json(products, { status: 200 });
}

/* ================= CREATE PRODUCT ================= */
export async function POST(req) {
  await dbConnect();

  const data = await req.json();

  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const sellerId = decoded.sellerId;

  
  const existingProduct = await Product.findOne({
    name: data.name,
    description: data.description,
    sellerId,
  });

  if (existingProduct) {
    return NextResponse.json(
      {
        success: false,
        message:
          "You have already added this product. You can update it instead.",
      },
      { status: 409 }
    );
  }

  // ✅ FIXED: create()
  const newProduct = await Product.create({
    ...parsed.data,
    sellerId,
  });

  return NextResponse.json(newProduct, { status: 201 },{success:true});
}
