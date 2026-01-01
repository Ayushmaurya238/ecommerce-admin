import { cookies } from "next/headers";
import RegisterComponent from "../components/RegisterComponent";
import dbConnect from "@/lib/mongodb";
import jwt from 'jsonwebtoken';
import Seller from "@/models/sellers";
import { redirect } from "next/navigation";



export const metadata = {
  title: "Register | eComAdmin",
  description: "Register to become seller on eComAdmin",
};
export default async function Register() {
    await dbConnect();
    const token=cookies().get('token')?.value;
    if(!token){
        return (
        <RegisterComponent />
    )
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const sellerId=decoded.sellerId;
    const seller=await Seller.findOne({_id:sellerId});
    if(seller!=null){
        redirect('/dashboard');
    }
    console.log('getregis');
    return (
       
        <RegisterComponent />
    )

}
