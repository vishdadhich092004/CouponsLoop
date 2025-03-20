import { CouponsTable } from "@/components/Dashboard/CouponsTable";
import { CreateCouponButton } from "@/components/Dashboard/CreateCouponButton";

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
        <CreateCouponButton />
      </div>
      <CouponsTable />
    </div>
  );
}
