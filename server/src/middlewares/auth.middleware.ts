import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import { IAdmin } from "../shared/types";
declare global {
  namespace Express {
    interface Request {
      admin: IAdmin | null;
    }
  }
}

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as IAdmin;
    req.admin = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
