import mongoose, { mongo } from "mongoose";
import { stringifyCookie } from "next/dist/compiled/@edge-runtime/cookies";

const SellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type:string,
        required:true,
        minlength:8,
        select:false
    },
    
    email: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    }
    , isVerified: {
        type: Boolean,
        default: false
    }
},
    {
        timestamp: true
    })


const Seller = mongoose.model("Seller", SellerSchema) || mongoose.models.Seller
export default Seller