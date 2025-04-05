import React from 'react'
import PropTypes from 'prop-types'; 


export default function MovieCard({ movie }) {
  const IMGPATH = "https://image.tmdb.org/t/p/w500";

  if (!movie) {
    return <div className="text-white">Loading movie data...</div>; 
  }

  const { title, poster_path, vote_average: rating} = movie; 

  const imageUrl = poster_path ? `${IMGPATH}${poster_path}` : null;

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-lg shadow-xl overflow-hidden max-w-sm mx-auto transition-transform duration-300 ease-in-out hover:scale-105 group">
       {/* Image Container */}
      <div className="aspect-[2/3] w-full bg-gray-700">
        <img
          src={imageUrl}
          alt={`Poster for ${title}`}
          className="w-full h-auto object-cover aspect-[2/3]  group-hover:opacity-90 transition-opacity duration-300" 
          loading="lazy" 
        />
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-5 text-white">
        <h3 className="text-lg md:text-xl font-semibold mb-2 truncate" title={title}>
          {title}
        </h3>


        <div className="flex items-center space-x-2 text-sm text-gray-300">
          {/* Rating */}
          {rating && ( 
            <div className="flex items-center space-x-1">
              <img src="/star.svg" alt="star icon" className="w-4 h-4" />
              <span className="font-medium text-gray-100">{rating.toFixed(1)}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Prop Types for validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    rating: PropTypes.number, 
  }).isRequired,
};

