'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { productSchema } from '@/validators/product'
import ImageUploader from '@/app/components/ImageUploader'

export default function NewProduct() {
  const router = useRouter()

  /* ---------------- form state ---------------- */
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  })

  const [images, setImages] = useState([])
  const [imageError, setImageError] = useState('')
  const [zoderror, setZoderror] = useState(null)
  const [loading, setLoading] = useState(false)
  /* ---------------- helpers ---------------- */
  useEffect(() => {
    if (images.length > 5) {
      setImages(images.slice(0, 5))
    }
  }, [images])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  /* ---------------- submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (images.length < 2 || images.length > 5) {
      setImageError('Please upload between 2 and 5 images')
      return
    }

    setImageError('')

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images,
    }

    const parsed = productSchema.safeParse(payload)

    if (!parsed.success) {
      setZoderror(parsed.error.flatten().fieldErrors)
      return
    }
    setLoading(true)
    setZoderror(null)

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setLoading(false);
    const data = await res.json()

    if (!res.ok) {
      alert(data.message || 'Failed to create product')
      return
    }

    router.push('/dashboard/product')
    router.refresh()
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F7F7F7] py-10">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <p className="text-sm text-gray-500">
            Enter product details to list it in your store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Product Name */}
          <div>
            <label className="block text-sm mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 rounded-md"
            />
            {zoderror?.name && (
              <p className="text-red-500 text-sm">{zoderror.name[0]}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 rounded-md"
            />
            {zoderror?.description && (
              <p className="text-red-500 text-sm">{zoderror.description[0]}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 rounded-md"
            />
            {zoderror?.category && (
              <p className="text-red-500 text-sm">{zoderror.category[0]}</p>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 rounded-md"
              />
              {zoderror?.price && (
                <p className="text-red-500 text-sm">{zoderror.price[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 rounded-md"
              />
              {zoderror?.stock && (
                <p className="text-red-500 text-sm">{zoderror.stock[0]}</p>
              )}
            </div>
          </div>

          {/* IMAGE UPLOADER */}
          <div>
            <label className="block text-sm mb-1">
              Product Images <span className="text-xs text-gray-400">(2–5)</span>
            </label>

            <ImageUploader images={images} setImages={setImages} />


            {/* Preview */}
            <div className="flex  gap-2 mt-3">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, index) => index !== i))}
                    className="absolute -top-2 right-[-2px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
            )}

            {zoderror?.images && (
              <p className="text-red-500 text-sm mt-1">
                {zoderror.images[0]}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading?'Adding...':'Add Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
