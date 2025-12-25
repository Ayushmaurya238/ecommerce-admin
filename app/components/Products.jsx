'use client'
import React from 'react'
import Sidebar from './Sidebar'
import { FaRegImage } from "react-icons/fa";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Products = () => {
    const router = useRouter();
    return (
        <div className=' flex h-screen overflow-hidden'>
            <Sidebar menu={'products'} />
            <div className='bg-[#F7F7F7] w-[85vw] h-screen px-2 py-5 overflow-y-scroll overflow-x-hidden'>
                <div className='flex items-center gap-3'>
                    <span className='text-3xl font-semibold'>
                        Products
                    </span>
                    <button className='bg-black mx-8 text-white px-2 py-1 rounded-md' onClick={()=>{router.push('/dashboard/product/new')}}>
                        Add New
                    </button>

                </div>
                <div className='text-[12px] my-3'>
                    <span>All (<span className='text-green-500'>31</span>) </span>
                    <span className='font-bold'>|</span>
                    <span> Published (<span className='text-green-500'>31</span>)</span>
                </div>
                <table className='w-[82vw] mx-2 bg-white rounded-md h-[60vh] '>
                    <thead className=''>
                        <tr className='flex justify-between items-center  px-2'>

                            <th>Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=' flex flex-col gap-1'>
                        <tr className='flex justify-between items-center  px-2'>
                            <td>Glasses</td>
                            <td>Fashion</td>
                            <td>in stock</td>
                            <td>$43</td>
                            <td>active</td>
                            <td>edit / delete</td>
                        </tr>
                        <tr className='flex justify-between items-center  px-2'>
                            <td>Glasses</td>
                            <td>Fashion</td>
                            <td>in stock</td>
                            <td>$43</td>
                            <td>active</td>
                            <td>edit / delete</td>
                        </tr>
                        <tr className='flex justify-between items-center  px-2'>
                            <td>Glasses</td>
                            <td>Fashion</td>
                            <td>in stock</td>
                            <td>$43</td>
                            <td>active</td>
                            <td>edit / delete</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products
