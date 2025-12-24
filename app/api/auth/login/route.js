
import Seller from "@/models/sellers";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { loginSchema } from "@/validators/auth";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
    await dbConnect();
    const body= await req.json();
    const parsed=loginSchema.safeParse(body);
    if(!parsed.success){
        return Response.json({
            error:parsed.error.flatten().fieldErrors,
        },{status:400});
    }
    const { email, password } =body;
    const seller = await Seller.findOne({ email }).select('+password');
    if (!seller) {
        return Response.json({ message: 'Invalid Credential' }, { status: 401 })
    }
    const matchpass = await bcrypt.compare(password, seller.password);
    if (!matchpass) {
        return Response.json({ message: 'Invalid Credential' }, { status: 401 });
    }
    const token = jwt.sign(
        { sellerId: seller._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    return new Response(
        JSON.stringify({ message: "Login successful" }),
        
        {
            status: 200,
            headers: {
                "Set-Cookie": `token=${token}; HttpOnly; Path=/; SameSite=Strict`,
            },
        }
    );

}