import { Request, Response } from "express";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAdmin } from "../shared/types";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });
};

export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    res.cookie("auth_token", generateToken(admin._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    const adminWithoutPassword = admin.toObject() as Partial<IAdmin>;
    delete adminWithoutPassword.password;
    res.status(200).json({
      message: "Admin logged in successfully",
      admin: adminWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });
    const admin = await Admin.create({ username, password });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminLogout = async (
  req: Request,
  res: Response
): Promise<any> => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Admin logged out successfully" });
};
