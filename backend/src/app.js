import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import authRoutes from "./routes/auth-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
