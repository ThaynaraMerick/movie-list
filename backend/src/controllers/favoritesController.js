import FavoriteList from "../models/favoriteList.js";
import { v4 as uuidv4 } from "uuid";

// ---------------- SALVAR LISTA FAVORITA ----------------
export const saveFavorites = async (req, res) => {
  try {
    const { movies } = req.body;
    console.log("🎬 Recebido no backend:", movies);

    const shareId = uuidv4();
    const newList = await FavoriteList.create({ movies, shareId });

    console.log("✅ Lista salva com sucesso:", newList);
    res.status(201).json({ message: "Lista salva", shareId });
  } catch (error) {
    console.error("❌ Erro ao salvar lista:", error);
    res.status(500).json({ error: "Erro ao salvar lista" });
  }
};

// ---------------- BUSCAR LISTA PELO shareId ----------------
export const getFavoritesByShareId = async (req, res) => {
  try {
    const { shareId } = req.params;
    console.log("🔍 Buscando lista com shareId:", shareId);

    const list = await FavoriteList.findOne({ shareId });
    if (!list) return res.status(404).json({ error: "Lista não encontrada" });

    res.json(list);
  } catch (error) {
    console.error("❌ Erro ao buscar lista:", error);
    res.status(500).json({ error: "Erro ao buscar lista" });
  }
};
