import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CouponDialog } from "@/components/CouponDialog";
import { useCoupon } from "@/contexts/CouponContext";
import { couponLeftTime } from "@/utils/coupon.left.time";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { couponData } = useCoupon();
  const [timeLeft, setTimeLeft] = useState(
    couponData?.userClaim ? couponLeftTime(couponData.userClaim) : "00:00"
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(
        couponData?.userClaim ? couponLeftTime(couponData.userClaim) : "00:00"
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [couponData?.userClaim]);

  return (
    <section className="relative overflow-hidden py-20 md:py-28" id="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0" />
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col gap-4" variants={itemVariants}>
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              Get Exclusive Coupons{" "}
              <span className="text-primary">Instantly</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-[600px]"
              variants={itemVariants}
            >
              CouponsLoop distributes exclusive discount coupons in real-time.
              No sign-up required, just claim and save.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-4"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="font-medium"
                onClick={() => setIsDialogOpen(true)}
              >
                Get Your Coupon
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="#how-it-works">How It Works</Link>
              </Button>
            </motion.div>
            <motion.div
              className="flex items-center gap-4 mt-6"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <img
                      src={`https://fetchpik.com/images/fetchpik.com-LHoBMg1PG6.jpg`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">2,500+</span>{" "}
                coupons claimed today
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative lg:ml-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative h-[350px] md:h-[500px] w-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 z-10 rounded-lg" />
              <img
                src="https://fetchpik.com/images/fetchpik.com-np5bNUrB6P.jpg"
                alt="Coupons showcase"
                className="object-cover"
              />
              <motion.div
                className="absolute top-4 right-4 bg-white dark:bg-gray-950 p-3 rounded-lg shadow-lg z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium">Latest Coupon</p>
                <p className="text-xl font-bold text-primary">
                  {couponData?.coupon.code}
                </p>
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-4 bg-white dark:bg-gray-950 p-3 rounded-lg shadow-lg z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {couponData?.coupon.code ? (
                  <>
                    <p className="text-sm font-medium">Next refresh in</p>
                    <p className="text-xl font-bold">{timeLeft}</p>
                  </>
                ) : (
                  <p className="text-sm font-medium">You have no coupon</p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <CouponDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
