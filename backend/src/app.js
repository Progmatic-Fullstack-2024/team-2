import express, { json } from "express";
import cors from "cors";
import { FRONTEND_URL } from "./constants/constants.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
// routes
import authRoutes from "./routes/auth.routes.js";
import performancesRoutes from "./routes/performances.routes.js";
import userRoutes from "./routes/user.routes.js";
import theatersRoutes from "./routes/theaters.routes.js";
import creatorsRoutes from "./routes/creators.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(json());
app.use("/", authenticate);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/performances", performancesRoutes);
app.use("/api/dropdown-data-theaters", theatersRoutes);
app.use("/api/dropdown-data-creators", creatorsRoutes);
app.use("/api/payment", paymentRoutes);

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
