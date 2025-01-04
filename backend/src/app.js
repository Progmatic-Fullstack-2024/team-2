/* eslint-disable prettier/prettier */
import express from "express";
import authRouter from "./routes/auth-routes.js";

const app = express();
app.use("/auth", authRouter);

app.use("/",(req,res)=>{res.status(404).send("No Endpoint");});

export default app;
