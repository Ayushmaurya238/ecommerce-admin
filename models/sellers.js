import mongoose, { mongo } from "mongoose";
import { stringifyCookie } from "next/dist/compiled/@edge-runtime/cookies";

const SellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },

    email: {
        type: String,
        required: true
    },
    shopname: String,
    role: {
      type: String,
      enum: ["seller", "admin"],
      default: "seller",
    },

    isVerified: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })


const Seller =
    mongoose.models.Seller || mongoose.model("Seller", SellerSchema);
export default Seller