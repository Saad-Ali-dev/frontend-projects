import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx"; 
import ErrorPage from "./pages/ErrorPage.jsx"; 
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const APIKEY = import.meta.env.VITE_TMDB_API_KEY;
  const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;
  const tvShowsURL = `https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=${APIKEY}&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(APIURL);
        const data = await response.json();
        console.log(data);
        setPopularMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    
    const fetchTvShows = async () => {
      try {
        const response = await fetch(tvShowsURL);
        const data = await response.json();
        setTvShows(data.results.slice(3,10));
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchMovies();
    fetchTvShows();
  }, []);


  return (
    <Router> 
      <ScrollToTop />
      <>
        {/* Background layer */}
        <div className="bg-[url('/BG.png')] bg-cover bg-no-repeat min-h-screen bg-center absolute top-0 left-0 right-0 z-[-10] opacity-60"></div>
        {/* Content Layer */}
        <Navbar />
        <Routes> 
          <Route path="/" element={<HomePage popularMovies={popularMovies} searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path="/movies" element={<MoviesPage movies={popularMovies} tvShows={tvShows} />} /> 
          <Route path="/details/:mediaType/:id" element={<MovieDetailsPage />} /> 
          <Route path="/pricing" element={<PricingPage />} /> 
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </>
    </Router>
  );
}
