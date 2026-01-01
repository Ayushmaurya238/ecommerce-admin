import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Seller from "@/models/sellers";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  const user = await Seller.findOne({ email }).select("+password");
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      sellerId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({
    message: "Login successful",
    role: user.role,
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
