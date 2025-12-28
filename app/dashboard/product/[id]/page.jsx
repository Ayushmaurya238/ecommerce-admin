// app/dashboard/product/[id]/page.jsx
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/product'
import Sidebar from '@/app/components/Sidebar'
import ProductDetailClient from '@/app/components/ProductDetailClient'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }) {
  const { id } = params

  /* ---------- AUTH ---------- */
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) notFound()

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const sellerId = decoded.sellerId

  /* ---------- DB ---------- */
  await dbConnect()
  const product = await Product.findOne({ _id: id, sellerId }).lean()

  if (!product) notFound()

  /* ---------- SSR RENDER ---------- */
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menu="products" />

      {/* Client-only interactive UI */}
      <ProductDetailClient product={product} />
    </div>
  )
}
