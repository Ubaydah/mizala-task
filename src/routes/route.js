import { Router } from "express";
import revenueController from "../controller/revenue.js";

const {
    addRevenue,
    addRevenueHolder,
    shareRevenue,
    getHolderRevenueAccumulated,
} = revenueController;

const router = Router();

router.post("/revenue", addRevenue);
router.post("/revenue/holder", addRevenueHolder);
router.get("/revenue/share/:id", shareRevenue);
router.get("/revenue/total/:name", getHolderRevenueAccumulated);

export default router;