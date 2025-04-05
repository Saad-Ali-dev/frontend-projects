import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [movies, setMovies] = useState([]);

  const APIKEY = import.meta.env.VITE_TMDB_API_KEY;
  const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;
  
  useEffect(() => {
    try{
      fetchData();
    }catch(error){
      console.log(error);
    }
  }, []);

  async function fetchData(){

  const response = await fetch(APIURL)
  const data = await response.json();
  setMovies(data.results);
  }

  return (
    <>
      {/* Background layer */}
      <div className="bg-[url('/BG.png')] bg-cover bg-no-repeat min-h-screen bg-center absolute top-0 left-0 right-0 z-[-10] opacity-60">
      </div>
      {/* Content Layer */}
      <Navbar />
      <Home movies={movies} setMovies={setMovies}/>
    </>
  )
}

