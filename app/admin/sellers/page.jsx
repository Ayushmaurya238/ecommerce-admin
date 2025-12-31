// app/admin/sellers/page.jsx
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import SellerTable from "../components/SellerTable";    

import dbConnect from "@/lib/mongodb";
import Seller from "@/models/sellers";

export const metadata = {
  title: "Sellers | eComAdmin",
  description: "Show all sellers at one page to manage them from one place ",
};
export default async function SellersPage() {
  await dbConnect();

  const sellers = await Seller.find({ role: "seller" }).lean();

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 bg-[#F7F7F7] px-6 py-5 overflow-y-scroll">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Sellers</h1>
          <p className="text-sm text-gray-500">
            Verify and manage seller accounts
          </p>
        </div>

        {/* TABLE */}
        <SellerTable sellers={sellers} />
      </div>
    </div>
  );
}
