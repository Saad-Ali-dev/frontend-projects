
import React from 'react';
import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom'; 

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function TrendingCard({ item, rank }) {
  const navigate = useNavigate();

  const title = item.title || item.name || 'Untitled';
  const posterPath = item.poster_path;
  const id = item.id;
  const media_type = item.media_type;

  const imageUrl = posterPath
    ? `${IMAGE_BASE_URL}${posterPath}`
    : '/No-Poster.png';

  //  Navigation handler
  const handleNavigate = () => {
    if (id && media_type) {
      if (media_type === 'movie' || media_type === 'tv') {
          navigate(`/details/${media_type}/${id}`);
      } 
    }
  };

  return (
    <div
      className="relative h-56 w-48 md:h-56 md:w-48 lg:h-64 lg:w-56 flex-shrink-0 group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
      onClick={handleNavigate} 
      role="button" 
      tabIndex={0} 
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
        alt={`Poster for ${title}`} 
        loading="lazy"
        className="absolute z-20 inset-y-0 right-0 h-full w-[75%] md:w-[80%] object-cover rounded-lg shadow-lg border-2 border-transparent group-hover:border-indigo-500/50 transition-all duration-300 ease-in-out"
      />

       {/* Title Overlay on Hover */}
       <div className="absolute z-30 bottom-0 right-0 w-[75%] md:w-[80%] p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
       </div>
    </div>
  );
}

// 5. Used PropTypes for validation of props coming to the component
TrendingCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired, 
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};