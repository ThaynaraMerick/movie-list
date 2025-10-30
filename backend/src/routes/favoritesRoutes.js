import express from "express";
import { saveFavorites, getFavoritesByShareId } from "../controllers/favoritesController.js";

const router = express.Router();

router.post("/", saveFavorites);
router.get("/:shareId", getFavoritesByShareId);

export default router;
