import TrendingCards from "../components/TrendingCards.jsx"
import MovieCards from "../components/MovieCards.jsx"

export default function MoviesPage({movies, tvShows}) {
  return (
    <>
    <TrendingCards />
    <MovieCards movies={movies} title="Popular Movies" media_type="movie" isHomePage={false}/>
    <MovieCards movies={tvShows} title="TV Shows" media_type="tv" isHomePage={false}/>
    </>
  )
}