// app/components/DashboardHeader.jsx
'use client'

import { useRouter } from "next/router";
import { MdOutlineLogout } from "react-icons/md"

export async function DashboardHeader({ sellerName }) {
    const router=useRouter();
    const LogoutfromAdmin = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        await fetch("/api/auth/logout", requestOptions);
        router.refresh();
    }
    return (
        <div className='flex items-center justify-between'>
            <h2 className="text-2xl mb-1">
                Welcome Back, <span className="font-bold">{sellerName}!</span>
            </h2>
            <div className='cursor-pointer hover:bg-gray-200 bg-white p-2  rounded-full' onClick={LogoutfromAdmin}>
                <MdOutlineLogout />
            </div>
        </div>
    )
}
