'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md"
import { useRouter } from 'next/navigation'

const Products = () => {
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    /* ================= FETCH PRODUCTS ================= */
    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products')
            const data = await res.json()
            setProducts(data)
        } catch (err) {
            console.error('Failed to fetch products', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    /* ================= DELETE PRODUCT ================= */
    const handleDelete = async (id) => {
        const confirmDelete = confirm('Are you sure you want to delete this product?')
        if (!confirmDelete) return

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                // remove from UI instantly
                setProducts(products.filter((p) => p._id !== id))
            } else {
                alert('Failed to delete product')
            }
        } catch (err) {
            console.error('Delete failed', err)
        }
    }

    /* ================= UI ================= */
    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar menu={'products'} />

            <div className='bg-[#F7F7F7] w-[85vw] h-screen px-2 py-5 overflow-y-scroll'>

                {/* HEADER */}
                <div className='flex items-center gap-3'>
                    <span className='text-3xl font-semibold'>Products</span>
                    <button
                        className='bg-black mx-8 text-white px-2 py-1 rounded-md'
                        onClick={() => router.push('/dashboard/product/new')}
                    >
                        Add New
                    </button>
                </div>

                {/* COUNTS */}
                <div className='text-[12px] my-3'>
                    <span>
                        All (<span className='text-green-500'>{products.length}</span>)
                    </span>
                </div>

                {/* TABLE */}
                <table className='w-[82vw] mx-2 bg-white rounded-md'>
                    <thead>
                        <tr className='flex justify-between items-center px-2 py-3 border-b'>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className='flex flex-col gap-1'>

                        {loading && (
                            <tr className='px-2 py-4 text-center text-gray-500'>
                                Loading products...
                            </tr>
                        )}

                        {!loading && products.length === 0 && (
                            <tr className='px-2 py-4 text-center text-gray-500'>
                                No products found
                            </tr>
                        )}

                        {!loading && products.map((product) => (
                            <tr
                                key={product._id}
                                className="flex justify-between items-center px-2 py-2 hover:bg-gray-50 cursor-pointer" onClick={()=>{router.push('/dashboard/product/'+product._id)}}
                            >
                                {/* NAME + IMAGE */}
                                <td className="flex items-center gap-3">
                                    {product.images?.length > 0 ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="h-10 w-10 rounded-md object-cover border"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 flex items-center justify-center border rounded-md text-gray-400">
                                            <FaRegImage />
                                        </div>
                                    )}
                                    <span className="truncate max-w-48">
                                        {product.name}
                                    </span>
                                </td>

                                <td>{product.category}</td>
                                <td>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                                <td>${product.price}</td>
                                <td className="text-green-600">Active</td>

                                <td className="flex items-center gap-2">
                                    <div
                                        className="hover:bg-gray-200 cursor-pointer p-1 rounded-md"
                                        onClick={() =>
                                            router.push(`/dashboard/product/edit/${product._id}`)
                                        }
                                    >
                                        <MdOutlineEdit />
                                    </div>
                                    <span>/</span>
                                    <div
                                        className="hover:bg-gray-200 cursor-pointer p-1 rounded-md"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <MdDeleteOutline />
                                    </div>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products
