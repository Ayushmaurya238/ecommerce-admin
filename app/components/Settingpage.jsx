
'use client'
import React from 'react'
import Sidebar from './Sidebar';

const Settingpage = ({ user }) => {
    const handleLogOut = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        await fetch("/api/auth/logout", requestOptions);
    }
    return (
        <div>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 bg-[#F7F7F7] p-6 w-full">
                    <div className="bg-white p-6 rounded-md w-full h-.5">
                        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-4 items-center">
                                <div className="text-xs uppercase text-gray-400 font-bold">Role</div>
                                <p className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold uppercase">
                                    {user?.role}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs uppercase text-gray-400 font-bold">Email</label>
                                <p className="font-medium">{user?.email}</p>
                            </div>
                            {user.role === 'seller' && (
                                <div>
                                    <label className="text-xs uppercase text-gray-400 font-bold">Shop Name</label>
                                    <p className="font-medium">{user.shopname}</p>
                                </div>
                            )}

                        </div>
                        <div className="mt-5 hover:bg-gray-100 p-1 rounded-md w-80" onClick={handleLogOut}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settingpage
