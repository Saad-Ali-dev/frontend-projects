
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const IMGPATH = "https://image.tmdb.org/t/p/w500";

// 2. Rename prop 'movie' to 'item', add 'id' and 'media_type' props
export default function MovieCard({ item, id, media_type, isHomePage }) {
  const navigate = useNavigate(); // 3. Initialize navigate hook

  // Use title for movies, name for TV shows
  const title = item.title || item.name || 'Untitled';
  const rating = item.vote_average;
  const posterPath = item.poster_path;

  const imageUrl = posterPath ? `${IMGPATH}${posterPath}` : '/No-Poster.png'; // Use placeholder if no poster

  // 4. Navigation handler
  const handleNavigate = () => {
    if (id && media_type) {
      navigate(`/details/${media_type}/${id}`);
    } else {
      console.error("Missing ID or media_type for navigation:", { id, media_type, item });
      // Optionally, navigate to an error page or show a message
    }
  };

  if (isHomePage) {
    return (
      // 5. Add onClick handler to the wrapper div
      <div
        className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-lg shadow-xl overflow-hidden max-w-sm mx-auto transition-transform duration-300 ease-in-out hover:scale-105 group cursor-pointer"
        onClick={handleNavigate} // Add onClick here
        role="button" // Add role for accessibility
        tabIndex={0} // Make it focusable
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()} // Keyboard accessibility
      >
        {/* Image Container */}
        <div className="aspect-[2/3] w-full bg-gray-700"> {/* Added bg color for loading state */}
          <img
            src={imageUrl}
            alt={`Poster for ${title}`}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300" // Ensure image fills container
            loading="lazy"
            onError={(e) => { e.target.onerror = null; e.target.src='/No-Poster.png' }} // More robust error handling
          />
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-5 text-white">
          <h3 className="text-lg md:text-xl font-semibold mb-2 truncate" title={title}>
            {title}
          </h3>

          <div className="flex items-center space-x-2 text-sm text-gray-300">
            {/* Rating */}
            {typeof rating === 'number' && rating > 0 && ( // Check if rating is a valid number
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
    // MoviesPage / TV Shows Card Style
    return (
      // 5. Add onClick handler to the wrapper div
      <div
        className="flex-shrink-0 w-36 md:w-48 mx-2 transition-transform duration-300 hover:scale-105 hover:cursor-pointer group"
        onClick={handleNavigate} // Add onClick here
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()}
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 h-full">
          <div className="relative aspect-[2/3]"> {/* Maintain aspect ratio */}
            <img
              src={imageUrl}
              alt={`Poster for ${title}`}
              className="w-full h-full object-cover" // Ensure image fills container
              loading="lazy"
              onError={(e) => { e.target.onerror = null; e.target.src='/No-Poster.png' }}
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

// 6. Update Prop Types
MovieCard.propTypes = {
  // Update 'movie' to 'item' and define its shape more accurately
  item: PropTypes.shape({
    title: PropTypes.string,        // Optional: movie title
    name: PropTypes.string,         // Optional: tv show name
    poster_path: PropTypes.string,  // Can be null
    vote_average: PropTypes.number,
  }).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID is required for navigation
  media_type: PropTypes.string.isRequired, // 'movie' or 'tv', required for navigation
  isHomePage: PropTypes.bool, // Keep this prop
};

// Default prop for isHomePage if not provided
MovieCard.defaultProps = {
  isHomePage: false,
};