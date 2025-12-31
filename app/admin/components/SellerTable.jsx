'use client'
import { useState } from "react";

export default function SellerTable({ sellers }) {
    const [data, setData] = useState(sellers);

    const toggleVerify = async (id, current) => {
        confirm('Are you sure You want to change the Verification status of the Seller');
        const res = await fetch(`/api/admin/sellers/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isVerified: !current }),
        });

        if (res.ok) {
            setData((prev) =>
                prev.map((s) =>
                    s._id === id ? { ...s, isVerified: !current } : s
                )
            );
        } else {
            alert("Failed to update seller");
        }
    };

    return (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">

            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                    <tr className="text-left">
                        <th className="p-3">Name</th>
                        <th>Email</th>
                        <th>Shop</th>
                        <th>Status</th>
                        <th className="text-right p-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((s) => (
                        <tr key={s._id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.shopname}</td>

                            <td>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${s.isVerified
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {s.isVerified ? "Verified" : "Pending"}
                                </span>
                            </td>

                            <td className="text-right p-3">
                                <button
                                    onClick={() => toggleVerify(s._id, s.isVerified)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium ${s.isVerified
                                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                                            : "bg-black text-white hover:bg-gray-900"
                                        }`}
                                >
                                    {s.isVerified ? "Unverify" : "Verify"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                    No sellers found
                </p>
            )}
        </div>
    );
}
