import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorised",
      });
    }
    //verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userID);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Unauthorised",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised",
      error: error.message,
    });
  }
};

export default authorize;
