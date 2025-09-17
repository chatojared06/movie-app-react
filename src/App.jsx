import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage'; 
import SearchResultsPage from './pages/SearchResultsPage';
import Navbar from './Components/Navbar';
import ScrollToTop from './Components/Scroll/SrollToTop';

function App() {
   return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pelicula/:movieId" element={<MovieDetailPage />} />
          <Route path="/buscar/:query" element={<SearchResultsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;