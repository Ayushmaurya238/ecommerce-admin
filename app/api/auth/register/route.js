import Seller from "@/models/sellers";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { registerSchema } from "@/validators/auth";
import dbConnect from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    // console.log('got here')
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
        return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const hashedpass = await bcrypt.hash(data.password, 10);
    // console.log(data.email);
    const seller = await Seller.findOne({ email: data.email });
    // console.log(seller);
    if (seller !== null) {
        console.log('seller already created');
        return Response.json({ success: false, message: 'Seller already existed !' }, { status: 400 });
    }

    else {
        const newseller = await Seller.create({
            name: data.name,
            password: hashedpass,
            email: data.email,
            role:'seller',
            shopname: data.shopname
        });
        if(newseller){

            const token = jwt.sign(
                { id: newseller._id, email: newseller.email },
                process.env.JWT_SECRET, 
                { expiresIn: '7d' } 
            );
            
            return Response.json({ success: true, message: 'New seller created' }, {
                status: 200,
                headers: {
                    "Set-Cookie": `token=${token}; HttpOnly; Path=/; SameSite=Strict`,
                },
            });
        }
    }
}