
import { cookies } from "next/headers";

import dbConnect from "@/lib/mongodb";
import jwt from 'jsonwebtoken';
import Seller from "@/models/sellers";
import { redirect } from "next/navigation";
import LoginPage from "../components/LoginPage";
export async function Login() {
  await dbConnect();
  const token = cookies().get('token')?.value;
  if (!token) {
    return (
      <LoginPage />
    )
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const sellerId = decoded.sellerId;
  const seller = await Seller.findOne({ _id: sellerId });
  if (seller != null) {
    redirect('/dashboard');
  }
  return (
    <LoginPage />
  )
}
