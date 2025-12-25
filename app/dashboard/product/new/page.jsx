'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { productSchema } from '@/validators/product'

export default function AddProductForm() {
    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
    })

    const [images, setImages] = useState(['', ''])
    const [imageError, setImageError] = useState('')
    const [zoderror, setZoderror] = useState(null)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageChange = (index, value) => {
        const updated = [...images]
        updated[index] = value
        setImages(updated)
    }

    const addImageField = () => {
        if (images.length >= 5) {
            setImageError('Maximum 5 image URLs allowed')
            return
        }
        setImages([...images, ''])
        setImageError('')
    }

    const removeImageField = (index) => {
        if (images.length <= 2) {
            setImageError('Minimum 2 image URLs required')
            return
        }
        setImages(images.filter((_, i) => i !== index))
        setImageError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const filteredImages = images.filter((url) => url.trim() !== '')

        if (filteredImages.length < 2 || filteredImages.length > 5) {
            setImageError('Please provide between 2 and 5 image URLs')
            return
        }

        const payload = {
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
            images: filteredImages,
        }

        const parsed = productSchema.safeParse(payload)

        if (!parsed.success) {
            setZoderror(parsed.error.flatten().fieldErrors)
            return
        }

        setZoderror(null)
        console.log('FINAL PAYLOAD:', payload)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(payload);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const res = await fetch("/api/products", requestOptions);
        // console.log(res);
        const data = await res.json();
        console.log(data);
        if(res?.status===201){
            router.back();
            return;
        }
        if(!data.success){
            alert(data.message);
            return; 
        }
        
        // console.log(data);
    }

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

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md">

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                            placeholder="Nike Air Max"
                        />
                        {zoderror?.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {zoderror.name[0]}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder='Brief description of the product'
                            className="w-full px-4 py-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                        />
                        {zoderror?.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {zoderror.description[0]}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder='Shoes'
                            className="w-full px-4 py-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                        />
                        {zoderror?.category && (
                            <p className="text-red-500 text-sm mt-1">
                                {zoderror.category[0]}
                            </p>
                        )}
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder='199'
                                className="w-full px-4 py-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                            />
                            {zoderror?.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {zoderror.price[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder='25'
                                className="w-full px-4 py-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                            />
                            {zoderror?.stock && (
                                <p className="text-red-500 text-sm mt-1">
                                    {zoderror.stock[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Product Image URLs
                            <span className="text-xs text-gray-400 ml-1">(2–5)</span>
                        </label>

                        <div className="space-y-2">
                            {images.map((url, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) =>
                                            handleImageChange(index, e.target.value)
                                        }
                                        placeholder={`Image URL ${index + 1}`}
                                        className="flex-1 px-4 py-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="text-sm text-red-500"
                                    >
                                        Remove
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

                        <button
                            type="button"
                            onClick={addImageField}
                            className="mt-2 text-sm text-black underline"
                        >
                            + Add another image
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-sm rounded-md border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900 cursor-pointer"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
