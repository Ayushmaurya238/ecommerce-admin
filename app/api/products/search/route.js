import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";

export async function POST(req) {
  try {
    // 🔥 MUST CONNECT
    await dbConnect();

    const data = await req.json();

    // 🔐 AUTH CHECK
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const sellerId = decoded.sellerId;

    let products = [];

    // 🔍 SEARCH LOGIC
    if (data.filter === "Product") {
      products = await Product.find({
        sellerId,
        name: { $regex: data.search, $options: "i" },
      });
    } 
    else if (data.filter === "Category") {
      products = await Product.find({
        sellerId,
        category: { $regex: data.search, $options: "i" },
      });
    } 
    else {
      return NextResponse.json(
        { message: "Invalid filter" },
        { status: 400 }
      );
    }

    // ✅ EMPTY RESULT IS NOT AN ERROR
    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error("SEARCH ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
