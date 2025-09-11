import React from 'react';
// src/pages/MovieDetailPage.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetailPage() {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`;
      
      try {
        const response = await axios.get(url);
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, apiKey]);

  if (loading) {
    return <div className="text-white text-center p-8">Cargando detalles...</div>;
  }

  if (!movieDetails) {
    return <div className="text-white text-center p-8">No se pudieron cargar los detalles de la película.</div>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-2 py-8">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-8 p-6 md:p-10">
        <img
          src={imageUrl}
          alt={`Póster de ${movieDetails.title}`}
          className="w-full max-w-xs md:max-w-[260px] rounded-2xl shadow-md mx-auto md:mx-0"
        />
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center md:text-left">{movieDetails.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 items-center md:items-start mb-4">
            <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-xl shadow">
              ⭐ {movieDetails.vote_average.toFixed(1)} / 10
            </span>
            <span className="text-gray-600 text-sm md:text-base">
              Fecha de Estreno: {movieDetails.release_date}
            </span>
          </div>
          <p className="text-gray-700 text-base md:text-lg text-center md:text-left">{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;