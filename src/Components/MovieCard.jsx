import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link to={`/pelicula/${movie.id}`} className="group relative block overflow-hidden rounded-4xl">
      
      <img
        src={imageUrl}
        alt={`Póster de ${movie.title}`}
        className="w-120 h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"> 
      
        <h3 className="text-white text-xl font-bold">{movie.title}</h3>
        
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-300">{movie.release_date.substring(0, 4)}</span> 
        </div>

        <p className="mt-2 text-slate-200 text-sm line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;