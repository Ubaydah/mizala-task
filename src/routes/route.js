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
router.get("/revenue/:id/share", shareRevenue);
router.get("/holder/:name/total", getHolderRevenueAccumulated);

export default router;