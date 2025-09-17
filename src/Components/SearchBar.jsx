import React from "react";
import { useState  } from "react";
import { Form, useNavigate } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if(query.trim()) {
            navigate(`/buscar/${query}`);
            setQuery('')
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Buscar película..."
            className="bg-gray-400 rounded-2xl px-2 py-2 focus:outline-none focus:bg-gray-600 text-white w-32 sm:w-48 md:w-50 lg:w-60"
            />
        </form>
    );
}

export default SearchBar;
