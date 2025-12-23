// dashboard.jsx
'use client'
import React, { useState } from 'react'

import { GoDatabase } from "react-icons/go";
import { BiNotepad } from "react-icons/bi";
import { LuMessageCircleDashed } from "react-icons/lu";
import { GrMenu } from "react-icons/gr";
import Sidebar from './Sidebar';

const Dashboard = () => {
    
    return (
        // sidebar
        <>
            <div className=' flex h-screen overflow-hidden'>

                <Sidebar menu={'overview'}/>
                <div className='bg-[#F7F7F7] w-[85vw] h-screen px-2 py-5 overflow-y-scroll overflow-x-hidden'>
                    <form className="max-w-md ">
                        <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
                        <div className="relative rounded-md">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                            </div>
                            <input type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand outline-0 border-0 bg-white shadow-xs placeholder:text-body" placeholder="Search" required />
                            <button type="button" className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none bg-black">Search</button>
                        </div>
                    </form>
                    <div className='m-2 mb-0 text-2xl'>
                        Welcome Back, <span className='font-bold'>Ayush!</span>
                    </div>
                    <div className='mx-4 text-[12px] '>
                        Here's Your Current Sales Overview
                    </div>
                    <div className='flex gap-2 my-4 h-[18vh]'>

                        <div className='rounded-sm flex-1 bg-white  p-3 hover:bg-gray-100  '>
                            <div className='flex justify-between'>

                                <span>
                                    AVG. Order Value
                                </span>
                                <span className='p-1 rounded-md  bg-white text-black h-6'><GoDatabase height={32} width={32} /></span>
                            </div>
                            <div className='mt-5 ml-1'>
                                $77.5
                            </div>
                        </div>
                        <div className='rounded-sm flex-1  bg-white  p-3 hover:bg-gray-100  '>
                            <div className='flex justify-between'>

                                <span>
                                    Total Orders
                                </span>
                                <span className='p-1 rounded-md  bg-white text-black h-6'><BiNotepad height={32} width={32} /></span>
                            </div>
                            <div className='mt-5 ml-1'>
                                $2134
                            </div>
                        </div>
                        <div className='rounded-sm flex-1  bg-white  p-3 hover:bg-gray-100  '>
                            <div className='flex justify-between'>

                                <span>
                                    Lifetime Value
                                </span>
                                <span className='p-1 rounded-md  bg-white text-black h-6'><LuMessageCircleDashed height={32} width={32} /></span>
                            </div>
                            <div className='mt-5 ml-1'>
                                $653
                            </div>
                        </div>

                    </div>
                    <div className='flex gap-3 h-[40vh] my-3'>
                        <div className='bg-white p-3 w-[40.75vw] rounded-md'>
                            <div className='flex justify-between items-center'>
                                <span>Sales Overtime</span>

                                <div className=' '>
                                    <ul className='flex gap-2 items-center'>
                                        <li>Revenue</li>
                                        <li>Order</li>
                                        <li className='bg-[#F7F7F7] p-1 rounded-sm'><GrMenu /></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-3 w-[40.75vw] rounded-md'>
                            <div className='flex justify-between'>
                                <span>Top Selling Products</span>

                                <div className='bg-[#F7F7F7] p-1 rounded-sm '>
                                    See All Products

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='bg-white w-[83vw] min-h-[20vh] p-2 my-4 rounded-md'>
                        <div>Latest Orders</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

