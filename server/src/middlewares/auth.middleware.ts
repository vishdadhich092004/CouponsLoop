import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import { IAdmin } from "../shared/types";
declare global {
  namespace Express {
    interface Request {
      admin: {
        id: string;
        iat: number;
        exp: number;
      };
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
      iat: number;
      exp: number;
    };
    req.admin = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
