import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.middleware2.js";
import authRoutes from "./routes/auth.routes2.js";
import { FRONTEND_URL } from "./constants/constants2.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());

app.use("/auth", authRoutes);

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
