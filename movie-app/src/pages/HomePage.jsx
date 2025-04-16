import React, { useState } from 'react'

import HeroSection from '../components/HeroSection.jsx'
import Search from '../components/Search.jsx'
import MovieCards from '../components/MovieCards.jsx'


export default function Home({movies, setMovies}){
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setMovies={setMovies}/>
      <MovieCards movies={movies} title="Popular" isHomePage={true}/>
    </div>
  )
}

