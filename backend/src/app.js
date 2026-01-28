import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";

dotenv.config();
connectDB();

const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT","DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.options("*", cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);
app.use("/api/favorites", favoritesRoutes);

export default app;