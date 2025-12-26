'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/app/components/Sidebar'
import { MdEdit, MdDelete } from 'react-icons/md'

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    router.push('/dashboard/product')
  }

  /* ================= STATUS TOGGLE ================= */
  const toggleStatus = async () => {
    confirm('Are you sure you want to toggle Products status:')
    const newStatus = !product.isActive

    await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: newStatus }),
    })

    setProduct({ ...product, isActive: newStatus })
  }

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar menu="products" />
        <div className="flex-1 flex items-center justify-center">
          Loading product...
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menu="products" />

      <div className="flex-1 bg-[#F7F7F7] p-6 overflow-y-scroll">

        {/* BACK */}
        <button
          onClick={() => router.push('/dashboard/products')}
          className="text-sm underline mb-4"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-md p-6 flex gap-6">

          {/* IMAGE + ZOOM */}
          <div className="w-1/2">
            <div className="overflow-hidden rounded-md border group">
              <img
                src={product.images[activeImage]}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex gap-2 mt-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 object-cover rounded-md border cursor-pointer
                    ${index === activeImage ? 'ring-2 ring-black' : ''}
                  `}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="w-1/2 space-y-3">

            <h1 className="text-2xl font-semibold">{product.name}</h1>

            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>

            <p className="text-lg font-medium">
              Price: ${product.price}
            </p>

            {/* STATUS TOGGLE */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm">Status:</span>
              <button
                onClick={toggleStatus}
                className={`px-3 py-1 text-sm rounded-md ${
                  product.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>

            <p
              className={`text-sm ${
                product.stock > 0
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>

            <p className="text-sm text-gray-700 mt-3">
              {product.description}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  router.push(`/dashboard/product/edit/${id}`)
                }
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-md"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
