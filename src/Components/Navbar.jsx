import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    
    <nav className={`fixed top-0 left-0 right-0 z-10 flex justify-center transition-all duration-300 ${
      isScrolled ? 'pt-4' : 'pt-0'
    }`}>

    
      <div
        className={`flex items-center transition-all duration-300 ${
          isScrolled
            ? 'w-[350px] sm:w-[450px] md:w-[500px] bg-gray-200/80 backdrop-blur-md rounded-3xl shadow-lg px-6 py-3' // Estilo ISLA FLOTANTE
            : 'w-full bg-white shadow-sm p-4' // Estilo BARRA SUPERIOR
        }`}
      >
      
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center gap-x-8">
          <Link to="/">
            <div className="flex text-2xl font-bold">
              <h1 className="text-slate-800 text-3xl sm:text-4xl md:text-4xl ">Movie</h1>
              <h1 className="text-blue-800 text-3xl sm:text-4xl md:text-4xl">App</h1>
            </div>
          </Link>
          <SearchBar />
        </div>
      </div>
    </nav>
  );

}

export default Navbar;