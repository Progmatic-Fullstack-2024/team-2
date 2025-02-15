import express, { json } from "express";
import cors from "cors";
import { FRONTEND_URL } from "./constants/constants.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
// routes
import authRoutes from "./routes/auth.routes.js";
import performancesRoutes from "./routes/performances.routes.js";
import userRoutes from "./routes/user.routes.js";
import theaterAdmin from "./routes/theaterAdmin.routers.js";
import theatersRoutes from "./routes/theaters.routes.js";
import creatorsRoutes from "./routes/creators.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import genresRoutes from "./routes/genres.routes.js";
import seasonTicketsRoutes from "./routes/season-tickets.routes.js";
import performanceEventsRoutes from "./routes/performanceEvents.routes.js";
import userSeasonTicketRoutes from "./routes/user-season-ticket.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(json());

app.use("/", authenticate);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/performances", performancesRoutes);
app.use("/api/performance-events", performanceEventsRoutes);
app.use("/api/theater", theatersRoutes);
app.use("/api/dropdown-data-creators", creatorsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/season-tickets", seasonTicketsRoutes);
app.use("/theaterAdmin", theaterAdmin);
app.use("/api/genres", genresRoutes);
app.use("/api/theater", theatersRoutes);
app.use("/api/user-season-ticket", userSeasonTicketRoutes);
app.use("/api/booking", bookingRoutes);

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
