import { Request, Response } from "express";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAdmin } from "../shared/types";

export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        username: admin.username,
        userId: admin._id.toString(),
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.admin?.userId;
    if (!userId) return res.status(401).json({ message: "AdminId not found" });
    const admin = await Admin.findById(userId);
    if (!admin) return res.status(401).json({ message: "Admin not found" });
    const adminWithoutPassword = admin.toObject() as Partial<IAdmin>;
    delete adminWithoutPassword.password;
    res.status(200).json({ admin: adminWithoutPassword });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Issue in validating admin" });
  }
};
