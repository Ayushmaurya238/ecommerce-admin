'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { loginSchema } from '@/validators/auth'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const [showpass, setShowpass] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); // 
    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }


    setErrors(null);

    // 👉 Call login API here (later)
    console.log("Validation passed");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "password": password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const res = await fetch("/api/auth/login", requestOptions)
    const data = await res.json();
    // console.log(data);
    if (data.message === 'Login successful') {
      window.location.href = '/dashboard';
    }
    // console.log(await res.json());
  };

  return (
    <div className="bg-[#F7F7F7] h-screen w-screen flex items-center">
      <div className="rounded-md mx-auto h-[80vh] w-[80vw] bg-white">

        <div className="text-3xl py-5 text-center font-extrabold">
          eComAdmin
        </div>

        <hr className="w-[60vw] mx-auto" />

        <div className="text-center text-2xl mt-2">
          Login to manage your store
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-[20vw] my-6 flex flex-col"
        >
          <input
            type="email"
            placeholder="Email"
            className="px-2 py-1 border-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors?.email && (
            <span className="text-red-500 text-sm">
              {errors.email[0]}
            </span>
          )}

          <br />


          <input
            type={showpass ? "text" : "password"}
            placeholder="Password"
            className="px-2 py-1 border-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => { setShowpass(!showpass) }}>
            {!showpass ?
              <FaEye className="relative left-[94%]  bottom-7 cursor-pointer" height={60} />
              :
              <FaEyeSlash className="relative left-[94%]  bottom-7 cursor-pointer" height={60} />
            }
          </span>


          {errors?.password && (
            <span className="text-red-500 text-sm">
              {errors.password[0]}
            </span>
          )}

          <br />

          <Link href="/forgottenpass" className="text-blue-400 underline relative bottom-7">
            Forgot my password
          </Link>

          <button
            className="bg-black text-white p-2 rounded-md mt-2 relative bottom-7 cursor-pointer"
            type="submit"
          >
            Log in
          </button>
        </form>

        <div className='flex justify-center relative bottom-7 gap-2'>
          <span>

            Don't have an account?{'   '}
          </span>
          <Link href="/register" className="text-blue-400 underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
