export enum CouponStatus {
  AVAILABLE = "available",
  EXPIRED = "expired",
  USED = "used",
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
