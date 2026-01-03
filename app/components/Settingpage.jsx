'use client'

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useRouter } from 'next/navigation'
import { MdLock, MdEmail, MdStore, MdBadge, MdLogout } from 'react-icons/md'

const Settingpage = ({ user }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: "", message: "" })
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleLogOut = async () => {
    await fetch("/api/auth/logout", { method: "GET" })
    router.refresh()
    router.push('/login')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setStatus({ type: "", message: "" })

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match" })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus({ type: "success", message: "Password updated successfully!" })
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        setStatus({ type: "error", message: data.message || "Update failed" })
      }
    } catch (err) {
      setStatus({ type: "error", message: "An error occurred" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      <Sidebar />

      <main className="flex-1 p-10 overflow-x-auto">
        <div className="max-w-4xl mx-auto">
          
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seller Settings</h1>
              <p className="text-gray-500">Manage your shop profile and security</p>
            </div>
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition"
            >
              <MdLogout /> Logout
            </button>
          </header>

          <div className="grid gap-8">
            
            {/* PROFILE CARD */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b pb-4">
                <MdBadge className="text-gray-400" /> Account Profile
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shop Name</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <MdStore className="text-gray-400" />
                    <span className="font-medium text-gray-800">{user?.shopname}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Login Email</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <MdEmail className="text-gray-400" />
                    <span className="font-medium text-gray-800">{user?.email}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* PASSWORD CARD */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b pb-4">
                <MdLock className="text-gray-400" /> Security
              </h2>

              <form onSubmit={handlePasswordChange} className="max-w-md space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    required
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black outline-none transition"
                    />
                  </div>
                </div>

                {status.message && (
                  <div className={`p-4 rounded-lg text-sm font-medium ${
                    status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition disabled:opacity-50 shadow-lg shadow-gray-200"
                >
                  {loading ? "Updating..." : "Save New Password"}
                </button>
              </form>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}

export default Settingpage