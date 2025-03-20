import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, CheckCircle, AlertCircle } from "lucide-react";
import { getAllCoupons } from "@/api.clients";
import { CouponStatus, ICoupon } from "@/types/types";

export function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    claimed: 0,
    expired: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const coupons = await getAllCoupons();
        const total = coupons.length;
        const available = coupons.filter(
          (coupon: ICoupon) => coupon.status === CouponStatus.AVAILABLE
        ).length;
        const claimed = coupons.filter(
          (coupon: ICoupon) => coupon.status === CouponStatus.CLAIMED
        ).length;
        const expired = coupons.filter(
          (coupon: ICoupon) => coupon.status === CouponStatus.EXPIRED
        ).length;

        setStats({ total, available, claimed, expired });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
          <Ticket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "Loading..." : stats.total}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available</CardTitle>
          <div className="h-4 w-4 rounded-full bg-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "Loading..." : stats.available}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Claimed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "Loading..." : stats.claimed}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expired</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "Loading..." : stats.expired}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
