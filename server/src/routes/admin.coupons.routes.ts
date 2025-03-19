import express from "express";
import {
  addCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponStatus,
  updateCoupon,
} from "../controllers/admin.coupons.controller";

const router = express.Router();

router.get("/", getAllCoupons);
router.get("/:id", getCouponById);
router.put("/:id", updateCoupon);
router.post("/", addCoupon);
router.put("/:id", updateCouponStatus);

export default router;
