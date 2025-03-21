import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { claimCoupon } from "@/api.clients";
import { Skeleton } from "@/components/ui/skeleton";
import { useCoupon } from "@/contexts/CouponContext";
import { couponLeftTime } from "@/utils/coupon.left.time";
interface CouponDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CouponDialog({ isOpen, onOpenChange }: CouponDialogProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { couponData, setCouponData } = useCoupon();
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    if (!couponData?.userClaim?.length) return;

    setTimeLeft(couponLeftTime(couponData.userClaim));
    const timer = setInterval(() => {
      setTimeLeft(couponLeftTime(couponData.userClaim));
    }, 1000);
    return () => clearInterval(timer);
  }, [couponData?.userClaim]);

  useEffect(() => {
    if (isOpen && !couponData) {
      const fetchCoupon = async () => {
        try {
          const data = await claimCoupon();
          if (!data) {
            setError("No coupon available at this time");
            return;
          }
          setCouponData(data);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch coupon"
          );
        }
      };
      fetchCoupon();
    }
  }, [isOpen, setCouponData, couponData]);

  const handleCopyClick = async () => {
    if (!couponData?.coupon) return;
    await navigator.clipboard.writeText(couponData.coupon.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Exclusive Coupon</DialogTitle>
          <DialogDescription>
            Here's your discount coupon. Copy it and use it at checkout!
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <div className="text-red-500">{error}</div>
        ) : couponData?.coupon ? (
          <>
            <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
              <div className="grid flex-1">
                <div className="text-2xl font-bold text-primary">
                  <TextGenerateEffect
                    words={couponData.coupon.code}
                    duration={2.5}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Valid for the next 24 hours
                </div>
              </div>
              <Button
                size="icon"
                onClick={handleCopyClick}
                variant="outline"
                className="w-10 h-10"
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>🎉 {1200}+ people claimed today</div>
              <div>⏰ Refreshes in {timeLeft}</div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
              <div className="grid flex-1">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
              <Skeleton className="h-10 w-10 rounded" />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-24" />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
