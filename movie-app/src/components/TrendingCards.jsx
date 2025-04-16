
import { useState, useEffect } from 'react';
import TrendingCard from './TrendingCard.jsx';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`;

export default function TrendingCards() {
  const [trendingItems, setTrendingItems] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {

      try {
        const response = await fetch(TRENDING_URL);
        const data = await response.json();
        setTrendingItems(data.results ? data.results.slice(0, 5) : []);
      } catch (e) {
        console.error("Failed to fetch trending items:", e);
        setTrendingItems([]);
      }
    };

    fetchTrending();
  }, []); 

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8 "> 
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Trending This Week
      </h2>

        <div className="flex space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto overflow-y-hidden pb-4 -mb-4  gap-8 lg:gap-12 2xl:gap-24 ">
          {trendingItems.map((item, index) => (
            <TrendingCard key={item.id} item={item} rank={index + 1} />
          ))}
        </div>
    
    </div>
  );
}
