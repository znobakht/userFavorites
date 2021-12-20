import jwt from "jsonwebtoken";
import { sectretKey } from "../config";

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("there is no token to access");
    const decoded = jwt.verify(token, sectretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};
module.exports = auth;
