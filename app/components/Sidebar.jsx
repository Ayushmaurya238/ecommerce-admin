'use client'
import React from 'react'
import { BsGrid } from "react-icons/bs";
import { BsBoxSeamFill } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { BiArchive } from "react-icons/bi";
import { FiCompass } from "react-icons/fi";
import { RiStore3Fill } from "react-icons/ri";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
const Sidebar = () => {
    const path = usePathname();
    let menu = 'overview'
    // console.log(path);
    if (path.startsWith('/dashboard/product')) {
        menu = 'product';
    }
    else {
        menu = 'overview';
    }
    const [active, setActive] = useState(menu);
    const menuItem = (id, icon, label) => (
        <Link href={`/${id === 'overview' ? 'dashboard' : 'dashboard/' + id}`}>
            <li
                onClick={() => setActive(id)}
                className={`py-1 flex gap-2 rounded-md items-center px-1 cursor-pointer
        ${active === id ? "bg-black text-white" : "hover:bg-gray-100"}
      `}
            >
                <span>{icon}</span>
                {label}
            </li>
        </Link>
    );
    return (
        <div className='bg-white w-[15vw] px-2 h-screen overflow-visible'>
            <div className='py-3 mx-1 text-xl text-shadow-2xs cursor-pointer' >
                <Link href={'/'}>
                    eComAdmin
                </Link>
            </div>
            <ul className="flex flex-col gap-1">
                {menuItem("overview", <BsGrid />, "Overview")}
                {menuItem("product", <BsBoxSeamFill />, "Product")}
                {menuItem("customer", <GoPeople />, "Customer")}
                {menuItem("orders", <BiArchive />, "Orders")}
                {menuItem("shipment", <FiCompass />, "Shipment")}
                {menuItem("setting", <RiStore3Fill />, "Store Setting")}
            </ul>
        </div>
    )
}

export default Sidebar
