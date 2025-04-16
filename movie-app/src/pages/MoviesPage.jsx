import TrendingCards from "../components/TrendingCards.jsx"
import MovieCards from "../components/MovieCards.jsx"

export default function MoviesPage({movies}) {
  return (
    <>
    <TrendingCards />
    <MovieCards movies={movies} title="Popular Movies" isHomePage={false}/>
    </>
  )
}
