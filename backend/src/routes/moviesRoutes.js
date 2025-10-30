import express from "express";
import { getPopular, search } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/popular", getPopular);
router.get("/search", search);

export default router;
