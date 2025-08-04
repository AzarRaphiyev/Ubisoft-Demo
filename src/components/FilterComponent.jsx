import React, { useState } from 'react'

function FilterComponent() {
    const [priceRange, setPriceRange] = useState([0, 530]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [openSections, setOpenSections] = useState({
      price: true,
      type: true,
      genre: false,
      brand: false,
      game: false,
      dlcType: false,
      productEdition: false
    });
  
    const toggleSection = (section) => {
      setOpenSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };
  
    const toggleType = (type) => {
      setSelectedTypes(prev => 
        prev.includes(type) 
          ? prev.filter(t => t !== type)
          : [...prev, type]
      );
    };
  
    return (
      <div className="w-80 bg-white border border-gray-300 shadow-lg">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
        </div>
  
        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Price Section */}
          <div>
            <div 
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => toggleSection('price')}
            >
              <h3 className="text-base font-medium text-gray-900">Price</h3>
              <svg 
                className={`w-4 h-4 text-cyan-600 transform transition-transform duration-200 ${openSections.price ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {openSections.price && (
              <>
                {/* Range Slider Visual */}
                <div className="relative mb-4">
                  <div className="w-full h-1 bg-cyan-600 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-600 rounded-full border-2 border-white shadow-md transform -translate-y-1.5 cursor-pointer"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-600 rounded-full border-2 border-white shadow-md transform -translate-y-1.5 cursor-pointer"></div>
                </div>
                
                {/* Price Labels */}
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-600 font-medium">{priceRange[0]}€</span>
                  <span className="text-cyan-600 font-medium">{priceRange[1]}€</span>
                </div>
              </>
            )}
          </div>
  
          {/* Type Section */}
          <div>
            <div 
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => toggleSection('type')}
            >
              <h3 className="text-base font-medium text-gray-900">Type</h3>
              <svg 
                className={`w-4 h-4 text-cyan-600 transform transition-transform duration-200 ${openSections.type ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {openSections.type && (
              <div className="space-y-3">
                <label 
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleType('games')}
                >
                  <div className="w-4 h-4 border-2 border-cyan-600 rounded flex items-center justify-center">
                    <div className={`w-2 h-2 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.includes('games') ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  <span className="ml-3 text-cyan-600 font-medium">Games (307)</span>
                </label>
                <label 
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleType('dlcs')}
                >
                  <div className="w-4 h-4 border-2 border-cyan-600 rounded flex items-center justify-center">
                    <div className={`w-2 h-2 bg-cyan-600 rounded-sm transition-opacity duration-200 ${selectedTypes.includes('dlcs') ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  <span className="ml-3 text-cyan-600 font-medium">DLCs (373)</span>
                </label>
              </div>
            )}
          </div>
  
          {/* Other Sections */}
          
        </div>
      </div>
    );
}

export default FilterComponent