export default function MetricCard({ label, value, icon }) {
  return (
    <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{label}</span>
        {icon}
      </div>
      <div className="mt-4 text-xl font-semibold">
        {value}
      </div>
    </div>
  )
}
