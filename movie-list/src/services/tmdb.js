import axios from "axios";

const TMDB_API_KEY = "6d7522d1007956b7517387156e3c4673"; // 🔑 sua chave
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// URL base para as imagens dos filmes
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// Cria uma instância do axios configurada
const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "pt-BR",
  },
});

// Retorna filmes populares
export const fetchPopularMovies = async () => {
  try {
    const response = await api.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    return [];
  }
};

// Retorna filmes de terror
export const fetchHorrorMovies = async () => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        with_genres: 27, // gênero terror
        sort_by: "popularity.desc",
      },
    });
    return response.data.results.slice(0, 6);
  } catch (error) {
    console.error("Erro ao buscar filmes de terror:", error);
    return [];
  }
};

// Busca por nome
export const searchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};

// Busca detalhes de um filme
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    return null;
  }
};
