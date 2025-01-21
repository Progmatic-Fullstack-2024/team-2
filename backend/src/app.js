import express, { json } from "express";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import performancesRoutes from "./routes/performances.routes.js";
import theatersRoutes from "./routes/theaters.routes.js";
import creatorsRoutes from "./routes/creators.routes.js";
import { FRONTEND_URL } from "./constants/constants.js";
import { authenticate } from "./middlewares/auth.middleware.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(json());
app.use("/", authenticate);

app.use("/auth", authRoutes);
app.use("/api/performances", performancesRoutes);
app.use("/api/dropdown-data-theaters", theatersRoutes);
app.use("/api/dropdown-data-creators", creatorsRoutes);


app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
