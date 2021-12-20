import mongoose from "mongoose";
import _ from "lodash";
import bcrypt from "bcryptjs";
import { Profile } from "../models/Profile";
import { Simulator } from "../models/Simulator";
import { Favorite } from "../models/Favorite";
import { DBURL } from "../config";
import roles from "../RoleNames";

(async () => {
  try {
    mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash("adminPassword", salt);
    const profile = await Profile.create({
      name: `String`,
      email: `String`,
      capital: `123`,
      divisa: `String`,
      prefered_cryptocurrency: `String`,
      role: roles.Admin,
      password: newPass,
    });

    const query = { email: `String` };
    const idProfile = profile._id;

    const simulator = new Simulator({
      profile_id: idProfile,
      name: `String`,
      start_date: `01/05/2021`,
      check_date: `01/05/2021`,
      cryptocurrency: `String`,
      divisa: `String`,
      Crypto_price_start: `123`,
      Crypto_price_check: `123`,
    });
    await simulator.save();

    const favorite = new Favorite({
      profile_id: idProfile,
      name: `String`,
      favorite1: `String`,
      favorite2: `String`,
      favorite3: `String`,
    });
    await favorite.save();

    mongoose.disconnect();
  } catch (err) {
    console.log(err.message);
  }
})();
