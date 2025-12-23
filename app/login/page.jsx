'use client'
import React from 'react'
import Link from 'next/link'
export default function login() {


  return (
    <div className='bg-[#F7F7F7] h-screen w-screen flex items-center'>
      <div className='rounded-md mx-auto h-[80vh] w-[80vw] bg-white'>
        <div className='text-3xl py-5 text-center font-extrabold'>
          eComAdmin
        </div>

        <hr className='w-[60vw] text-center mx-auto' />
        <div className='text-center text-2xl mt-2'>
          Login to manage your store
        </div>
        <form action="submit" method='post' className='mx-[20vw] my-6 flex flex-col' >
          {/* <label htmlFor="email">Email</label> */}
          <input type="email" id='email' required name='email' placeholder='Email' className='px-2 py-1 border-2 shadow-2xs rounded-md' />
          <br />
          {/* <label htmlFor="password">Password</label> */}
          <input type="password" id='password' required name='password ' placeholder='Password' className='px-2 py-1 border-2 shadow-2xs rounded-md' />
          <br />
          <Link href={'/forgottenpass'} className='text-blue-400 underline '>
            Forgot my password
          </Link>
          <button className='bg-black text-white p-2 rounded-md mt-2 ' type='submit'>Log in</button>
        </form>
      </div>
    </div>
  )
}


