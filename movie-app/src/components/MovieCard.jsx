import React from 'react'
import PropTypes from 'prop-types'; 


export default function MovieCard({ movie, isHomePage }) {
  const IMGPATH = "https://image.tmdb.org/t/p/w500";


  const { title, poster_path, vote_average: rating, name} = movie; 

  const imageUrl = poster_path ? `${IMGPATH}${poster_path}` : null;

  if (isHomePage){
    return (
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-lg shadow-xl overflow-hidden max-w-sm mx-auto transition-transform duration-300 ease-in-out hover:scale-105 group cursor-pointer">
         {/* Image Container */}
         {imageUrl ? (
        <div className="aspect-[2/3] w-full bg-gray-700">
          <img
            src={imageUrl}
            alt={`Poster for ${title}`}
            className="w-full h-auto object-cover aspect-[2/3]  group-hover:opacity-90 transition-opacity duration-300" 
            loading="lazy" 
          />
        </div>): <img
            src="/No-Poster.png"
            alt={`no poster`}
            className="w-full h-auto object-cover aspect-[2/3]" 
          />}
  
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

  else {
    return (
    <div className="flex-shrink-0 w-36 md:w-48 mx-2 transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 h-full">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={`${title} poster`}
            className="w-full h-56 md:h-64 object-cover"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-full flex items-center">
            <img src="/star.svg" alt="star icon" className="w-3 h-3" />
            <span className="text-xs text-white font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-3">
          {name ?  <h3 className="text-white font-bold text-sm md:text-base truncate">{name}
          </h3> : <h3 className="text-white font-bold text-sm md:text-base truncate">{title}
          </h3>}
        </div>
      </div>
    </div>
  );
  }
}

  

// Prop Types for validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    rating: PropTypes.number, 
  }).isRequired,
};

