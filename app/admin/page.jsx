// app/admin/page.jsx
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import dbConnect from "@/lib/mongodb";
import Seller from "@/models/sellers";

export default async function AdminDashboard() {
  await dbConnect();

  const totalSellers = await Seller.countDocuments({ role: "seller" });
  const verifiedSellers = await Seller.countDocuments({
    role: "seller",
    isVerified: true,
  });
  const pendingSellers = totalSellers - verifiedSellers;

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 bg-[#F7F7F7] px-6 py-5 overflow-y-scroll">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Platform overview & seller management
          </p>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text-sm text-gray-500">Total Sellers</p>
            <p className="text-2xl font-semibold mt-1">{totalSellers}</p>
          </div>

          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text-sm text-gray-500">Verified Sellers</p>
            <p className="text-2xl font-semibold mt-1 text-green-600">
              {verifiedSellers}
            </p>
          </div>

          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text-sm text-gray-500">Pending Verification</p>
            <p className="text-2xl font-semibold mt-1 text-orange-500">
              {pendingSellers}
            </p>
          </div>
        </div>

        {/* ADMIN CAPABILITIES */}
        <div className="bg-white rounded-md p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">
            Admin Capabilities
          </h2>

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>View and manage all sellers</li>
            <li>Verify or suspend seller accounts</li>
            <li>Monitor platform-wide metrics</li>
            <li>Control access to admin-only routes</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
