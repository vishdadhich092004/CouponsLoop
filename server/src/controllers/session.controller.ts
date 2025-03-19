import { Request, Response } from "express";
import crypto from "crypto";

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 1 year

export const initSession = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Check if session already exists
    if (req.cookies.sessionId) {
      return res.json({ message: "Session already exists" });
    }

    // Generate a secure random session ID
    const sessionId = crypto.randomBytes(32).toString("hex");

    // Set HTTP-only cookie
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE,
    });

    res.json({ message: "Session initialized" });
  } catch (error) {
    console.error("Session initialization error:", error);
    res.status(500).json({ message: "Failed to initialize session" });
  }
};
