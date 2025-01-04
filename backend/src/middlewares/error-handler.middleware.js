/* eslint-disable import/prefer-default-export */
import HttpError from "../utils/HttpError.js";

export const errorHandler = (err, req, res) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.log("Unexpected error: ", err);
  return res.status(500).json({ error: "Internal Server Error" });
};
