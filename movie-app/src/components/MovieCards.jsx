import React from "react";
import MovieCard from "./MovieCard.jsx";

export default function MovieCards({ movies, title }) {
  const MovieCards = movies.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} />;
  });
  return (
    <div className="w-full xl:px-[60px] xl:py-[20px] 2xl:px-[80px] 2xl:py-[40px] ">
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug px-20 text-center lg:text-left">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-10 mb-8 px-4 ">
          {MovieCards}
        </div>
      </div>
    </div>
  );
}
 
