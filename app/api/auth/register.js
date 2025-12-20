import Seller from "@/models/sellers";
import bcrypt from 'bcryptjs'
import clientPromise from "@/lib/mongodb";
export default async function POST(req){
    const {name,phone_no,email,password,shopName}=await req.json();
    let hashedpass=await bcrypt.hash(password,10);
    const client=await clientPromise();
    const db=client.db('ecommerceDB');
    let sellers=db.collection('seller');
    let seller=sellers.findOne({email:email});
    if (seller) {
        return Response.json({ success: false, message: 'Seller already existed !' })
    }
    else {
        sellers.insertOne({
            name: data.name,
            phone_no: data.phone_no,
            password:hashedpass,
            email: data.email,
            shop_name: data.shop_name,
        });
        return Response.json({ success: true, message: 'New seller created' });
    }
    
}