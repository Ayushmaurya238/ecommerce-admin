'use client'

import Image from "next/image";
import Dashboard from "./components/Dashboard";
export default function Home() {

  return (
    <>
      {/* <div className="navbar  h-15 text-black text-2xl flex items-center justify-between pl-10 pr-3">
        <div>EcomAdmin</div>
        <div className="flex ">
          <li>Sell Online</li>
        </div>
        <div className="flex gap-5 ">

          <button className=" h-10 ">Start Selling</button>
          <div>Login</div>
        </div>

      </div> */}

      <Dashboard/>

    </>
  );
}
