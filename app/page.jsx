import dbConnect from "@/lib/mongodb";
import HomePage from "./components/Home";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import Seller from "@/models/sellers";
import { redirect } from "next/navigation";
export default async function Home() {
  await dbConnect();
  const token = cookies().get('token')?.value;
  if (!token) {
    return (
      <>
        <HomePage />
      </>
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sellerId = decoded.sellerId;
  const seller = await Seller.findOne({ _id: sellerId });
  if (seller != null) {
    redirect('/dashboard');
  }
  return (
    <>
      <HomePage />
    </>
  );
}
