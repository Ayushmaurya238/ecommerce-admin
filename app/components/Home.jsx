'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardControlKey } from "react-icons/md"
import Image from "next/image";
export default function HomePage() {

  const router = useRouter();

  const [showdropdown, setshowdropdown] = useState(false);
  return (
    <>
      <div className="min-h-screen w-screen bg-[#F7F7F7] overflow-x-hidden" onClick={() => { setshowdropdown(false) }}>


        {/* navbar */}
        <div className="flex px-10 py-4 justify-between ">
          <div className="flex gap-10">

            <div className=" text-3xl cursor-pointer" onClick={() => { router.push('/') }}>
              eComAdmin
            </div>
            <div className="flex items-center gap-1 cursor-pointer" onClick={(e) => { setshowdropdown(!showdropdown); e.stopPropagation(); }}>
              <span className="">
                Sell Online
              </span>

              {
                showdropdown ? <MdOutlineKeyboardControlKey /> : <MdOutlineKeyboardArrowDown />
              }
            </div>
            {showdropdown && (
              <div className="absolute z-10 bg-white shadow-2xl  p-2 rounded-md left-56 top-14 " onClick={(e) => { e.stopPropagation(); }}>
                <ul className="flex flex-col gap-2 ">
                  <Link href={'/register'}>Create account</Link>
                  <Link href={'/help&support'}>Help & Support</Link>
                </ul>

              </div>

            )}
          </div>
          <div className="flex gap-4 items-center">
            <div className="cursor-pointer bg-white p-2 rounded-md shadow-2xl " onClick={() => { router.push('/login') }}>
              Login
            </div>
            <div className="cursor-pointer bg-black text-white p-2 rounded-md" onClick={() => { router.push('/register') }}>
              Start Selling
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100vw', height: '80vh', }}>
          <Image
            src="/homebacground.png" // Fixed spelling
            alt="background picture of home page"
            fill
            style={{ objectFit: 'cover' }} // Ensures the image covers the area
            priority // Good for hero images
            
          />
        </div>

        <div>

        </div>


      </div>




    </>
  );
}
