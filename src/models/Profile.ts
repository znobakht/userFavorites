import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { sectretKey } from "../config";
import roles from "../RoleNames";
const { Schema } = mongoose;

interface profileInterface {
  name?: string;
  nickname?: string;
  email: string;
  password: string;
  capital?: number;
  divisa?: string;
  prefered_cryptocurrency?: string;
  role?: string;
}
const profileSchema = new Schema<profileInterface>({
  name: String,
  nickname: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  capital: Number,
  divisa: String,
  role: { type: String, default: roles.Client },
  prefered_cryptocurrency: String,
});

profileSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    sectretKey
  );
};

export const Profile = mongoose.model<profileInterface>(
  "Profile",
  profileSchema
);
