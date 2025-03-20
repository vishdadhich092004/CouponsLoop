import express from "express";
import {
  addCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponStatus,
  updateCoupon,
  claimHistory,
} from "../controllers/admin.coupons.controller";

const router = express.Router();

router.get("/", getAllCoupons);
router.get("/claim-history", claimHistory);
router.post("/", addCoupon);
router.get("/:id", getCouponById);
router.put("/:id", updateCoupon);
router.put("/:id/status", updateCouponStatus);

export default router;
