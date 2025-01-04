/* eslint-disable prettier/prettier */
import express from "express";
import authRouter from "./routes/auth-routes.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

// ROTUES
import registrationRotues from "./routes/registration.routes.js";

const app = express();
app.use("/auth/registration", registrationRotues);
app.use("/auth", authRouter);

app.use("/", (req, res) => {
	res.status(404).send("No Endpoint");
});

app.use(errorHandler);

export default app;
