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
) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not Authorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, No Token Provided" });
  }
};
