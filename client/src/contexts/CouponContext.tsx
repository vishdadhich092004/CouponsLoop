import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ICoupon, IUserClaim } from "../../../server/src/shared/types";

interface CouponContextType {
  couponData: {
    coupon: ICoupon;
    message: string;
    userClaim: IUserClaim[];
  } | null;
  setCouponData: (
    data: {
      coupon: ICoupon;
      message: string;
      userClaim: IUserClaim[];
    } | null
  ) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [couponData, setCouponData] = useState<CouponContextType["couponData"]>(
    () => {
      try {
        // Initialize from localStorage on component mount
        const savedCoupon = localStorage.getItem("couponData");
        return savedCoupon ? JSON.parse(savedCoupon) : null;
      } catch (error) {
        // If there's any error parsing the JSON, return null
        console.warn("Error parsing coupon data from localStorage:", error);
        localStorage.removeItem("couponData"); // Clean up invalid data
        return null;
      }
    }
  );

  // Save to localStorage whenever couponData changes
  useEffect(() => {
    if (couponData) {
      localStorage.setItem("couponData", JSON.stringify(couponData));
    } else {
      localStorage.removeItem("couponData");
    }
  }, [couponData]);

  return (
    <CouponContext.Provider value={{ couponData, setCouponData }}>
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error("useCoupon must be used within a CouponProvider");
  }
  return context;
}
