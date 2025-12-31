// Example logic for /api/admin/change-password/route.js
import bcrypt from "bcryptjs";
import Seller from "@/models/sellers";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { oldPassword, newPassword } = await req.json();
  
  // 1. Get user from token
  const token = cookies().get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 2. Find user in DB
  const user = await Seller.findById(decoded.sellerId).select("+password");

  // 3. Verify OLD password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return Response.json({ message: "Current password is incorrect" }, { status: 400 });
  }

  // 4. Hash and save NEW password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return Response.json({ message: "Password updated successfully" });
}