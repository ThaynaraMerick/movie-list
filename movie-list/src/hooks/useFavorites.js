import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const saveFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const toggleFavorite = (movie) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    saveFavorites(updatedFavorites);
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
