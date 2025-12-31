// /api/auth/admin-register/route.js
import Seller from "@/models/sellers";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
    await dbConnect();

    // 1. Verify that the requester is an ADMIN
    const token = req.cookies.get("token")?.value;
    if (!token) return Response.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return Response.json({ message: "Only admins can create other admins" }, { status: 403 });
        }

        const data = await req.json();
        const hashedpass = await bcrypt.hash(data.password, 10);

        const newAdmin = await Seller.create({
            name: data.name,
            email: data.email,
            password: hashedpass,
            role: 'admin',
            // shopname is not required for admins per your schema logic
        });

        return Response.json({ success: true, message: "New Admin onboarded" });
    } catch (err) {
        return Response.json({ message: "Invalid token or session expired" }, { status: 401 });
    }
}