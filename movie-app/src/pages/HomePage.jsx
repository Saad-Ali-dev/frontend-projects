import React, { useState } from 'react'

import HeroSection from '../components/HeroSection.jsx'
import Search from '../components/Search.jsx'
import MovieCards from '../components/MovieCards.jsx'


export default function Home({ popularMovies, searchResults, setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  // Show searchResults if present, else popularMovies
  const moviesToShow = searchResults && searchResults.length > 0 ? searchResults : popularMovies;
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults}/>
      <MovieCards movies={moviesToShow} title={searchResults && searchResults.length > 0 ? "Search Results" : "Popular"} media_type="movie" isHomePage={true}/>
    </div>
  )
}

