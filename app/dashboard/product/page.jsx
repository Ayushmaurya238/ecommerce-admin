// app/dashboard/products/page.jsx
import Sidebar from '@/app/components/Sidebar'
import ProductTable from '@/app/components/ProductsTable'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Product from '@/models/product'
import dbConnect from '@/lib/mongodb'

export default async function ProductsPage() {
  await dbConnect()

  const token = cookies().get('token')?.value
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const sellerId = decoded.sellerId

  const products = await Product.find({ sellerId }).lean()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menu="products" />
      <ProductTable products={products} />
    </div>
  )
}
