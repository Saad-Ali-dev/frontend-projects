import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Helper function to format runtime from minutes to hours and minutes
const formatRuntime = (minutes) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Helper function to format currency
const formatCurrency = (amount) => {
  if (!amount) return "";
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
};

function MovieDetailsPage() {
  // Get mediaType (movie/tv) and id from URL parameters
  // Make sure your Route path is defined like: /details/:mediaType/:id
  const { mediaType, id } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos,credits`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDetails(data);
        // Find the official trailer or any trailer from videos
        const trailer = data.videos?.results?.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setVideos(
          trailer
            ? [trailer]
            : data.videos?.results
                ?.filter((vid) => vid.site === "YouTube")
                .slice(0, 1) || []
        );
      } catch (err) {
        console.error("Failed to fetch details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (mediaType && id) {
      fetchDetails();
    } else {
      setError("Media type or ID is missing.");
      setLoading(false);
    }
  }, [mediaType, id, TMDB_API_KEY]); // Re-run effect if mediaType or id changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        <p>Error loading details: {error}</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p>No details found.</p>
      </div>
    );
  }

  // --- Data Extraction (handling differences between movie and tv) ---
  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const runtime =
    details.runtime ||
    (details.episode_run_time ? details.episode_run_time[0] : null); // Use first episode runtime for TV
  const posterPath = details.poster_path
    ? `${TMDB_IMAGE_BASE_URL}w500${details.poster_path}`
    : "/placeholder-poster.png"; // Add a placeholder image in public folder
  const backdropPath = details.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}original${details.backdrop_path}`
    : "/placeholder-backdrop.png"; // Add a placeholder
  const rating = details.vote_average ? details.vote_average.toFixed(1) : "N/A";
  const voteCount = details.vote_count || 0;
  // MPAA Rating / Certification (Needs careful handling as structure varies)
  // Let's try finding US certification for simplicity
  const certification =
    details.release_dates?.results?.find((r) => r.iso_3166_1 === "US")
      ?.release_dates[0]?.certification || "N/A"; // This is for movies
  // For TV shows, content_ratings might be available
  const tvCertification =
    details.content_ratings?.results?.find((r) => r.iso_3166_1 === "US")
      ?.rating || "N/A";
  const displayCertification =
    mediaType === "movie" ? certification : tvCertification;

  const trailerKey = videos.length > 0 ? videos[0].key : null;

  // --- Component Render ---
  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      {" "}
      {/* Adjust pt based on your Navbar height */}
      {/* --- Backdrop Section --- */}
      <div
        className="relative h-[50vh] md:h-[65vh] lg:h-[calc(100vh-80px)] bg-cover bg-center" // Adjust height and top padding offset
        style={{ backgroundImage: `url(${backdropPath})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {trailerKey && (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full hover:bg-white/30 transition duration-300 text-lg z-10"
              aria-label={`Watch trailer for ${title}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
              Trailer
            </a>
          )}
        </div>
      </div>
      {/* --- Main Content Area --- */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16 -mt-48 md:-mt-64 lg:-mt-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Left Side: Poster */}
          <div className="lg:w-1/4 flex-shrink-0 mx-auto lg:mx-0 w-2/3 md:w-1/2">
            <img
              src={posterPath}
              alt={`Poster for ${title}`}
              className="w-full h-auto rounded-lg shadow-xl object-cover aspect-[2/3]" // Maintain aspect ratio
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-poster.png";
              }} // Fallback image
            />
          </div>

          {/* Right Side: Details */}
          <div className="lg:w-3/4 text-center lg:text-left">
            {/* Title and Basic Info */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {title}
            </h1>
            <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-400 mb-4 text-sm md:text-base">
              <span>{releaseYear}</span>
              {displayCertification !== "N/A" && (
                <>
                  <span>•</span>
                  <span className="border border-gray-500 px-1.5 rounded text-xs">
                    {displayCertification}
                  </span>
                </>
              )}
              {runtime && (
                <>
                  <span>•</span>
                  <span>{formatRuntime(runtime)}</span>
                </>
              )}
            </div>

            {/* Rating */}
            {rating !== "N/A" && (
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
                <span className="text-yellow-500 font-bold text-xl md:text-2xl">
                  ★ {rating}
                </span>
                <span className="text-gray-400 text-sm md:text-base">/ 10</span>
                <span className="text-gray-500 text-sm md:text-base">
                  ({voteCount.toLocaleString()} votes)
                </span>
              </div>
            )}

            {/* Genres */}
            {details.genres && details.genres.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                {details.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 text-gray-300 text-xs md:text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="inset-0 flex items-center justify-center mb-4 lg:hidden">
              {trailerKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full hover:bg-white/30 transition duration-300 text-lg z-10"
                  aria-label={`Watch trailer for ${title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Trailer
                </a>
              )}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-200">
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {details.overview || "No overview available."}
              </p>
            </div>

           
              <div className="mb-8">
                <Link
                  to="/"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition duration-300"
                >
                  Visit Homepage →
                </Link>
              </div>
            

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm md:text-base">
              {/* Release Date */}
              {releaseDate && (
                <div>
                  <strong className="font-semibold text-gray-200 block">
                    Release Date:
                  </strong>
                  <span className="text-gray-400">
                    {new Date(releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {/* Countries */}
              {details.production_countries &&
                details.production_countries.length > 0 && (
                  <div>
                    <strong className="font-semibold text-gray-200 block">
                      Countries:
                    </strong>
                    <span className="text-gray-400">
                      {details.production_countries
                        .map((c) => c.name)
                        .join(", ")}
                    </span>
                  </div>
                )}
              {/* Status */}
              {details.status && (
                <div>
                  <strong className="font-semibold text-gray-200 block">
                    Status:
                  </strong>
                  <span className="text-gray-400">{details.status}</span>
                </div>
              )}
              {/* Language */}
              {details.original_language && (
                <div>
                  <strong className="font-semibold text-gray-200 block">
                    Original Language:
                  </strong>
                  <span className="text-gray-400">
                    {new Intl.DisplayNames(["en"], { type: "language" }).of(
                      details.original_language
                    ) || details.original_language.toUpperCase()}
                  </span>
                </div>
              )}
              {/* Budget (Conditional) */}
              {details.budget > 0 && (
                <div>
                  <strong className="font-semibold text-gray-200 block">
                    Budget:
                  </strong>
                  <span className="text-gray-400">
                    {formatCurrency(details.budget)}
                  </span>
                </div>
              )}
              {/* Revenue (Conditional - only for movies) */}
              {mediaType === "movie" && details.revenue > 0 && (
                <div>
                  <strong className="font-semibold text-gray-200 block">
                    Revenue:
                  </strong>
                  <span className="text-gray-400">
                    {formatCurrency(details.revenue)}
                  </span>
                </div>
              )}
              {/* Tagline (Conditional) */}
              {details.tagline && (
                <div className="sm:col-span-2 lg:col-span-3">
                  {" "}
                  {/* Allow tagline to span more columns */}
                  <strong className="font-semibold text-gray-200 block">
                    Tagline:
                  </strong>
                  <span className="text-gray-400 italic">
                    "{details.tagline}"
                  </span>
                </div>
              )}
              {/* Production Companies */}
              {details.production_companies &&
                details.production_companies.length > 0 && (
                  <div className="sm:col-span-2 lg:col-span-3">
                    {" "}
                    {/* Allow companies to span more columns */}
                    <strong className="font-semibold text-gray-200 block mb-1">
                      Production Companies:
                    </strong>
                    <span className="text-gray-400">
                      {details.production_companies
                        .map((c) => c.name)
                        .join(", ")}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
