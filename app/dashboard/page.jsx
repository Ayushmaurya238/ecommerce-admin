'use client'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

import { GoDatabase } from "react-icons/go"
import { BiNotepad } from "react-icons/bi"
import { LuMessageCircleDashed } from "react-icons/lu"
import { GrMenu } from "react-icons/gr"
import { TbLogout2 } from "react-icons/tb"
import { CgProfile } from "react-icons/cg"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { MdOutlineKeyboardControlKey } from "react-icons/md"
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  /* ---------------- state ---------------- */
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  // null = no search yet
  const [foundProducts, setFoundProducts] = useState(null)

  /* ---------------- handlers ---------------- */

  const handleBackToDashboard = () => {
    setFoundProducts(null)
    setSearch('')
  }
  const handleLogout = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const res = await fetch("/api/auth/logout", requestOptions);
    const data = await res.json();
    console.log(data.message);
    router.push('/');
  }
  const handleSearch = async (e) => {
    e.preventDefault()

    if (!filter) {
      alert('Please select a filter')
      return
    }

    const res = await fetch('/api/products/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search,
        filter
      }),
    })

    const data = await res.json()
    setFoundProducts(data) // array (may be empty)
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar menu="overview" />

      {/* MAIN CONTENT */}
      <div className="bg-[#F7F7F7] w-[85vw] h-screen px-4 py-5 overflow-y-scroll">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 relative">

            <input
              type="search"
              placeholder="Search products"
              className="w-[22vw] p-3 bg-white rounded-md shadow-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md cursor-pointer"
            >
              Search
            </button>

            {/* FILTER DROPDOWN */}
            <div className="relative">
              <div
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-sm">
                  {filter ?? 'Search by'}
                </span>
                {dropdownOpen
                  ? <MdOutlineKeyboardControlKey />
                  : <MdOutlineKeyboardArrowDown />
                }
              </div>

              {dropdownOpen && (
                <ul className="absolute top-10 right-0 bg-white shadow-md rounded-md text-sm">
                  <li
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => { setFilter('Product'); setDropdownOpen(false) }}
                  >
                    Product
                  </li>
                  <li
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => { setFilter('Category'); setDropdownOpen(false) }}
                  >
                    Category
                  </li>
                </ul>
              )}
            </div>
          </form>

          {/* PROFILE */}
          <div className="relative">
            <CgProfile
              size={32}
              className="cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md px-2 py-2">
                <ul className="text-sm">
                  <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded">
                    Account Settings
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded flex items-center gap-2" onClick={handleLogout}>
                    <TbLogout2 /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* BACK TO DASHBOARD BUTTON */}
        {foundProducts !== null && (
          <div className="mb-3 relative right-2 ">
            <button
              onClick={handleBackToDashboard}
              className="text-sm text-white cursor-pointer bg-black p-1 px-2 rounded-md"
            >
              ← Back to Dashboard
            </button>
          </div>
        )}

        {/* ================= SEARCH RESULTS ================= */}
        {foundProducts !== null && (
          <div className="bg-white rounded-md shadow-sm p-4 mb-6">

            {foundProducts.length === 0 ? (
              <p className="text-gray-500 text-center">
                No products found
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {foundProducts.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="py-2">{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ================= DASHBOARD OVERVIEW ================= */}
        {foundProducts === null && (
          <>
            <div className="text-2xl mb-1">
              Welcome Back, <span className="font-bold">Ayush!</span>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Here's your current sales overview
            </div>

            {/* STATS */}
            <div className="flex gap-3 mb-6 h-[18vh]">
              <div className="flex-1 bg-white p-4 rounded-md">
                <div className="flex justify-between">
                  <span>AVG. Order Value</span>
                  <GoDatabase />
                </div>
                <div className="mt-4 text-lg">$77.5</div>
              </div>

              <div className="flex-1 bg-white p-4 rounded-md">
                <div className="flex justify-between">
                  <span>Total Orders</span>
                  <BiNotepad />
                </div>
                <div className="mt-4 text-lg">2134</div>
              </div>

              <div className="flex-1 bg-white p-4 rounded-md">
                <div className="flex justify-between">
                  <span>Lifetime Value</span>
                  <LuMessageCircleDashed />
                </div>
                <div className="mt-4 text-lg">$653</div>
              </div>
            </div>

            {/* CHARTS */}
            <div className="flex gap-3 mb-6 h-[40vh]">
              <div className="flex-1 bg-white p-4 rounded-md">
                <div className="flex justify-between">
                  <span>Sales Over Time</span>
                  <GrMenu />
                </div>
              </div>

              <div className="flex-1 bg-white p-4 rounded-md">
                <div className="flex justify-between">
                  <span>Top Selling Products</span>
                  <span className="text-sm text-gray-500 cursor-pointer" onClick={() => { router.push('/dashboard/product') }}>
                    See All
                  </span>
                </div>
              </div>
            </div>

            {/* ORDERS */}
            <div className="bg-white rounded-md p-4">
              Latest Orders
            </div>
          </>
        )}

      </div>
    </div>
  )
}
