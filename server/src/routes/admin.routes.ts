import express from "express";
import { protectAdmin } from "../middlewares/auth.middleware";
import { adminLogin, createAdmin } from "../controllers/admin.controller";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);

export default router;
