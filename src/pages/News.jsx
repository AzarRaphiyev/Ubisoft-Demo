import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/DataContext';
import { Link } from 'react-router';

function News() {
  const [newsdata, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [availableGames, setAvailableGames] = useState([]);
  const { news } = useContext(GameContext);

 

  useEffect(() => {
    const dataToUse = news && news.length > 0 ? news : mockNews;

    
    const sortedData = [...dataToUse].sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );

    setNewsData(sortedData);
    setFilteredNews(sortedData);

    // Uniq gameBrand-ləri çıxart
    const gamesFromNews = Array.from(
      new Set(
        sortedData.flatMap(item =>
          Array.isArray(item.gameBrand) ? item.gameBrand : [item.gameBrand]
        )
      )
    );
    setAvailableGames(gamesFromNews);
  }, [news]);

  const handleFilterToggle = (game) => {
    let newFilters;
    if (selectedFilters.includes(game)) {
      newFilters = selectedFilters.filter(f => f !== game);
    } else {
      newFilters = [...selectedFilters, game];
    }
    setSelectedFilters(newFilters);
  };

  const applyFilters = () => {
    if (selectedFilters.length === 0) {
      setFilteredNews(newsdata);
    } else {
      const filtered = newsdata.filter(item =>
        selectedFilters.includes(item.gameBrand)
      );
      setFilteredNews(filtered);
    }
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setFilteredNews(newsdata);
  };

  return (
    <div className="  py-[60px] bg-[#0D0D0D]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900 py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white">Latest News</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-[#0D0D0D] py-4 ">
        <div className="container2 mx-auto  px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <Link to={'/'} className="text-gray-400"> Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-white font-medium">News</span>
          </div>
          <div className="flex items-center space-x-4">
           
            <button
              onClick={() => setShowFilters(true)}
              className="flex  cursor-pointer items-center space-x-2 cursor-pointe text-white "
            >
              <img className='w-[20px]' src="https://cdn-icons-png.flaticon.com/128/11741/11741061.png" alt="" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center  justify-center z-50"
          onClick={() => setShowFilters(false)} // backdrop-a klik edəndə bağla
        >
          <div
            className="bg-gray-800 rounded-lg p-6 w-96 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // modal içində klik olarsa bağlama
          >
            <h3 className="text-white font-bold text-lg mb-4">Filters</h3>
            <div className="space-y-3">
              {availableGames.map((game, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300 cursor-pointer">{game}</span>
                  <button
                    onClick={() => handleFilterToggle(game)}
                    className={`w-5 h-5 cursor-pointer border-2 rounded flex items-center justify-center ${
                      selectedFilters.includes(game)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedFilters.includes(game) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={clearFilters}
                className="flex-1 bg-gray-600 cursor-pointer hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Clear filters
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="container2 mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/60 rounded-lg overflow-hidden hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.sectionImg}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x200/4B5563/FFFFFF?text=${encodeURIComponent(item.gameBrand)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-4">
                <div className="text-xs text-blue-400 uppercase font-semibold mb-2 tracking-wide">
                  {item.gameBrand}
                </div>
                <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="text-gray-500 text-xs">
                  {item.daysAgo}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No news found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
