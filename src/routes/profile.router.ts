import express from "express";
import { Profile } from "../models/Profile";

export var router = express.Router();

router.get("/api/profile", async (req, res) => {
  var profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
});

