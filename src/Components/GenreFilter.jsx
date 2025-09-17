import React from 'react';

// src/components/GenreFilter.jsx

function GenreFilter({ genres, onGenreSelect, selectedGenreId }) {
  if (!genres || genres.length === 0) return null;

  return (
    <div className="w-full mb-8">
      <div className="flex overflow-x-auto gap-2 py-2 px-2 scrollbar-hide">
        <button
          onClick={() => onGenreSelect(null)}
          className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-semibold transition ${
            selectedGenreId === null
              ? 'bg-blue-800 text-white hover:bg-blue-900'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          Populares
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreSelect(genre.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-semibold transition ${
              selectedGenreId === String(genre.id)
                ? 'bg-blue-800 text-white hover:bg-blue-900'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;