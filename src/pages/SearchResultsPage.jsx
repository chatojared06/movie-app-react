import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../Components/MovieCard';

function SearchResultsPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-MX&query=${query}&page=1`;
        const response = await axios.get(url);
        setResults(response.data.results);
      } catch (error) {
        console.error("Error al buscar películas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, apiKey]);

  if (loading) {
    return <div className="text-black text-center p-8">Buscando...</div>;
  }

  return (
    <div className="p-8 mt-18">
      <h1 className="text-center text-4xl mb-15 text-gray-700">
        Resultados para: <span className="font-bold">{query}</span>
      </h1>
      
      {results.length === 0 ? (
        <p className="text-black">No se encontraron películas para tu búsqueda.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-0 mx-0 mb-10 ">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;