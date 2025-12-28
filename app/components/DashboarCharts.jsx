'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

// import { salesData } from '@/lib/dashboardDummydata'
// import { stockByCategory } from '@/lib/dashboardDummydata'

export default function DashboardCharts({salesData,stockByCategory}) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">

      {/* SALES OVER TIME */}
      <div className="bg-white p-4 rounded-md">
        <h3 className="text-sm font-medium mb-3">Sales Over Time</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#000"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* STOCK BY CATEGORY */}
      <div className="bg-white p-4 rounded-md">
        <h3 className="text-sm font-medium mb-3">Stock by Category</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={stockByCategory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
