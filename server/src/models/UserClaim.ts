import mongoose from "mongoose";
import { IUserClaim } from "../shared/types";

const userClaimSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    lastClaimedAt: {
      type: Date,
      default: Date.now,
    },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
    },
  },
  { timestamps: true }
);

const UserClaim = mongoose.model<IUserClaim>("UserClaim", userClaimSchema);

export default UserClaim;
