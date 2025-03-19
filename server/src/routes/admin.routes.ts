import express from "express";
import {
  adminLogin,
  createAdmin,
  adminLogout,
  claimHistory,
} from "../controllers/admin.controller";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/claim-history", claimHistory);

export default router;
