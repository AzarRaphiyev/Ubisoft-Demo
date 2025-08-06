import React, { useState, useEffect } from 'react';
import { TiMediaPause, TiMediaPlay } from 'react-icons/ti';

function SlideControls({ sliderData, setCurrentIndex, currentIndex, isPaused, setIsPaused }) {
  const [progress, setProgress] = useState(0);
  const [progressKey, setProgressKey] = useState(Date.now());

  useEffect(() => {
    if (isPaused) return;

    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + (100 / (10000 / 50))));
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, progressKey]);

  if (!sliderData || sliderData.length === 0) return null;

  const handleItemClick = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePause = (e) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
    setProgressKey(Date.now());
  };

  return (
    <div className="flex flex-wrap z-20 relative justify-center gap-[20px] top-[-5px]">
      {sliderData.map((item, index) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(index)}
          className={`flex relative gap-[10px] rounded-[20px] py-[15px] px-[15px] cursor-pointer hover:opacity-80 transition-all duration-300
          w-[48%] sm:w-[48%] md:w-[30%] lg:w-[21%] min-w-0 overflow-hidden
          ${currentIndex === index ? 'bg-[#2a2a2a]' : 'bg-[#201F20]'}`}
        >
          {/* Progress Bar */}
          {currentIndex === index && (
            <div className="absolute top-0 left-0 w-full h-[100px] bg-[#404040]">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 opacity-30 to-purple-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

         

          {/* Image Container */}
          <div className="relative flex-shrink-0 w-[65px] h-[55px] md:w-[75px] md:h-[60px] z-[11]">
            <img
              src={item.image}
              className="w-full h-full rounded-2xl object-cover"
              alt=""
            />
             {/* Play/Pause Button */}
          {currentIndex === index && (
            <div 
              onClick={togglePause}
              className='absolute left-[50%] translate-x-[-50%]   top-[50%] translate-y-[-50%] bg-[#838282]/75 hover:bg-[#838282]/100 p-2 rounded-full z-50 transition-all duration-200'
            >
              {isPaused ? 
                <TiMediaPlay size={20} className='text-[#fff] ml-0.5' /> : 
                <TiMediaPause size={20} className='text-[#fff]' />
              }
            </div>
          )}
            
            {/* ✅ Aktiv element üçün qaraltma overlay */}
            {currentIndex === index && (
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-2xl" />
            )}
          </div>

          <div className="flex flex-col z-[11] text-white overflow-hidden">
            <p className="text-[#b5b5b5] text-[12px] md:text-[13px] font-bold truncate">
              {item.category}
            </p>
            <h1 className={`text-[13px] md:text-[14px] font-bold truncate ${
              currentIndex === index ? 'text-white' : 'text-[#b5b5b5]'
            }`}>
              {item.title}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlideControls;