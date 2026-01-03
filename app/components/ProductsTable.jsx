'use client'

import { useState } from 'react'
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md'
import { FaRegImage } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { MdOutlineLogout } from 'react-icons/md'
export default function ProductTable({ products }) {
    const router = useRouter()
    const [items, setItems] = useState(products)

    const LogoutfromAdmin = async () => {
        confirm('Do you want to Logout');
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        await fetch("/api/auth/logout", requestOptions);
    }
    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setItems(items.filter((p) => p._id !== id))
        } else {
            alert('Failed to delete product')
        }
    }

    return (
        <div className="bg-[#F7F7F7] w-[85vw] h-screen px-4 py-5 overflow-y-scroll">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <div className='flex items-center gap-3'>

                    <span className="text-3xl font-semibold">Products</span>
                    <button
                        className="bg-black text-white px-3 py-1 rounded-md  cursor-pointer"
                        onClick={() => router.push('/dashboard/product/new')}
                    >
                        Add New
                    </button>
                </div>
                <div className='cursor-pointer hover:bg-gray-200 bg-white p-2  rounded-full' onClick={LogoutfromAdmin}>
                    <MdOutlineLogout />
                </div>

            </div>

            {/* COUNT */}
            <div className="text-xs mb-3">
                All (<span className="text-green-600">{items.length}</span>)
            </div>

            {/* TABLE */}
            <table className="w-full bg-white rounded-md text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="p-3 text-left">Product</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {items.length === 0 && (
                        <tr>
                            <td colSpan="6" className="p-4 text-center text-gray-500">
                                No products found
                            </td>
                        </tr>
                    )}

                    {items.map((product) => (
                        <tr
                            key={product._id}
                            className="border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() =>
                                router.push(`/dashboard/product/${product._id}`)
                            }
                        >
                            {/* IMAGE + NAME */}
                            <td className="p-3 flex items-center gap-3">
                                {product.images?.length ? (
                                    <img
                                        src={product.images[0]}
                                        className="h-10 w-10 object-cover rounded-md border"
                                    />
                                ) : (
                                    <div className="h-10 w-10 border rounded-md flex items-center justify-center text-gray-400">
                                        <FaRegImage />
                                    </div>
                                )}
                                <span className="truncate max-w-50">
                                    {product.name}
                                </span>
                            </td>

                            <td>{product.category}</td>
                            <td>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                            <td>${product.price}</td>

                            <td className={product.isActive ? 'text-green-600' : 'text-gray-400'}>
                                {product.isActive ? 'Active' : 'Inactive'}
                            </td>

                            {/* ACTIONS */}
                            <td
                                className="flex gap-2 items-center p-3"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="hover:bg-gray-200 p-1 rounded-md "
                                    onClick={() =>
                                        router.push(`/dashboard/product/edit/${product._id}`)
                                    }
                                >
                                    <MdOutlineEdit />
                                </button>

                                <button
                                    className="hover:bg-gray-200 p-1 rounded-md"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    <MdDeleteOutline />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
