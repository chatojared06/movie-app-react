import React from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';


function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`;
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error al obtener las películas populares:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [apiKey]);

  if (loading) {
    return <div className="text-black text-center p-8">Cargando películas...</div>;
  }

  return (
    <div className="p-8 mt-18">
      <div className=''>
        <h1 className="text-center text-5xl font-bold mb-15">Películas Populares</h1>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-0 mx-0 mb-10'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;