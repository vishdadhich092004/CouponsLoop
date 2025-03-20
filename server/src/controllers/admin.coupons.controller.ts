import { Request, Response } from "express";
import Coupon from "../models/Coupon";
import { CouponStatus } from "../shared/types";
import { faker } from "@faker-js/faker";
import UserClaim from "../models/UserClaim";

export const getAllCoupons = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const coupons = await Coupon.find();
    if (!coupons) return res.status(404).json({ message: "No coupons found" });
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCouponById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCoupon = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.body;
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon)
      return res.status(400).json({ message: "Coupon already exists" });
    const newCoupon = new Coupon({
      code: code?.toUpperCase() || faker.string.alphanumeric(6).toUpperCase(),
      status: CouponStatus.AVAILABLE,
      claimedAt: null,
      claimedBy: null,
    });
    await newCoupon.save();
    res
      .status(201)
      .json({ message: "Coupon added successfully", coupon: newCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCouponStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });
    if (
      status !== CouponStatus.AVAILABLE &&
      status !== CouponStatus.CLAIMED &&
      status !== CouponStatus.EXPIRED
    )
      return res.status(400).json({
        message: `Invalid status. Must be ${CouponStatus.AVAILABLE}, ${CouponStatus.CLAIMED}, or ${CouponStatus.EXPIRED}`,
      });
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res
      .status(200)
      .json({ message: "Coupon status updated successfully", coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCoupon = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { code } = req.body;
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { code: code.toUpperCase() },
      { new: true }
    );
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.status(200).json({ message: "Coupon updated successfully", coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const claimHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const claims = await UserClaim.find({});
    res.status(200).json(claims);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
