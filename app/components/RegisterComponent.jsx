'use client'

import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { registerSchema } from '@/validators/auth';
export default function RegisterComponent() {
    const [password, setPassword] = useState('');
    const [confirmedpassword, setConfirmedpassword] = useState('');
    const [email, setEmail] = useState('');
    const [shopname, setShopname] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [error, seterror] = useState(null);
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmedpassword) {
            alert("Passwords do not match");
            return;
        }
        const parsed = registerSchema.safeParse({
            name: firstname + ' ' + lastname,
            password,
            email,
            shopname: shopname, // ✅ FIXED
        });

        if (!parsed.success) {
            console.log(parsed.error.flatten().fieldErrors);
            seterror(parsed.error.flatten().fieldErrors);
            return;
        }

        seterror(null);
        //api call to register the seller
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": firstname + ' ' + lastname,
            "password": password,
            "email": email,
            "shopname": shopname
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const res =await fetch("/api/auth/register", requestOptions);
        const data = await res.json();
        console.log(data.success);
        if(!data.success){
            alert(data.message);
        }
        if (data.success) {
            window.location.href = '/dashboard';
        }

    }
    return (
        <div className='w-screen min-h-screen bg-[#F7F7F7] flex justify-center py-10 '>
            <div className='bg-white mx-auto h-[90vh] w-[80vw] rounded-md shadow-lg flex flex-col items-center '>

                <div className='text-3xl font-extrabold shadow-2xl my-2'>
                    eComAdmin
                </div>
                <hr className='w-[60vw]' />
                <div className='text-2xl mt-1 '>
                    Create Your Seller Account
                </div>

                <form onSubmit={handlesubmit} className='flex flex-col my-4 w-[50vw] gap-4 relative left-[2.5vw]'>
                    <div className='flex justify-between gap-4'>
                        <div className='w-1/2'>

                            <label htmlFor="firstName " className='block'>First Name</label>
                            <input className='w-3/4 px-2 py-1 border rounded-md' type="text" placeholder='Enter Your First Name' value={firstname} onChange={(e) => { setFirstname(e.target.value) }} />
                        </div>
                        <div className='w-1/2'  >

                            <label htmlFor="lastName" className='block'>Last Name</label>
                            <input className='w-3/4 px-2 py-1 border rounded-md' type="text" placeholder='Enter Your Last Name' value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                        </div>
                    </div>
                    {
                        error?.name && (
                            <span className="text-red-500 text-sm">
                                {error.name[0]}
                            </span>
                        )
                    }
                    <div>
                        <label htmlFor="Email " className='block'>Email Address</label>
                        <input type="email" placeholder='Enter Your Email' className='w-[43.75vw] px-2 py-1 border rounded-md' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    {
                        error?.email && (
                            <span className="text-red-500 text-sm">
                                {error.email[0]}
                            </span>
                        )
                    }
                    <div className='flex justify-between gap-4 '>
                        <div className='w-1/2'>

                            <label htmlFor="password " className='block'>Password</label>
                            <input className='w-3/4 px-2 py-1 border rounded-md' type="password" placeholder='Enter the Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className='w-1/2'>

                            <label htmlFor="password " className='block'>Confirm Password</label>
                            <input className='px-2 py-1 border rounded-md w-3/4' type="password" placeholder='Confirm Password' value={confirmedpassword} onChange={(e) => { setConfirmedpassword(e.target.value) }} />
                        </div>
                        {
                            error?.password && (
                                <span className="text-red-500 text-sm">
                                    {error.password[0]}
                                </span>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="shop" className='block'>Shop Name</label>
                        <input type="text" placeholder='Enter Your Shop Name' className='w-[43.75vw] px-2 py-1 border  rounded-md ' value={shopname} onChange={(e) => { setShopname(e.target.value) }} />
                    </div>
                    {
                        error?.shopName && (
                            <span className="text-red-500 text-sm">
                                {error.shopName[0]}
                            </span>
                        )
                    }
                    {/* Shop Name */}
                    <button type='submit' className='bg-black text-white p-2 rounded-md mt-2 cursor-pointer w-[43.75vw]'>Register</button>
                </form>
                <div className='flex justify-center relative gap-2'>
                    <span>

                        Already a seller ?{'   '}
                    </span>
                    <Link href="/login" className="text-blue-400 underline">
                        Login
                    </Link>
                </div>
            </div>

        </div>
    )
}
