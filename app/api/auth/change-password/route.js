import dbConnect from "@/lib/mongodb";
import Seller from "@/models/sellers";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(req) {
  try {
    await dbConnect();
    const { oldPassword, newPassword } = await req.json();
    
    const token = cookies().get("token")?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Seller.findById(decoded.sellerId).select("+password");
    
    // 1. Verify Old Password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return Response.json({ message: "Incorrect current password" }, { status: 400 });
    }

    // 2. Hash New Password
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return Response.json({ message: "Success" });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}