import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import authRoutes from "./routes/auth-routes.js";

// ROTUES
import registrationRotues from "./routes/registration.routes.js";

const app = express();
app.use("/auth", authRouter);

app.use("/", (req, res) => {
	res.status(404).send("No Endpoint");
});

export default app;
