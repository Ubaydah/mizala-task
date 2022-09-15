import mongoose from "mongoose";

const { Schema } = mongoose;

const RevenueHolderSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        revenueId: {
            type: Schema.Types.ObjectId,
            ref: "Revenue",
            required: true,
        },
        share: {
            type: Number,
            min: 0,
            required: true,
            default: 0,
        },

    },
    {
        timestamps: true,
    },
);

const holder = mongoose.model("RevenueHolder", RevenueHolderSchema)
export default holder;