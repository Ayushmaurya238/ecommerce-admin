// app/login/page.jsx
import Seller from "@/models/sellers";
import jwt from 'jsonwebtoken';
import dbConnect from "@/lib/mongodb";
import { cookies } from "next/headers";
// import { metadata } from "../layout";
import LoginPage from "../components/LoginPage";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Login | eComAdmin",
  description: "Login to eComAdmin",
};
export default async function Login() {
  const token = cookies().get('token')?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await dbConnect();
      const seller = await Seller.findById(decoded.sellerId);

      if (seller) {
        redirect(seller.role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (e) {
      // If token is bad, do nothing and let the page render LoginPage
    }
  }

  return <LoginPage />;
}