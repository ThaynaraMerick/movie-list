import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Permite o frontend rodando em http://localhost:5174 acessar a API
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/api/movies", moviesRoutes);
app.use("/api/favorites", favoritesRoutes);

export default app;
