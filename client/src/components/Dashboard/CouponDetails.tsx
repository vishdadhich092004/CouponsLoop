import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getCouponById, updateCoupon, updateCouponStatus } from "@/api.clients";
import { CouponStatus, ICoupon } from "@/types/types";
import { formatDate } from "@/utils/format.data";
import { titleCase } from "@/utils/titleCase";
export function CouponDetails({ id }: { id: string }) {
  const [coupon, setCoupon] = useState<ICoupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [code, setCode] = useState("");
  const [updating, setUpdating] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const data = await getCouponById(id);
        setCoupon(data);
        setCode(data.code);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch coupon:", error);
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  const handleUpdateCode = async () => {
    if (!coupon) return;

    setUpdating(true);
    try {
      const response = await updateCoupon(coupon._id, code.toUpperCase());

      if (response.coupon) {
        setCoupon(response.coupon);
      } else {
        setCoupon({ ...coupon, code });
      }
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update coupon code:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!coupon) return;

    setUpdating(true);
    try {
      await updateCouponStatus(coupon._id, status);
      setCoupon({ ...coupon, status: status as CouponStatus });
    } catch (error) {
      console.error("Failed to update coupon status:", error);
    } finally {
      setUpdating(false);
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
    return <div>Loading coupon details...</div>;
  }

  if (!coupon) {
    return <div>Coupon not found</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Coupon Details</span>
          {getStatusBadge(coupon.status)}
        </CardTitle>
        <CardDescription>
          Created on {formatDate(new Date(coupon.createdAt))}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Coupon Code</Label>
          {editMode ? (
            <div className="flex gap-2">
              <Input
                value={code.toUpperCase()}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleUpdateCode}
                disabled={updating || !code.trim()}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  setCode(coupon.code);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">{coupon.code}</p>
              <Button
                variant="outline"
                onClick={() => setEditMode(true)}
                disabled={coupon.status !== CouponStatus.AVAILABLE}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <p>{titleCase(coupon.status)}</p>
          </div>
          <div className="space-y-2">
            <Label>Last Updated</Label>
            <p>{formatDate(new Date(coupon.updatedAt))}</p>
          </div>
          {coupon.claimedBy && (
            <div className="space-y-2">
              <Label>Claimed By</Label>
              <p>{coupon.claimedBy}</p>
            </div>
          )}
          {coupon.claimedAt && (
            <div className="space-y-2">
              <Label>Claimed At</Label>
              <p>{formatDate(new Date(coupon.claimedAt))}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router("/admin/coupons")}>
          Back to Coupons
        </Button>
        <div className="flex gap-2">
          {coupon.status !== CouponStatus.AVAILABLE && (
            <Button
              onClick={() => handleUpdateStatus(CouponStatus.AVAILABLE)}
              disabled={updating}
            >
              Mark Available
            </Button>
          )}
          {coupon.status !== CouponStatus.EXPIRED && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={updating}>
                  Mark Expired
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will mark the coupon as expired and it can no longer be
                    claimed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleUpdateStatus(CouponStatus.EXPIRED)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
