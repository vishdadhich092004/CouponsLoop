import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
interface CouponDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  couponCode: string;
  claimedCount?: number;
  refreshTime?: string;
}

export function CouponDialog({
  isOpen,
  onOpenChange,
  couponCode,
  claimedCount = 2500,
  refreshTime = "05:23",
}: CouponDialogProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(couponCode);
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
        <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
          <div className="grid flex-1">
            <div className="text-2xl font-bold text-primary">
              <TextGenerateEffect words={couponCode} duration={2} />
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
          <div>🎉 {claimedCount.toLocaleString()}+ people claimed today</div>
          <div>⏰ Refreshes in {refreshTime}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
