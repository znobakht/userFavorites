import express from "express";
import { Profile } from "../models/Profile";
import bcrypt from "bcryptjs";
import _ from "lodash";

export let router = express.Router();

router.post("/api/auth", async (req, res) => {
  try {
    const { email, password, name, nickname } = req.body;
    if (!email && !password) {
      return res.status(400).send({ msg: "email and password are required" });
    }

    let profile = await Profile.findOne({ email });

    if (profile) {
      return res.status(403).json({ msg: "user already exists" });
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

    return res.status(200).json({ profile: userForSend });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
});
router.get("/api/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).send({ msg: "email and password are required" });
    }

    let profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ msg: "user doesnt exist" });
    }
    const isMatch = bcrypt.compare(password, profile.password);
    if (!isMatch) {
      return res.status(404).json({ msg: "password is incorrect" });
    }
    const token = profile.generateAuthToken();
    const userForSend: any = _.pick(profile, [
      "_id",
      "name",
      "email",
      "nickname",
    ]);
    res.status(200).json({ token: "Bearer " + token, profile: userForSend });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
});
