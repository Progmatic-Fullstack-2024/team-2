import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token === "undefined") {
    next();
    return;
  }
  try {
    const userDecoded = jwt.verify(token, JWT_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    next(new HttpError("Token is invalid", 401));
  }
};

export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    next(new HttpError("Token is missing", 401));
  } else next();
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    next(new HttpError("Admin role required", 403));
  }
};
