import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Seller from "@/models/sellers";
import dbConnect from "@/lib/mongodb";


export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(req) {
  try {
    await dbConnect();

    const { secret, name, email, password } = await req.json();

    // 🔒 Secret verification
    if (secret !== process.env.ADMIN_ONBOARD_SECRET) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // ❌ Prevent duplicate admins
    const existing = await Seller.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Seller.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    return NextResponse.json({
      message: "Admin onboarded successfully",
      adminId: admin._id,
    });
  } catch (err) {
    console.error("Admin onboard error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
