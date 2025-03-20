import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <footer id="contact" className="bg-muted/50 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="w-10 h-10 dark:bg-white"
                viewBox="0 0 489.875 489.875"
              >
                <g>
                  <path
                    d="M403.038,79.125h-190.4l67.8-67.8c15.1-15.1,39.7-15.1,54.8,0L403.038,79.125z M104.738,54.325v24.8h72.6l63.5-63.5h-97.3
		C122.137,15.525,104.738,32.925,104.738,54.325z M250.138,476.125h94.1c20.7,0,37.5-16.8,37.5-37.5v-25.3h-68.8L250.138,476.125z
		 M86.037,413.425l65.5,65.5c14.6,14.6,38.4,14.6,53,0l65.5-65.5H86.037z M468.638,146.525v199.5c0,21.4-17.4,38.8-38.8,38.8h-369.8
		c-21.4,0-38.8-17.4-38.8-38.8v-199.5c0-21.4,17.4-38.8,38.8-38.8h369.9C451.237,107.725,468.638,125.125,468.638,146.525z
		 M435.538,188.425c-3.1,0.8-6.4,1.2-9.7,1.2c-21.7,0-39.2-17.6-39.2-39.2c0-3.3,0.4-6.5,1.2-9.6h-288c0.4,2.3,0.7,4.8,0.7,7.2
		c0,21.7-17.6,39.2-39.2,39.2c-2.4,0-4.7-0.2-6.9-0.6v119.2c2.2-0.4,4.5-0.6,6.9-0.6c21.7,0,39.2,17.6,39.2,39.2
		c0,2.5-0.2,4.9-0.7,7.2h287.1c-0.2-1.6-0.3-3.2-0.3-4.9c0-21.7,17.6-39.2,39.2-39.2c3.4,0,6.6,0.4,9.7,1.2L435.538,188.425
		L435.538,188.425z M335.638,238.125v16.3c0,3.3-2.7,6-6,6h-13.6c-1.9,9.5-5.6,18.4-10.8,26.2l9.6,9.6c2.3,2.3,2.3,6.1,0,8.5
		l-11.5,11.5c-2.3,2.3-6.1,2.3-8.5,0l-9.6-9.6c-7.8,5.2-16.7,9-26.2,10.9v13.4c0,3.3-2.7,6-6,6h-16.3c-3.3,0-6-2.7-6-6v-13.6
		c-9.5-1.9-18.4-5.6-26.2-10.9l-9.6,9.6c-2.3,2.3-6.1,2.3-8.5,0l-11.5-11.5c-2.3-2.3-2.3-6.1,0-8.5l9.6-9.6
		c-5.2-7.8-9-16.7-10.8-26.2h-13.6c-3.3,0-6-2.7-6-6v-16.3c0-3.3,2.7-6,6-6h13.6c1.9-9.5,5.6-18.4,10.8-26.2l-9.6-9.6
		c-2.3-2.3-2.3-6.1,0-8.5l11.5-11.5c2.3-2.3,6.1-2.3,8.5,0l9.6,9.6c7.8-5.2,16.7-9,26.2-10.9v-13.6c0-3.3,2.7-6,6-6h16.3
		c3.3,0,6,2.7,6,6v13.6c9.5,1.9,18.4,5.6,26.2,10.9l9.6-9.6c2.3-2.3,6.1-2.3,8.5,0l11.5,11.5c2.3,2.3,2.3,6.1,0,8.5l-9.6,9.6
		c5.2,7.8,9,16.7,10.8,26.2h13.6C332.938,232.125,335.638,234.825,335.638,238.125z M275.737,232.925l-11.7-11.7l-26.9,26.7
		l-11.2-11.3l-11.7,11.7l11.2,11.3l11.7,11.7l11.7-11.7L275.737,232.925z M375.138,222.725c-13,0-23.5,10.5-23.5,23.5
		c0,13,10.5,23.5,23.5,23.5s23.5-10.5,23.5-23.5C398.638,233.225,388.138,222.725,375.138,222.725z M114.738,222.725
		c-13,0-23.5,10.5-23.5,23.5c0,13,10.5,23.5,23.5,23.5s23.5-10.5,23.5-23.5C138.337,233.225,127.738,222.725,114.738,222.725z"
                  />
                </g>
              </svg>
              <span className="text-xl font-bold">CouponsLoop</span>
            </Link>
            <p className="text-muted-foreground">
              The platform for fair and efficient coupon distribution. No
              sign-up required.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-primary"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-primary"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-primary"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-primary"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 className="text-lg font-bold" variants={itemVariants}>
              Quick Links
            </motion.h3>
            <motion.nav
              className="flex flex-col space-y-2"
              variants={itemVariants}
            >
              <Link
                to="#features"
                className="text-muted-foreground hover:text-primary"
              >
                Features
              </Link>
              <Link
                to="#how-it-works"
                className="text-muted-foreground hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                to="#testimonials"
                className="text-muted-foreground hover:text-primary"
              >
                Testimonials
              </Link>
              <Link
                to="#coupons"
                className="text-muted-foreground hover:text-primary"
              >
                Get Coupon
              </Link>
              <Link
                to="/admin"
                className="text-muted-foreground hover:text-primary"
              >
                Admin Login
              </Link>
            </motion.nav>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 className="text-lg font-bold" variants={itemVariants}>
              Legal
            </motion.h3>
            <motion.nav
              className="flex flex-col space-y-2"
              variants={itemVariants}
            >
              <Link to="#" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                GDPR
              </Link>
            </motion.nav>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 className="text-lg font-bold" variants={itemVariants}>
              Stay Updated
            </motion.h3>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              Subscribe to our newsletter for the latest coupon updates.
            </motion.p>
            <motion.form className="space-y-2" variants={itemVariants}>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.form>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CouponsLoop. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Designed with ❤️ for Sales Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
