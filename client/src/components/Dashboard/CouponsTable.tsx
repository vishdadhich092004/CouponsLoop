import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash, Eye } from "lucide-react";
import { getAllCoupons, updateCouponStatus } from "@/api.clients";
import { CouponStatus, ICoupon } from "@/types/types";
import { formatDate } from "@/utils/format.data";

export function CouponsTable() {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const data = await getAllCoupons();
      setCoupons(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateCouponStatus(id, status);
      fetchCoupons();
    } catch (error) {
      console.error("Failed to update coupon status:", error);
    }
  };

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

  if (loading) {
    return <div>Loading coupons...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Claimed By</TableHead>
            <TableHead>Claimed At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No coupons found
              </TableCell>
            </TableRow>
          ) : (
            coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell className="font-medium">{coupon.code}</TableCell>
                <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                <TableCell>{formatDate(new Date(coupon.createdAt))}</TableCell>
                <TableCell>{coupon.claimedBy || "-"}</TableCell>
                <TableCell>
                  {coupon.claimedAt
                    ? formatDate(new Date(coupon.claimedAt))
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link to={`/admin/coupons/${coupon._id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(coupon._id, CouponStatus.AVAILABLE)
                        }
                        disabled={coupon.status === CouponStatus.AVAILABLE}
                      >
                        <Badge className="mr-2 h-4 w-4 bg-green-500" />
                        Mark Available
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(coupon._id, CouponStatus.EXPIRED)
                        }
                        disabled={coupon.status === CouponStatus.EXPIRED}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Mark Expired
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
