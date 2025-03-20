import { CouponStatus } from "../../../server/src/shared/types";

export const titleCase = (str: CouponStatus) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
