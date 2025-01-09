import express, { json } from "express";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import { FRONTEND_URL } from "./constants/constants.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(json());

app.use("/auth", authRoutes);

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
