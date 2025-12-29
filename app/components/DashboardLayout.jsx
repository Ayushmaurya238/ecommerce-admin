// app/components/DashboardLayout.jsx
'use client'

import Sidebar from './Sidebar'
import DashboardHeader from './DashboardHeader'
import MetricCard from './MetricCard'
import DashboardCharts from './DashboarCharts'

export default function DashboardLayout({ metrics, chartData }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menu="overview" />

      <div className="flex-1 bg-[#F7F7F7] px-6 py-4 overflow-y-scroll">
        <DashboardHeader />

        {/* METRICS */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {metrics.map((m, i) => (
            <MetricCard key={i} label={m.label} value={m.value} />
          ))}
        </div>

        {/* CHARTS */}
        <DashboardCharts chartData={chartData} />
      </div>
    </div>
  )
}
