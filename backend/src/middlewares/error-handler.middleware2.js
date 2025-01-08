import HttpError from "../utils/HttpError2.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError)
    res.status(err.status).json({ error: err.message });
  console.log("Internal Server Error", err);
  return res.status(500).json({ error: "Internal Server Error" });
};
