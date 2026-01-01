// app/dashboard/setting/page.jsx (Match your singular folder name)
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Seller from "@/models/sellers";
import dbConnect from "@/lib/mongodb";
import Settingpage from "@/app/components/Settingpage";
import { redirect, notFound } from "next/navigation";
import mongoose from "mongoose";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SettingsPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // console.log('here');
    redirect("/login");
  }
  // console.log(decoded.sellerId)

  

  await dbConnect();
  const user = await Seller.findOne({ _id:new mongoose.Types.ObjectId(decoded.sellerId) }).lean()

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