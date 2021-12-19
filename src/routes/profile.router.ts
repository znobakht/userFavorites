import express from "express";
import { Profile } from "../models/Profile";
import bcrypt from "bcryptjs";
import _ from "lodash";

export let router = express.Router();

router.post("/api/profile", async (req, res) => {
  try {
    const { email, password, name, nickname } = req.body;

    let profile = await Profile.findOne({ email });

    if (profile) {
      res.status(403).json({ msg: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt);
    profile = await Profile.create({
      email,
      name,
      nickname,
      password: newPass,
    });
    const userForSend: any = _.pick(profile, [
      "_id",
      "name",
      "email",
      "nickname",
    ]);

    res.status(200).json(userForSend);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
});
router.get("/api/profile", async (req, res) => {
  var profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
});
