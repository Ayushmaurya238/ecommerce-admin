import Seller from "@/models/sellers";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function POST(req) {
    const { email, password } = await req.json();
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