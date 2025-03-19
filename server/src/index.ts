import express from "express";
import cors from "cors";
import connectDB from "./configs/db.config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL as string,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Hey From CouponsLoop Server ♾️");
});

const PORT = process.env.PORT || 5656;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
