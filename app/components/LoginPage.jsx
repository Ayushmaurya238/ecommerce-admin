'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { loginSchema } from '@/validators/auth'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors)
      return
    }

    setErrors(null)
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      alert(data.message || 'Login failed')
      return
    }

    // 🔥 ROLE-BASED REDIRECT (IMPORTANT)
    if (data.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen flex items-center justify-center">
      <div className="w-[420px] bg-white rounded-lg shadow-md p-8">

        <h1 className="text-3xl font-extrabold text-center mb-4">
          eComAdmin
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to manage your store
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email[0]}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>

            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password[0]}
              </p>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <Link href="/forgottenpass" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
