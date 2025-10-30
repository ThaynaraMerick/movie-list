import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/tmdb.js';
import { FaSearch, FaGhost } from 'react-icons/fa';
import './Search.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery();
    const searchTerm = query.get('query');
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!searchTerm) {
            setMovies([]);
            setLoading(false);
            return;
        }

        const loadResults = async () => {
            setLoading(true);
            try {
                const data = await searchMovies(searchTerm);
                setMovies(data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
                setLoading(false);
            }
        };

        loadResults();
    }, [searchTerm]);

    if (loading) {
        return <div className="loading-spooky">Buscando sustos por "{searchTerm}"... <FaSearch /></div>;
    }

    return (
        <div className="search-container">
            <h1 className="search-title">
                Resultados para: <span className="search-term-highlight">"{searchTerm}"</span>
            </h1>
            
            {movies.length === 0 ? (
                <div className="no-results-spooky">
                    <FaGhost size={50} />
                    <p>Nenhum fantasma encontrado para sua busca.</p>
                </div>
            ) : (
                <div className="movies-list">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;