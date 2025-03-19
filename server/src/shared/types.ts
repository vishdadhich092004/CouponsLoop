export enum CouponStatus {
  AVAILABLE = "available",
  CLAIMED = "claimed",
  EXPIRED = "expired",
}

export interface ICoupon {
  _id: string;
  code: string;
  status: CouponStatus;
  claimedBy: string | null;
  claimedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserClaim {
  _id: string;
  ip: string;
  sessionId: string;
  lastClaimedAt: Date;
  couponId: string;
  createdAt: Date;
  updatedAt: Date;
}
