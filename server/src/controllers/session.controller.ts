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
      // Validate the existing session here if needed
      return res.json({
        message: "Session already exists",
        sessionId: req.cookies.sessionId,
      });
    }

    const sessionId = crypto.randomBytes(32).toString("hex");

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    // Verify cookie was set
    if (!res.headersSent) {
      res.json({
        message: "Session initialized",
        sessionId,
      });
    } else {
      throw new Error("Headers already sent before cookie could be set");
    }
  } catch (error) {
    console.error("Session initialization error:", error);
    res.status(500).json({
      message: "Failed to initialize session",
      error:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : undefined,
    });
  }
};
