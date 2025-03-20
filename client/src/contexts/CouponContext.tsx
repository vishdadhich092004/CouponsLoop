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
      // Initialize from localStorage on component mount
      const savedCoupon = localStorage.getItem("couponData");
      return savedCoupon ? JSON.parse(savedCoupon) : null;
    }
  );

  // Save to localStorage whenever couponData changes
  useEffect(() => {
    if (couponData) {
      localStorage.setItem("couponData", JSON.stringify(couponData));

      // Get the most recent claim time
      const latestClaim = couponData.userClaim[couponData.userClaim.length - 1];
      if (latestClaim) {
        const claimTime = new Date(latestClaim.lastClaimedAt).getTime();
        const expirationTime = claimTime + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // Check expiration every minute
        const checkExpiration = () => {
          const now = new Date().getTime();
          if (now > expirationTime) {
            setCouponData(null);
            localStorage.removeItem("couponData");
          }
        };

        // Initial check
        checkExpiration();

        // Set up interval to check every minute
        const intervalId = setInterval(checkExpiration, 60 * 1000); // 60 seconds * 1000 milliseconds

        // Cleanup interval on unmount or when couponData changes
        return () => {
          clearInterval(intervalId);
        };
      }
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
