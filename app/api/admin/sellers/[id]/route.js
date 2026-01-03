import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Seller from "@/models/sellers";
import dbConnect from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function PATCH(req, { params }) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  revalidatePath('/admin')
  const { isVerified } = await req.json();

  await Seller.findByIdAndUpdate(params.id, {
    isVerified,
  });

  return NextResponse.json({ message: "Seller updated" });
}
