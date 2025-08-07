import React, { useEffect, useState } from 'react'
import PriceFilter from './PriceFilter';
import { useSearchParams } from 'react-router';

function FilterComponent({pricevalue,setPriceValue,fulldata,selectedTypes,setSelectedTypes}) {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("free") === "true") {
      setPriceValue([0, 0]);
    }
  }, [searchParams]);

    const [openSections, setOpenSections] = useState({
      price: true,
      type: true,
      genre: false,
      brand: false,
      game: false,
      dlcType: false,
      productEdition: false
    });

    const allGenres = fulldata.flatMap(item => item.genre || []);
    const uniqueGenres = [...new Set(allGenres)];
    const allBrands = fulldata.map(item => item.brand).filter(Boolean);
    const uniqueBrands = [...new Set(allBrands)];
    const allDlcTypes = fulldata.map(item => item.typeDlc).filter(Boolean);
    const uniqueDlcTypes = [...new Set(allDlcTypes)];
    const allProductEditions = fulldata.map(item => item.productEdition).filter(Boolean);
    const uniqueProductEditions = [...new Set(allProductEditions)];

    const toggleSection = (section) => {
      setOpenSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };
  
    const toggleType = (category, value) => {
        setSelectedTypes(prev => {
            const currentValues = prev[category] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            
            return {
                ...prev,
                [category]: newValues
            };
        });
    };

    // Bütün seçilmiş filterləri təmizləmək üçün
    const clearAllFilters = () => {
        setSelectedTypes({
            type: [],
            genre: [],
            brand: [],
            dlcType: [],
            productEdition: []
        });
        setPriceValue([0, 530]);
    };

    // Seçilmiş filterin sayını hesablamaq üçün
    const getTotalSelectedCount = () => {
        return Object.values(selectedTypes).reduce((total, arr) => total + arr.length, 0);
    };
  
    return (
      <div className="w-full bg-white border border-gray-300 shadow-lg rounded-lg sticky top-4 ">
        {/* Header */}
        <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Filter</h2>
          {getTotalSelectedCount() > 0 && (          
           <button 
             onClick={clearAllFilters} 
             className="text-xs sm:text-sm text-blue-500 underline cursor-pointer hover:text-blue-700 transition-colors px-2 py-1 rounded"
           >
             Clear all
           </button>
          )}
        </div>
  
        {/* Filter Content */}
        <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-5 lg:space-y-6 max-h-[70vh] lg:max-h-[80vh] overflow-y-auto scrollbar-hide">
          
          {/* Price Section */}
          <div className="border-b border-gray-100 pb-4">
            <div 
              className="flex items-center justify-between mb-3 sm:mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => toggleSection('price')}
            >
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Price</h3>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 transform transition-transform duration-200 ${openSections.price ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {openSections.price && (
              <div className="px-2">
                <PriceFilter pricevalue={pricevalue} setPriceValue={setPriceValue}/>
              </div>
            )}
          </div>
  
          {/* Type Section */}
          <div className="border-b border-gray-100 pb-4">
            <div 
              className="flex items-center justify-between mb-3 sm:mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => toggleSection('type')}
            >
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Type</h3>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 transform transition-transform duration-200 ${openSections.type ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {openSections.type && (
              <div className="space-y-2 sm:space-y-3 px-2">
                <label 
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => toggleType('type', 'games')}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-600 rounded flex items-center justify-center flex-shrink-0">
                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.type.includes('games') ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  <span className="ml-3 text-cyan-600 font-medium text-sm sm:text-base">
                    Games ({fulldata.filter(item => item.type === "basedgame").length})
                  </span>
                </label>
                <label 
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => toggleType('type', 'dlcs')}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-600 rounded flex items-center justify-center flex-shrink-0">
                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.type.includes('dlcs') ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  <span className="ml-3 text-cyan-600 font-medium text-sm sm:text-base">
                    DLCs ({fulldata.filter(item => item.type === "DLC").length})
                  </span>
                </label>
              </div>
            )}
          </div>
  
          {/* Genre Section */}
          <div className="border-b border-gray-100 pb-4">
            <div 
              className="flex items-center justify-between mb-3 sm:mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => toggleSection('genre')}
            >
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Genre</h3>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 transform transition-transform duration-200 ${openSections.genre ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {openSections.genre && (
              <div className="space-y-2 sm:space-y-3 max-h-48 overflow-y-auto px-2 scrollbar-hide">
                {uniqueGenres.map((genre) => (
                  <label 
                    key={genre}
                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => toggleType('genre', genre)}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-600 rounded flex items-center justify-center flex-shrink-0">
                      <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.genre.includes(genre) ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className="ml-3 text-cyan-600 font-medium text-sm sm:text-base break-words">
                      {genre} ({fulldata.filter(item => item.genre && item.genre.includes(genre)).length})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Section */}
          <div className="border-b border-gray-100 pb-4">
            <div 
              className="flex items-center justify-between mb-3 sm:mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => toggleSection('brand')}
            >
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Brand</h3>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 transform transition-transform duration-200 ${openSections.brand ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {openSections.brand && (
              <div className="space-y-2 sm:space-y-3 px-2">
                {uniqueBrands.map((brand) => (
                  <label 
                    key={brand}
                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => toggleType('brand', brand)}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-600 rounded flex items-center justify-center flex-shrink-0">
                      <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.brand.includes(brand) ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className="ml-3 text-cyan-600 font-medium text-sm sm:text-base">
                      {brand} ({fulldata.filter(item => item.brand === brand).length})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* DLC Type Section */}
          <div className="border-b border-gray-100 pb-4">
            <div 
              className="flex items-center justify-between mb-3 sm:mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => toggleSection('dlcType')}
            >
              <h3 className="text-base sm:text-lg font-medium text-gray-900">DLC Type</h3>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 transform transition-transform duration-200 ${openSections.dlcType ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {openSections.dlcType && (
              <div className="space-y-2 sm:space-y-3 px-2">
                {uniqueDlcTypes.map((dlcType) => (
                  <label 
                    key={dlcType}
                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => toggleType('dlcType', dlcType)}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-600 rounded flex items-center justify-center flex-shrink-0">
                      <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.dlcType.includes(dlcType) ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className="ml-3 text-cyan-600 font-medium text-sm sm:text-base">
                      {dlcType} ({fulldata.filter(item => item.typeDlc === dlcType).length})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Product Editions Section */}
          <div>
            <div 
              className="flex items-center justify-between mb-3 sm:mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => toggleSection('productEdition')}
            >
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Product Editions</h3>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 transform transition-transform duration-200 ${openSections.productEdition ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {openSections.productEdition && (
              <div className="space-y-2 sm:space-y-3 px-2">
                {uniqueProductEditions.map((editions) => (
                  <label 
                    key={editions}
                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => toggleType('productEdition', editions)}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-600 rounded flex items-center justify-center flex-shrink-0">
                      <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.productEdition.includes(editions) ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className="ml-3 text-cyan-600 font-medium text-sm sm:text-base">
                      {editions} ({fulldata.filter(item => item.productEdition === editions).length})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default FilterComponent