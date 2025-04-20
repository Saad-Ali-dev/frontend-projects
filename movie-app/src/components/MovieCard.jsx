
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; 

const IMGPATH = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ item, id, media_type, isHomePage }) {
  const navigate = useNavigate(); 

  // Use title for movies, name for TV shows
  const title = item.title || item.name || 'Untitled';
  const rating = item.vote_average;
  const posterPath = item.poster_path;

  const imageUrl = posterPath ? `${IMGPATH}${posterPath}` : '/No-Poster.png'; 

  // Navigation handler
  const handleNavigate = () => {
    if (id && media_type) {
      navigate(`/details/${media_type}/${id}`);
    }
  };

  if (isHomePage) {
    return (
      <div
        className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-lg shadow-xl overflow-hidden max-w-sm mx-auto transition-transform duration-300 ease-in-out hover:scale-105 group cursor-pointer"
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
      >
        {/* Image Container */}
        <div className="aspect-[2/3] w-full bg-gray-700"> 
          <img
            src={imageUrl}
            alt={`Poster for ${title}`}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300" 
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
            {typeof rating === 'number' && rating > 0 && ( 
              <div className="flex items-center space-x-1">
                <img src="/star.svg" alt="star icon" className="w-4 h-4" />
                <span className="font-medium text-gray-100">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    // Changed the styling a little bit for the Movies Page
    return (
      <div
        className="flex-shrink-0 w-36 md:w-48 mx-2 transition-transform duration-300 hover:scale-105 hover:cursor-pointer group"
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 h-full">
          <div className="relative aspect-[2/3]"> 
            <img
              src={imageUrl}
              alt={`Poster for ${title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {typeof rating === 'number' && rating > 0 && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-full flex items-center">
                <img src="/star.svg" alt="star icon" className="w-3 h-3 mr-1" />
                <span className="text-xs text-white font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="text-white font-bold text-sm md:text-base truncate" title={title}>
              {title}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}


// Prop Types for validating the data passed to the component
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,        
    name: PropTypes.string,         
    poster_path: PropTypes.string,  
    vote_average: PropTypes.number,
  }).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
  media_type: PropTypes.string.isRequired, 
  isHomePage: PropTypes.bool, 
};
