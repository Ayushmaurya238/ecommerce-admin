// app/components/DashboardHeader.jsx
'use client'

import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md"

export async function DashboardHeader({ sellerName }) {
    const router=useRouter();
    const LogoutfromAdmin = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const res=await fetch("/api/auth/logout", requestOptions);
        if(res.ok){
            router.push('/')
        }
        else{
            alert('Unable to logout')
        }
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
