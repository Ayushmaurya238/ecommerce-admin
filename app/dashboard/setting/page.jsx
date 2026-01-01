// app/dashboard/settings/page.jsx
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Seller from "@/models/sellers";
import dbConnect from "@/lib/mongodb";
import Settingpage from "@/app/components/Settingpage";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const token = cookies().get("token")?.value;

  if (!token) redirect("/login");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    redirect("/login");
  }

  if (decoded.role !== "seller") {
    redirect("/admin");
  }

  await dbConnect();
  // We use .lean() and convert _id to string to pass to Client Component
  const user = await Seller.findById(decoded.sellerId).select("-password").lean();

  if (!user) redirect("/login");

  // Format MongoDB object for safe client-side prop passing
  const serializedUser = {
    ...user,
    _id: user._id.toString(),
  };

  return <Settingpage user={serializedUser} />;
}