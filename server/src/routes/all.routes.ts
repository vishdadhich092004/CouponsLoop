import express from "express";
import couponRoutes from "./coupon.routes";

const router = express.Router();

router.use("/api/coupons", couponRoutes);

export default router;
