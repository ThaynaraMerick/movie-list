import { searchMovies, getPopularMovies } from "../services/tmdbService.js";

export const getPopular = async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar filmes populares" });
  }
};

export const search = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await searchMovies(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erro na pesquisa de filmes" });
  }
};
