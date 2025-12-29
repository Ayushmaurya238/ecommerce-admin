// app/dashboard/products/page.jsx
import Sidebar from '@/app/components/Sidebar'
import ProductTable from '@/app/components/ProductsTable'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Product from '@/models/product'
import dbConnect from '@/lib/mongodb'
import { redirect } from 'next/navigation'

export default async function ProductsPage() {
  await dbConnect()

  const token = cookies().get('token')?.value
  if (!token) redirect('/')

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    redirect('/')
  }

  const sellerId = decoded.sellerId
  
  const products = (await Product.find({ sellerId }).lean()).map(p => ({
    ...p,
    _id: p._id.toString(),
    sellerId: p.sellerId.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }))

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menu="products" />
      <ProductTable products={products} />
    </div>
  )
}
