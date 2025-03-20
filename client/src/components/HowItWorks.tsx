"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CouponDialog } from "@/components/CouponDialog";

export function HowItWorksSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const steps = [
    {
      number: "01",
      title: "Visit CouponsLoop",
      description:
        "Navigate to our website from any device - no account needed.",
    },
    {
      number: "02",
      title: "Request a Coupon",
      description:
        "Click the 'Get Coupon' button to receive your unique discount code.",
    },
    {
      number: "03",
      title: "Copy Your Code",
      description:
        "Your coupon will appear instantly - copy it to your clipboard.",
    },
    {
      number: "04",
      title: "Use and Save",
      description:
        "Apply the coupon at checkout on the merchant's website and enjoy your savings!",
    },
  ];

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

  return (
    <section id="how-it-works" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How <span className="text-primary">It Works</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-[800px] mx-auto">
            Getting your coupon is quick and easy. Follow these simple steps to
            start saving.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="How CouponsLoop works"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <Button size="lg" variant="secondary" className="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {step.number}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className="mt-6"
                onClick={() => setIsDialogOpen(true)}
              >
                Get Your Coupon Now
              </Button>
              <CouponDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
