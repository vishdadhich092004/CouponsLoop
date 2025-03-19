import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Coupon from "../models/Coupon";
import { CouponStatus } from "../shared/types";
dotenv.config();

const generateCoupons = async (count: number) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");

    const coupons = Array.from({ length: count }).map(() => ({
      // Random Coupon Codes
      code: faker.string.alphanumeric(10).toUpperCase(),
      status: CouponStatus.AVAILABLE,
    }));

    await Coupon.insertMany(coupons);
    console.log(`${count} coupons inserted successfully.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting coupons:", error);
    mongoose.connection.close();
  }
};

// Number of coupons to generate
generateCoupons(50);
