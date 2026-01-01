// app/dashboard/setting/page.jsx (Match your singular folder name)
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Seller from "@/models/sellers";
import dbConnect from "@/lib/mongodb";
import Settingpage from "@/app/components/Settingpage";
import { redirect, notFound } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log('here');
    redirect("/login");
  }

  // Ensure role check matches your middleware logic
  if (decoded.role !== "seller") {
    console.log('trying to get admin')
    redirect("/admin");
  }

  await dbConnect();
  const user = await Seller.findById(decoded.sellerId).select("-password").lean();

  // If user is not found in DB but token is valid, don't just redirect to login
  // This avoids the middleware loop. Show a 404 or an error.
  if (!user) {
    return notFound(); 
  }

  const serializedUser = {
    ...user,
    _id: user._id.toString(),
  };

  return <Settingpage user={serializedUser} />;
}