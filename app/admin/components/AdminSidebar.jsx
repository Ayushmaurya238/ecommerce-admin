'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MdDashboard, MdPeople, MdLogout } from 'react-icons/md'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/auth/logout')
    router.push('/login')
  }

  const link = (href, label, Icon) => (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
        pathname === href
          ? 'bg-black text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  )

  return (
    <aside className="w-[15vw] min-w-55 h-screen bg-white border-r px-4 py-5 flex flex-col">

      <div className="mb-8">
        <h2 className="text-lg font-extrabold">eComAdmin</h2>
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {link('/admin', 'Overview', MdDashboard)}
        {link('/admin/sellers', 'Sellers', MdPeople)}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-2 text-sm text-red-600 px-3 py-2 rounded-md hover:bg-red-50"
      >
        <MdLogout size={18} />
        Logout
      </button>
    </aside>
  )
}
