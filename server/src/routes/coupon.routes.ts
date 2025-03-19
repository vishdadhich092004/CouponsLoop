import express from "express";
import { claimCoupon } from "../controllers/coupon.controller";

const router = express.Router();

router.post("/claim", claimCoupon);

export default router;
