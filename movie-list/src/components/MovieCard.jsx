import { Link } from "react-router-dom";
import { TMDB_IMAGE_URL } from "../services/tmdb";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import "./MovieCard.css";
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card-spooky">
        <div className="card-frame">
          <img
            src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />

          <button
            className={`favorite-btn ${favorited ? "favorited" : ""}`}
            onClick={(e) => {
              e.preventDefault(); 
              toggleFavorite(movie);
            }}
          >
            {favorited ? <FaHeart /> : <FaRegHeart />}
          </button>


          <div className="movie-details-overlay">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-rating">
              <FaStar className="star-icon" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
