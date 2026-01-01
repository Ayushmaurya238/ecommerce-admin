import dbConnect from "@/lib/mongodb";
import HomePage from "./components/Home";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import Seller from "@/models/sellers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  // console.log(decoded);
  const seller = await Seller.findOne({ _id: sellerId });
  // console.log(seller);
  if (seller != null) {
    if(seller.role==='admin'){
      redirect('/admin')
    }
    else{

      redirect('/dashboard');
    }
  }
  return (
    <>
      <HomePage />
    </>
  );
}
