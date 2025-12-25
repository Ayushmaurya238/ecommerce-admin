// app/not-found.js
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
export default function NotFound() {
    const path = usePathname();
    console.log("Path:", path);
    const pathcanbe = ['/dashboard/product', '/dashboard/customer', '/dashboard/orders', '/dashboard/shipment', '/dashboard/setting'];
    if (!pathcanbe.includes(path)) {
        return (
           <div className='bg-[#F7F7F7]  h-screen px-2 py-5 w-screen flex items-center justify-center'>
            <div className='flex flex-col p-10 items-center justify-center  bg-white shadow-2xl gap-2 rounded-md'>
                <span className='text-2xl font-semibold'>Page not Found</span>
                <Link className='bg-black text-white p-2 rounded-md' href={'/dashboard'}>Go to Dashboard</Link>
            </div>
        </div>
        )
    }

    return (
        <div className='bg-[#F7F7F7]  h-screen px-2 py-5 w-screen flex items-center justify-center'>
            <div className='flex flex-col p-10 items-center justify-center  bg-white shadow-2xl gap-2 rounded-md'>
                <span className='text-2xl font-semibold'>Service Unavailable</span>
                <Link className='bg-black text-white p-2 rounded-md' href={'/dashboard'}>Go to Dashboard</Link>
            </div>
        </div>

    )
}
