'use client'

import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar"; // Adjust path as needed
import { MdLock, MdEmail, MdBadge } from 'react-icons/md';

export default function AdminSettings({ admin }) {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: "error", message: "New passwords do not match" });
      return;
    }
    if (formData.newPassword.length < 8) {
      setStatus({ type: "error", message: "Password must be at least 8 characters" });
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setStatus({ type: "success", message: "Password updated successfully!" });
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setStatus({ type: "error", message: data.message || "Failed to update password" });
    }
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] ">
      <AdminSidebar />

      <main className="flex-1 p-10 overflow-x-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500">Manage your account and security preferences.</p>
          </header>

          <div className="grid gap-8">
            {/* ACCOUNT INFO CARD */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MdBadge className="text-gray-400" /> Account Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase mb-1">Email Address</label>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <MdEmail />
                    <span>{admin.email}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase mb-1">Admin Role</label>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest mt-2">
                    {admin.role}
                  </div>
                </div>
              </div>
            </section>

            {/* SECURITY CARD */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MdLock className="text-gray-400" /> Security & Password
              </h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none transition"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none transition"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none transition"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                {status.message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 mt-4"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}