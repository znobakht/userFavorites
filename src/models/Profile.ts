import mongoose from "mongoose";

const { Schema } = mongoose;

interface profileInterface {
  name?: string;
  nickname?: string;
  email: string;
  password: string;
  capital?: number;
  divisa?: string;
  prefered_cryptocurrency?: string;
}
const schema = new Schema({
  name: String,
  nickname: String,
  email: {type: String, required: true},
  password: {type: String, required: true},
  capital: Number,
  divisa: String,
  prefered_cryptocurrency: String,
});

export const Profile = mongoose.model("Profile", schema);
