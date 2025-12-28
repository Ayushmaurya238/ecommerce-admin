'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductDetailClient({ product }) {
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [isActive, setIsActive] = useState(product.isActive)

  /* ---------- STATUS TOGGLE ---------- */
  const toggleStatus = async () => {
    const res = await fetch(`/api/products/${product._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !isActive }),
    })

    if (res.ok) setIsActive(!isActive)
  }

  /* ---------- DELETE ---------- */
  const handleDelete = async () => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${product._id}`, { method: 'DELETE' })
    router.push('/dashboard/product')
  }

  return (
    <div className="flex-1 bg-[#F7F7F7] p-6 overflow-y-scroll">

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="text-sm underline mb-4"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-md p-6 flex gap-6">

        {/* IMAGES */}
        <div className="w-1/2">
          <div className="overflow-hidden rounded-md border group">
            <img
              src={product.images[activeImage]}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`h-16 w-16 object-cover rounded-md cursor-pointer border
                  ${i === activeImage ? 'ring-2 ring-black' : ''}
                `}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="w-1/2 space-y-3">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-lg font-medium">${product.price}</p>

          {/* STATUS */}
          <button
            onClick={toggleStatus}
            className={`px-3 py-1 rounded-md text-sm ${
              isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </button>

          <p className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          <p className="text-gray-700">{product.description}</p>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() =>
                router.push(`/dashboard/product/edit/${product._id}`)
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
  )
}
