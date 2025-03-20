import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllCoupons } from "@/api.clients";
import { CouponStatus, ICoupon } from "@/types/types";
import { formatDate } from "@/utils/format.data";

export function RecentCoupons() {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getAllCoupons();
        setCoupons(data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const getStatusBadge = (status: CouponStatus) => {
    switch (status) {
      case CouponStatus.AVAILABLE:
        return <Badge className="bg-green-500">Available</Badge>;
      case CouponStatus.CLAIMED:
        return <Badge className="bg-blue-500">Claimed</Badge>;
      case CouponStatus.EXPIRED:
        return <Badge variant="outline">Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Coupons</CardTitle>
        <CardDescription>Latest coupons created in the system</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading recent coupons...</p>
        ) : coupons.length === 0 ? (
          <p>No coupons found</p>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{coupon.code}</p>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(coupon.status)}
                    <span className="text-xs text-muted-foreground">
                      Created {formatDate(new Date(coupon.createdAt))}
                    </span>
                  </div>
                </div>
                <Link to={`/admin/coupons/${coupon._id}`}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            ))}
            <div className="pt-2">
              <Link to="/admin/coupons">
                <Button variant="outline" size="sm" className="w-full">
                  View All Coupons
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
