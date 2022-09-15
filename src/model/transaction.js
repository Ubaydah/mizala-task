import mongoose from "mongoose";

const { Schema } = mongoose;

const TransactionSchema = new Schema(
    {
        holderName: {
            type: String,
            required: true,
            ref: "RevenueHolder"
        },
        amount: {
            type: Number,
            min: 0,
            required: true,
            default: 0,
        },
        revenueId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Revenue"
        },
        status: {
            type: String,
            required: true,
            default: "success",

        }
    },
    {
        timestamps: true,
    },
);

const transaction = mongoose.model("Transaction", TransactionSchema)
export default transaction;