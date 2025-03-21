import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 1 year

export const initSession = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionId = crypto.randomBytes(32).toString("hex");

    const token = jwt.sign(
      {
        sessionId,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("sessionId", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_MAX_AGE,
    });
    res.status(200).json({
      message: "Session initialized",
      sessionId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to initialize session",
    });
  }
};
