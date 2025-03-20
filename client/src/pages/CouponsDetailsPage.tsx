import { CouponDetails } from "@/components/Dashboard/CouponDetails";
import { useParams } from "react-router-dom";

export default function CouponDetailsPage() {
  const { id } = useParams();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Coupon Details</h1>
      <CouponDetails id={id as string} />
    </div>
  );
}
