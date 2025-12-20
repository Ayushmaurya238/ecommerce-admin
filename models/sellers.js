import mongoose, { mongo } from "mongoose";

const SellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shop_name: {
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


const Seller = mongoose.model("Seller", ProductSchema) || mongoose.models.Product
export default Seller