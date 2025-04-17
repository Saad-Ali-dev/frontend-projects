import React from "react";
import MovieCard from "./MovieCard.jsx";

export default function MovieCards({ movies, title, isHomePage }) {
  
  if (isHomePage) {
    const MovieCards = movies.map((movie) => {
      return <MovieCard key={movie.id} movie={movie} isHomePage={isHomePage} />;
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
  } else {
    movies = movies.slice(0,10);
    const MovieCards = movies.map((movie) => {
      return <MovieCard key={movie.id} movie={movie} isHomePage={isHomePage} />;
    });
    return (
      <div className="w-full py-6 px-4 sm:px-6 lg:px-8 mt-5">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          {title}
        </h2>

        <div className="flex space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto overflow-y-hidden pb-4 -mb-4  gap-8 lg:gap-12 2xl:gap-24 ">
         {MovieCards}
        </div>
      </div>
    );
  }
}
