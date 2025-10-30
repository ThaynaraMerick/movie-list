import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TMDB_IMAGE_URL } from "../services/tmdb";
import { FaHeart, FaGhost, FaHome } from "react-icons/fa";
import "./Share.css";

const SharedFavorites = () => {
  const { shareId } = useParams(); // pega o ID do link, ex: /shared/:shareId
  const [sharedFavorites, setSharedFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedList = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/favorites/${shareId}`
        );

        if (!res.ok) throw new Error("Erro ao buscar lista compartilhada");

        const data = await res.json();
        setSharedFavorites(data.movies);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar esta lista.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedList();
  }, [shareId]);

  if (loading) return <h2 className="shared-loading">Carregando...</h2>;

  return (
    <div className="shared-page">
      <h1 className="shared-title">
        <FaHeart color="orange" /> Lista compartilhada
      </h1>

      {error ? (
        <div className="empty-favs">
          <FaGhost className="ghost-icon" />
          <h2>{error}</h2>
        </div>
      ) : sharedFavorites.length === 0 ? (
        <div className="empty-favs">
          <FaGhost className="ghost-icon" />
          <h2>Ops... nada por aqui!</h2>
          <p>Talvez o link esteja incorreto ou a lista esteja vazia.</p>
        </div>
      ) : (
        <div className="shared-grid">
          {sharedFavorites.map((movie) => (
            <div key={movie.id} className="shared-card">
              <img
                src={TMDB_IMAGE_URL + movie.poster_path}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}

      <Link to="/favorites" className="back-btn">
        <FaHome /> Voltar aos Meus Favs
      </Link>
    </div>
  );
};

export default SharedFavorites;
