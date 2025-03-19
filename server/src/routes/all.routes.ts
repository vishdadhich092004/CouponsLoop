import express from "express";
import couponRoutes from "./coupon.routes";
import adminRoutes from "./admin.routes";

const router = express.Router();

router.use("/api/coupons", couponRoutes);
router.use("/api/admin", adminRoutes);

export default router;
