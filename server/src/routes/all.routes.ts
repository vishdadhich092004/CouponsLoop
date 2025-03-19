import express from "express";
import couponRoutes from "./coupon.routes";
import adminRoutes from "./admin.routes";
import { protectAdmin } from "../middlewares/auth.middleware";
import adminCouponRoutes from "./admin.coupons.routes";
import sessionRoutes from "./session.routes";

const router = express.Router();

router.use("/coupons", couponRoutes);
router.use("/admin/coupons", protectAdmin, adminCouponRoutes);
router.use("/admin", adminRoutes);
router.use("/session", sessionRoutes);

export default router;
