import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { CouponDialog } from "@/components/CouponDialog";

export function CtaSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <section id="coupons" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="rounded-2xl bg-primary/5 border border-primary/10 p-8 md:p-12 lg:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative z-10 max-w-3xl">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to Start Saving?
            </motion.h2>
            <motion.p
              className="mt-4 text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get your exclusive coupon now and start enjoying discounts on your
              favorite products and services.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="gap-2 text-lg"
                onClick={() => setIsDialogOpen(true)}
              >
                Get Your Coupon
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 right-0 -mb-12 -mr-12 hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary/10"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      <CouponDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
