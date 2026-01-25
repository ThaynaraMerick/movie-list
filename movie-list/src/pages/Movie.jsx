import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, TMDB_IMAGE_URL } from '../services/tmdb.js';
import { formatCurrency, formatRuntime } from '../utils/format';
import { FaDollarSign, FaReceipt, FaClock, FaCalendarAlt, FaGhost, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa'; 
import { useFavorites } from "../context/FavoritesContext";


import './Movie.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);  
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = movie ? isFavorite(movie.id) : false;

    useEffect(() => {
        const loadDetails = async () => {
            if (!id) return; 

            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar detalhes:", error);
                setLoading(false);
            }
        };

        loadDetails();
    }, [id]);

    const handleToggleFavorite = () => {
        if (movie) {
            toggleFavorite(movie);
        }
    };

    if (loading) {
        return <div className="loading-spooky">Carregando detalhes... <FaGhost /></div>;
    }

    if (!movie) {
        return <div className="error-spooky">Filme não encontrado ou se escondeu...</div>;
    }

    const backdropUrl = movie.backdrop_path 
        ? TMDB_IMAGE_URL.replace('w500', 'w1280') + movie.backdrop_path 
        : '';
    const posterUrl = movie.poster_path 
        ? TMDB_IMAGE_URL + movie.poster_path
        : 'https://via.placeholder.com/500x750?text=Pôster+Não+Disponível';

    return (
        <div className="movie-details-spooky" 
            style={{ backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.85), var(--color-background-dark)), url(${backdropUrl})` }}>
            
            <div className="details-card-container">
                <div className="details-poster">
                    <img src={posterUrl} alt={movie.title} />
                    <div className="spooky-rating">
                        <FaStar /> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </div>
                </div>

                <div className="details-info">
                    <h1 className="movie-title-spooky">{movie.title}</h1>
                    <p className="movie-tagline">{movie.tagline}</p>
                    
                    <button 
                        className={`details-favorite-btn ${isFav ? 'favorited' : ''}`}
                        onClick={handleToggleFavorite}
                        title={isFav ? "Remover dos Meus favs" : "Adicionar à Meus favs"}
                    >
                        {isFav ? <FaHeart /> : <FaRegHeart />} 
                        {isFav ? ' Remover dos Meus Favs' : ' Adicionar à Meus Favs'}
                    </button>
                    
                    <h2 className="section-title-spooky">Sinopse</h2>
                    <p className="movie-overview">{movie.overview || "Descrição Indisponível."}</p>

                    <div className="movie-data-grid">
                        <div className="data-item">
                            <FaDollarSign className="data-icon" />
                            <strong>Orçamento:</strong>
                            <span>{formatCurrency(movie.budget)}</span>
                        </div>
                        <div className="data-item">
                            <FaReceipt className="data-icon" />
                            <strong>Receita:</strong>
                            <span>{formatCurrency(movie.revenue)}</span>
                        </div>
                        <div className="data-item">
                            <FaClock className="data-icon" />
                            <strong>Duração:</strong>
                            <span>{formatRuntime(movie.runtime)}</span>
                        </div>
                        <div className="data-item">
                            <FaCalendarAlt className="data-icon" />
                            <strong>Lançamento:</strong>
                            <span>{movie.release_date}</span>
                        </div>
                    </div>
                    
                    {movie.genres && movie.genres.length > 0 && (
                        <div className="movie-genres">
                            <strong>Gêneros:</strong>
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="genre-tag">{genre.name}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;