import mongoose from "mongoose";

const { Schema } = mongoose;

const RevenueSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        shareType: {
            type: String,
            required: true,
            enum: ["percentage", "fixed"]
        },
        productId: {
            type: String,
            ref: "Product",
            unique: true,
        },
        revenueCost: {
            type: Number,
            min: 0,
            required: true,
            default: 0,
        },
        productCost: {
            type: Number,
            min: 0,
            required: true,
            default: 0,
        },
        unsharedAmount: {
            type: Number,
            min: 0,
            required: true,
            default: 0,
        }
    },
    {
        timestamps: true,
    },
);


const revenue = mongoose.model("Revenue", RevenueSchema)
export default revenue;
