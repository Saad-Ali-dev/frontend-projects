import React, { useState } from "react";

export default function Search({ searchTerm, setSearchTerm, setSearchResults }) {
  // Handler for input changes
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler for form submission (e.g., pressing Enter)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const APIKEY = import.meta.env.VITE_TMDB_API_KEY;
    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${APIKEY}&query=`;

    if (searchTerm.trim()) {
      // Only update search results
      try {
        const data = await fetch(SEARCHAPI + searchTerm);
        const searchResult = await data.json();
        setSearchResults(searchResult.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
      }
    } else {
      // If search is cleared, clear search results so HomePage shows popularMovies
      setSearchResults([]);
    }
  };


  return (
    <div className="px-2 relative top-[-50px]">
      <div className="bg-[#1a103c] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="text-purple-400 flex-shrink-0">
            <img
              src="/search.svg"
              alt="Search Icon"
              className="w-5 h-5 sm:w-6 sm:h-6 "
            />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search through 300+ movies online"
            className="bg-transparent border-none focus:outline-none text-gray-300 placeholder-gray-500 text-base sm:text-lg w-full flex-grow"
          />
        </form>
      </div>
    </div>
  );
}
