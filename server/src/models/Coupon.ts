import mongoose from "mongoose";
import { ICoupon } from "../shared/types";
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["available", "expired", "used"],
      default: "available",
    },
    claimedBy: {
      type: String,
      default: null,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model<ICoupon>("Coupon", couponSchema);

export default Coupon;
