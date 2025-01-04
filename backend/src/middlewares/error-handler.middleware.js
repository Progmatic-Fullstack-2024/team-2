import HttpError from "../utils/HttpError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.log("Internal Server Error", err);
  res.status(500).json({ error: "Internal Server Error" });
};
