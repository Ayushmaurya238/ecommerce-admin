// app/dashboard/settings/page.jsx

import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import Seller from "@/models/sellers"
import dbConnect from "@/lib/mongodb"

import Settingpage from "@/app/components/Settingpage"
import { redirect } from "next/navigation"
export default async function SettingsPage() {
  const token = cookies().get('token')?.value
  if(!token){
    redirect('/');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  await dbConnect()
  const user = await Seller.findById(decoded.id).lean()

  return (
    <>
      <Settingpage user={user} />
    </>
  )
}