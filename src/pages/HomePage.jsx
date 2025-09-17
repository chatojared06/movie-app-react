import React from 'react';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../Components/MovieCard';
import GenreFilter from '../Components/GenreFilter';


function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams(); 
  const selectedGenreId = searchParams.get('genre'); 

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

   useEffect(() => {
    
    const fetchGenres = async () => {
      try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-MX`;
        const response = await axios.get(url);
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error al obtener los géneros:", error);
      }
    };

    fetchGenres();
  }, [apiKey]);

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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let url = '';

      
      if (selectedGenreId) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-MX&with_genres=${selectedGenreId}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX`;
      }

      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error al obtener las películas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenreId, apiKey]); 

  
  const handleGenreSelect = (genreId) => {
    if (genreId) {
      setSearchParams({ genre: genreId });
    } else {
      setSearchParams({}); 
    }
  };

  if (loading) {
    return <div className="text-slate-800 text-center p-8">Cargando películas...</div>;
  }

  return (
    <div className="p-8 mt-18">
      <header>
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
        {selectedGenreId
            ? `Películas de género: ${genres.find(g => g.id === Number(selectedGenreId))?.name || ''}`
            : 'Películas Populares'}
        </h1>
      </header>
      

      <GenreFilter
        genres={genres}
        onGenreSelect={handleGenreSelect} 
        selectedGenreId={selectedGenreId}  
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-0 mx-0 mb-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;