import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    try{
      fetchData();
    }catch(error){
      console.log(error);
    }
  }, []);

  async function fetchData(){
  const APIKEY = "0f80e0ce0113ccbb7bbd8f2a9c8ab106";
  const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;

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

