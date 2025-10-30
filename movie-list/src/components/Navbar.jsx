import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaGhost } from 'react-icons/fa';

import './Navbar.css';

const Navbar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            
            navigate(`/search?query=${query}`);
            setQuery('');
        }
    };

    return (
        <header className="spooky-header">
            <div className="header-content">
                <Link to="/" className="logo-spooky">
                    <FaGhost /> Movie List APP
                </Link>

                <nav className="header-nav">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Buscar filmes..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" aria-label="Buscar">
                            <FaSearch />
                        </button>
                    </form>
                    
                    <Link to="/favorites" className="nav-link">
                        <FaHeart /> Meus Favs
                    </Link>
                </nav>
            </div>
        </header>
    );
};


export default Navbar;