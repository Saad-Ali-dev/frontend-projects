// src/components/TrendingCard.jsx

import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes if you want validation
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function TrendingCard({ item, rank }) {
  const navigate = useNavigate(); // 2. Initialize navigate hook

  // Extract necessary data, including id and media_type
  const title = item.title || item.name || 'Untitled';
  const posterPath = item.poster_path;
  const id = item.id; // Assuming 'item' has an 'id' property
  const media_type = item.media_type; // Assuming 'item' has a 'media_type' property ('movie' or 'tv')

  const imageUrl = posterPath
    ? `${IMAGE_BASE_URL}${posterPath}`
    : '/No-Poster.png';

  // 3. Navigation handler
  const handleNavigate = () => {
    if (id && media_type) {
      // Ensure media_type is 'movie' or 'tv' if needed, TMDB trending often includes 'person'
      if (media_type === 'movie' || media_type === 'tv') {
          navigate(`/details/${media_type}/${id}`);
      } else {
          console.warn(`Navigation not supported for media_type: ${media_type}`);
      }
    } else {
      console.error("Missing ID or media_type for navigation:", { id, media_type, item });
    }
  };

  return (
    // 4. Add onClick handler to the wrapper div
    <div
      className="relative h-56 w-48 md:h-56 md:w-48 lg:h-64 lg:w-56 flex-shrink-0 group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
      onClick={handleNavigate} // Add onClick here
      role="button" // Add role for accessibility
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()} // Keyboard accessibility
    >
      {/* Rank Number */}
      <span
        className="absolute z-10 bottom-5 left-[-8px] md:bottom-4 md:-left-7 text-[10rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] 2xl:-left-10 font-bold text-indigo-400/70 leading-none select-none transition-transform duration-300 ease-in-out opacity-50"
        style={{
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.6)',
            textStroke: '2px rgba(255, 255, 255, 0.6)'
        }}
        aria-hidden="true" // Hide decorative element from screen readers
      >
        {rank}
      </span>

      {/* Poster Image */}
      <img
        src={imageUrl}
        alt={`Poster for ${title}`} // Changed alt text to be more descriptive
        loading="lazy"
        className="absolute z-20 inset-y-0 right-0 h-full w-[75%] md:w-[80%] object-cover rounded-lg shadow-lg border-2 border-transparent group-hover:border-indigo-500/50 transition-all duration-300 ease-in-out"
        onError={(e) => { e.target.onerror = null; e.target.src='/No-Poster.png' }} // Add error handling
      />

       {/* Title Overlay on Hover */}
       <div className="absolute z-30 bottom-0 right-0 w-[75%] md:w-[80%] p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
       </div>
    </div>
  );
}

// 5. Add PropTypes for validation (Optional but recommended)
TrendingCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Required
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired, // Required and must be 'movie' or 'tv'
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};