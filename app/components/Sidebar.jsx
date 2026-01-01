'use client'
import React from 'react'
import { BsGrid, BsBoxSeamFill } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { BiArchive } from "react-icons/bi";
import { FiCompass } from "react-icons/fi";
import { RiStore3Fill } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItem = (id, icon, label) => {
        // Match the folder name exactly: "setting"
        const href = id === 'overview' ? '/dashboard' : `/dashboard/${id}`;
        const active = pathname === href || (id !== 'overview' && pathname.startsWith(href));

        return (
            <Link href={href} key={id}>
                <li className={`py-2 flex gap-2 rounded-md items-center px-3 cursor-pointer transition-all
                    ${active ? "bg-black text-white shadow-md" : "hover:bg-gray-100 text-gray-600"}`}>
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm font-medium">{label}</span>
                </li>
            </Link>
        );
    };

    return (
        <div className='bg-white w-[15vw] min-w-[200px] border-r border-gray-100 px-4 h-screen flex flex-col shadow-sm'>
            <div className='py-8 px-2 text-xl font-black tracking-tighter cursor-pointer text-black' >
                <Link href='/dashboard'>eComAdmin</Link>
            </div>
            
            <ul className="flex flex-col gap-1 flex-1">
                {menuItem("overview", <BsGrid />, "Overview")}
                {menuItem("product", <BsBoxSeamFill />, "Products")}
                {menuItem("customer", <GoPeople />, "Customers")}
                {menuItem("orders", <BiArchive />, "Orders")}
                {menuItem("shipment", <FiCompass />, "Shipment")}
            </ul>

            <div className="pb-8 border-t border-gray-100 pt-4">
                {menuItem("setting", <RiStore3Fill />, "Account Setting")}
            </div>
        </div>
    )
}

export default Sidebar