
import React from 'react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 

export default function TrendingCard({ item, rank }) {
  // Use title for movies, name for TV shows
  const title = item.title || item.name || 'Untitled';
  const posterPath = item.poster_path;

  const imageUrl = posterPath
    ? `${IMAGE_BASE_URL}${posterPath}`
    : '/No-Poster.png'; 

  return (
    <div className="relative h-56 w-48 md:h-56 md:w-48 lg:h-64 lg:w-56 flex-shrink-0 group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">

      <span
        className="absolute z-10 bottom-5 left-[-8px] md:bottom-4 md:-left-7 text-[10rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] 2xl:-left-10 font-bold text-indigo-400/70 leading-none select-none transition-transform duration-300 ease-in-out opacity-50"
        // Added slight opacity and dark mode variation
        // Added subtle hover effect
        style={{
            // Optional: Add a subtle text stroke for better visibility if needed
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.6)',
            textStroke: '2px rgba(255, 255, 255, 0.6)'
        }}
      >
        {rank}
      </span>

      {/* Poster Image: Positioned in front, takes up most of the card width */}
      <img
        src={imageUrl}
        alt={title}
        loading="lazy" // Lazy load images for performance
        className="absolute z-20 inset-y-0 right-0 h-full w-[75%] md:w-[80%] object-cover rounded-lg shadow-lg border-2 border-transparent group-hover:border-indigo-500/50 transition-all duration-300 ease-in-out"
        // Added slight border on hover
      />

       {/* Optional: Add title overlay on hover */}
       <div className="absolute z-30 bottom-0 right-0 w-[75%] md:w-[80%] p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
       </div>

    </div>
  );
}
