import express from "express";
import {
  adminLogin,
  createAdmin,
  adminLogout,
} from "../controllers/admin.controller";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

export default router;
