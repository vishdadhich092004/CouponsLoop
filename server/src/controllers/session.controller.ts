import { Request, Response } from "express";
import crypto from "crypto";
import Session from "../models/Session";

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 1 year

export const initSession = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (req.cookies.sessionId) {
      // Validate the session exists in MongoDB
      const existingSession = await Session.findOne({
        sessionId: req.cookies.sessionId,
      });
      if (existingSession) {
        return res.json({
          message: "Session already exists",
          sessionId: req.cookies.sessionId,
        });
      }
      // If session doesn't exist in DB but cookie does, continue to create new session
    }

    const sessionId = crypto.randomBytes(32).toString("hex");

    // Create session in MongoDB
    await Session.create({
      sessionId,
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
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
