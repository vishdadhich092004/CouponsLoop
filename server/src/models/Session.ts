import mongoose from "mongoose";
import { ISession } from "../shared/types";
const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
