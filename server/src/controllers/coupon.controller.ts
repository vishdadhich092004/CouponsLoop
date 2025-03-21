import { Request, Response } from "express";
import UserClaim from "../models/UserClaim";
import Coupon from "../models/Coupon";
import mongoose from "mongoose";
import { CouponStatus } from "../shared/types";
import { getClientIp } from "request-ip";
const COOLDOWN_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const claimCoupon = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Start a MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Vercel-specific IP handling
    const userIP =
      (req.headers["x-forwarded-for"] as string) ||
      (req.headers["x-real-ip"] as string) ||
      getClientIp(req);

    const sessionId = req.cookies.sessionId || "unknown";

    const normalizedIP = userIP?.split(",")[0]?.trim() || "unknown";

    if (!normalizedIP || normalizedIP === "unknown") {
      return res.status(400).json({
        message: "Unable to determine user IP",
      });
    }

    if (!sessionId || sessionId === "unknown") {
      return res.status(400).json({
        message: "Session ID is required",
      });
    }

    const existingClaim = await UserClaim.findOne({
      $or: [{ ip: normalizedIP }, { sessionId }],
      lastClaimedAt: { $gt: new Date(Date.now() - COOLDOWN_TIME) },
    }).populate("couponId");
    if (existingClaim) {
      return res.status(200).json({
        message:
          "You have claimed the coupon recently. Try again after 24 hours.",
        userClaim: existingClaim,
        coupon: existingClaim.couponId,
      });
    }
    const nextCoupon = await Coupon.findOneAndUpdate(
      { status: CouponStatus.AVAILABLE },
      {
        $set: {
          status: CouponStatus.CLAIMED,
          claimedBy: normalizedIP,
          claimedAt: new Date(),
        },
      },
      { new: true, session }
    );
    if (!nextCoupon) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "No available coupons",
      });
    }
    const userClaim = await UserClaim.create(
      [
        {
          ip: normalizedIP,
          sessionId,
          couponId: nextCoupon._id,
          claimedAt: new Date(),
          lastClaimedAt: new Date(),
        },
      ],
      { session }
    );
    await session.commitTransaction();
    res.status(200).json({
      message: "Coupon claimed successfully",
      userClaim,
      coupon: nextCoupon,
    });
  } catch (e) {
    await session.abortTransaction();
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    session.endSession();
  }
};
