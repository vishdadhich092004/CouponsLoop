import express from "express";
import cors from "cors";
import connectDB from "./db/db.config";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5656;

connectDB();

app.get("/", (req, res) => {
  res.send("Hey From CouponsLoop Server ♾️");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
