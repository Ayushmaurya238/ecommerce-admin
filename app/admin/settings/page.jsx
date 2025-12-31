// app/admin/settings/page.jsx

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Seller from "@/models/sellers";
import { redirect } from "next/navigation";
import AdminSettings from "../components/AdminSettings";

export const metadata = {
  title: "Admin Settings | eComAdmin",
  description: "Admin account settings and security controls",
};

export default async function AdminSettingsPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 🔐 Admin-only access
  if (decoded.role !== "admin") {
    redirect("/dashboard");
  }

  await dbConnect();
  const admin = await Seller.findById(decoded.sellerId).lean();

  if (!admin) {
    redirect("/login");
  }

  return <AdminSettings admin={admin} />;
}
