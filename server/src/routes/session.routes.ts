import express from "express";
import { initSession } from "../controllers/session.controller";

const router = express.Router();

router.get("/init", initSession);

export default router;
