import express from "express";
import {
  addCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponStatus,
} from "../controllers/admin.coupons.controller";

const router = express.Router();

router.get("/", getAllCoupons);
router.get("/:id", getCouponById);
router.post("/", addCoupon);
router.put("/:id", updateCouponStatus);

export default router;
