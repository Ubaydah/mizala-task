import { Revenue, Holder, Transaction } from "../model/index.js";

export default {
    addRevenue: async (request, response) => {
        const data = request.body;
        const revenue = await Revenue.create(data);

        return response.status(201).json({
            status: "success",
            message: "revenue created successfully",
            data: revenue,
        })

    },

    addRevenueHolder: async (request, response) => {
        const data = request.body;
        const revenue = await Revenue.findById(data.revenueId);
        if (!revenue) {
            return response.status(400).json({
                status: "fail",
                message: "Revenue not found"
            })
        }
        const holderShares = await Holder.aggregate(
            [
                { $match: { revenueId: revenue._id } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$share" }
                    }
                }
            ]
        )

        var totalShare;
        if (holderShares.length == 0) {
            totalShare = 0;
        } else {
            totalShare = holderShares[0]["total"]
        }
        const expectedShare = totalShare + data.share
        console.log(expectedShare)
        if (revenue.shareType == "fixed" & expectedShare > revenue.revenueCost) {
            return response.status(400).json({
                status: "fail",
                message: "holder cannot be added to this revenue"
            })

        }
        if (revenue.shareType == "percentage" & expectedShare > 100) {
            return response.status(400).json({
                status: "fail",
                message: "holder cannot be added to this revenue"
            })

        }
        const holder = await Holder.create(data);
        return response.status(201).json({
            status: "success",
            message: "revenue holder created successfully",
            data: holder,
        })
    },

    shareRevenue: async (request, response) => {
        const { id } = request.params;
        const revenue = await Revenue.findById(id);
        if (!revenue) {
            return response.status(400).json({
                status: "fail",
                message: "Revenue not found"
            })
        }

        const holders = await Holder.aggregate(
            [
                { $match: { revenueId: revenue._id } },
            ]
        );
        if (holders.length == 0) {
            return response.status(200).json({
                status: "fail",
                message: "no holders for this revenue"
            })
        }

        const revenueCost = revenue.revenueCost
        if (revenue.shareType == "percentage") {
            holders.forEach((holder) => {
                const share = holder.share
                const holderShare = share / 100 * revenueCost
                const data = {
                    holderName: holder.name,
                    amount: holderShare,
                    revenueId: revenue._id,
                    status: "success"
                }
                Transaction.create(data)
            })
        } else {
            holders.forEach((holder) => {
                const share = holder.share
                const data = {
                    holderName: holder.name,
                    amount: share,
                    revenueId: revenue._id,
                    status: "success"
                }
                Transaction.create(data)

            })

        }
        return response.status(200).json({
            status: "success",
            message: "revenue shared successfully",
        })

    },

    getHolderRevenueAccumulated: async (request, response) => {
        const { name } = request.params;

        const holder = await Holder.findOne({ name: name })
        if (!holder) {
            return response.status(200).json({
                status: "fail",
                message: "no holders with this name"
            })
        }
        const totalTransactions = await Transaction.aggregate(
            [
                { $match: { holderName: name } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" }
                    }
                }
            ]
        )

        var total;
        if (totalTransactions.length == 0) {
            total = 0;
        } else {
            total = totalTransactions[0]["total"]
        }

        return response.status(200).json({
            status: "success",
            message: "holder revenue accumulated successfully",
            accumulatedRevenue: total
        })

    },

};