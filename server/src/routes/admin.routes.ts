import express from "express";
import {
  adminLogin,
  createAdmin,
  adminLogout,
  validateAdmin,
} from "../controllers/admin.controller";
import { protectAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/validate-admin", protectAdmin, validateAdmin);

export default router;
