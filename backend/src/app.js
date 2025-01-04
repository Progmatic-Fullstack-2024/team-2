import express from "express";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

// ROTUES
import registrationRotues from "./routes/registration.routes.js";

const app = express();

app.use("/auth/registration", registrationRotues);

app.use(errorHandler);

export default app;
