import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JWTAdmin {
  userId: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: JWTAdmin;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JWTAdmin;
    req.admin = decode;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).json({ message: "Forbidden, Invalid Token" });
  }
};
