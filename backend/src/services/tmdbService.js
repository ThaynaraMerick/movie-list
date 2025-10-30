import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: "pt-BR",
  },
});

export const searchMovies = async (query) => {
  const res = await tmdb.get(`/search/movie`, { params: { query } });
  return res.data.results;
};

export const getPopularMovies = async () => {
  const res = await tmdb.get(`/movie/popular`);
  return res.data.results;
};
