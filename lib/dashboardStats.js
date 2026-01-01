import Product from "@/models/product";
import Seller from "@/models/sellers";
import dbConnect from "./mongodb";
import mongoose from "mongoose";
export async function getDashboardData(sellerId) {

    await dbConnect();
    // console.log(sellerId)
    const seller = await Seller.findOne({ _id:sellerId }).lean();
    // console.log(seller)
    const sellerName = seller?.name;
    
    // console.log(seller);
    const totalProducts = await Product.countDocuments({ sellerId });
    const activeProducts = await Product.countDocuments({ sellerId, isActive: true })
    const outOfStock = await Product.countDocuments({
        sellerId, stock: { $lte: 0 }
    })

    //dummy revenue 
    const revenue = 121423;
    // Dummy chart data
    const salesData = [
        { month: 'Jan', sales: 12000 },
        { month: 'Feb', sales: 18000 },
        { month: 'Mar', sales: 15000 },
        { month: 'Apr', sales: 22000 },
        { month: 'May', sales: 26000 },
        { month: 'Jun', sales: 32000 },
    ]
    const stockByCategory = await Product.aggregate([
        {
            $match: {
                sellerId: new mongoose.Types.ObjectId(sellerId),
            }
        },
        {
            $group: {
                _id: '$category',
                stock: { $sum: '$stock' },
            }

        },
        {
            $project: {
                category: '$_id',
                stock: 1,
                _id: 0,
            },

        },
    ])
    // console.log(stockByCategory);
    return {
        metrics: {
            totalProducts,
            activeProducts,
            outOfStock,
            revenue,
        },
        salesData,
        stockByCategory,
        sellerName
    }
}