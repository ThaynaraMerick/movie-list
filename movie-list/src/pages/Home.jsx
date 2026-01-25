import { useState, useEffect } from 'react';

import MovieCard from '../components/MovieCard.jsx';

import './Home.css';



const apiKey = import.meta.env.VITE_API_KEY;



const Home = () => {

  const [horrorMovies, setHorrorMovies] = useState([]);



  const getMovies = async (url) => {

    const res = await fetch(url);

    const data = await res.json();

    setHorrorMovies(data.results);

  };



  useEffect(() => {

    const horrorUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc`;

    getMovies(horrorUrl);

  }, []);



  return (

    <div className="container">

      <h2 className="title">🎃 Filmes de Terror - Especial de Halloween 👻</h2>

      <div className="movies-container">

        {horrorMovies.length === 0 && <p>Carregando filmes assustadores...</p>}

        {horrorMovies.length > 0 &&

          horrorMovies.map((movie) => (

            <MovieCard key={movie.id} movie={movie} />

          ))}

      </div>

    </div>

  );

};



export default Home;