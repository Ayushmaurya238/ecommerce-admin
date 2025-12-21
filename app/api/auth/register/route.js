import Seller from "@/models/sellers";
import bcrypt from 'bcryptjs'
import clientPromise from "@/lib/mongodb";
export default async function POST(req) {
    const { name, phone_no, email, password, shopName } = await req.json();
    let hashedpass = await bcrypt.hash(password, 10);

    const seller = Seller.findOne({ email: email });
    if (seller) {
        return Response.json({ success: false, message: 'Seller already existed !' })
    }
    else {
        Seller.Create({
            name: data.name,
            phone_no: data.phone_no,
            password: hashedpass,
            email: data.email,
            shop_name: data.shop_name,
        });
        return Response.json({ success: true, message: 'New seller created' },{status:200});
    }

}