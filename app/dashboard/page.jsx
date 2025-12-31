import Sidebar from '../components/Sidebar'
import MetricCard from '../components/MetricCard'
import DashboardCharts from '../components/DashboarCharts'
import { getDashboardData } from '@/lib/dashboardStats'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { redirect } from 'next/navigation';
import { DashboardHeader } from '../components/DashboardHeader';

export const metadata = {
  title: "Dashboard | eComAdmin",
  description: "To review your products sales analysis",
};
export default async function DashboardPage() {

  /* -------- AUTH (SERVER) -------- */
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/')
  }
  

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // console.log(decoded.role)
  const sellerId = decoded.sellerId;
  // console.log(sellerId);

  /* -------- SERVER DATA FETCH -------- */
  const { metrics, salesData, stockByCategory, sellerName } =
    await getDashboardData(sellerId)
  // console.log(sellerName)
  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar menu="overview" />

      <div className="bg-[#F7F7F7] w-[85vw] h-screen px-4 py-5 overflow-y-scroll">
        <DashboardHeader sellerName={sellerName} />
        <p className="text-sm text-gray-500 mb-4">
          Here's your current sales overview
        </p>

        {/* METRICS */}
        <div className="flex gap-4 mb-6">
          <MetricCard label="Total Products" value={metrics.totalProducts} />
          <MetricCard label="Active Products" value={metrics.activeProducts} />
          <MetricCard label="Out of Stock" value={metrics.outOfStock} />
          <MetricCard label="Revenue" value={`$${metrics.revenue}`} />
        </div>

        {/* CHARTS */}
        <DashboardCharts
          salesData={salesData}
          stockByCategory={stockByCategory}
        />

      </div>
    </div>
  )
}
