import React, { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { TMDB_IMAGE_URL } from "../services/tmdb";
import { FaHeart, FaShareAlt, FaGhost } from "react-icons/fa";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateShareLink = async () => {
    if (favorites.length === 0) {
      setError("Você precisa ter pelo menos 1 filme nos favoritos!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movies: favorites }),
      });

      if (!response.ok) throw new Error("Erro ao salvar lista no servidor");

      const data = await response.json();
      const url = `${window.location.origin}/shared/${data.shareId}`;
      setShareLink(url);
    } catch (err) {
      console.error(err);
      setError("Não foi possível gerar o link de compartilhamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">
        <FaHeart color="orange" /> Meus favs
      </h1>

      {favorites.length === 0 ? (
        <div className="empty-favs">
          <FaGhost className="ghost-icon" />
          <h2>Sua pasta de favs está vazia.</h2>
          <p>Adicione um susto (ou não) à sua lista para começar!</p>
        </div>
      ) : (
        <>
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <div key={movie.id} className="favorite-card">
                <img
                  src={TMDB_IMAGE_URL + movie.poster_path}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <button
                  className="remove-btn"
                  onClick={() => toggleFavorite(movie)}
                >
                  💔 Remover
                </button>
              </div>
            ))}
          </div>

          <button
            className="share-btn"
            onClick={generateShareLink}
            disabled={loading}
          >
            <FaShareAlt />{" "}
            {loading ? "Gerando link..." : "Gerar Link Compartilhável"}
          </button>

          {error && <p className="error-message">{error}</p>}

          {shareLink && (
            <div className="share-box">
              <p>Copie e envie o link:</p>
              <input type="text" readOnly value={shareLink} />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  alert("Link copiado para a área de transferência! ✅");
                }}
              >
                Copiar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
