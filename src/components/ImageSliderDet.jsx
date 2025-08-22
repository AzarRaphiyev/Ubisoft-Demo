import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ImageSliderDet = ({ screenshots, startIndex = 0, onClose, SetOnClose }) => {
  const [currentImage, setCurrentImage] = useState(startIndex);

  const images = screenshots || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        SetOnClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[200]">
      <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
        
        <button 
          className="absolute top-6 cursor-pointer right-6 z-10 text-white hover:text-gray-300 transition-colors duration-200"
          onClick={() => SetOnClose(false)}
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <button
          onClick={prevImage}
          className="absolute left-4 cursor-pointer md:left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full p-3 md:p-4 text-black transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={30} strokeWidth={2.5} />
        </button>

        <button
          onClick={nextImage}
          className="absolute text-black cursor-pointer right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full p-3 md:p-4 transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={30} strokeWidth={2.5} />
        </button>

        <div className="relative w-full h-full max-h-[90vh] mx-8 md:mx-16">
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <img
              src={images[currentImage]}
              alt={`Screenshot ${currentImage + 1}`}
              className="w-[90%] h-[80%] flex flex-col mx-auto absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] justify-center items-center object-cover transition-opacity duration-500"
              style={{
                filter: 'brightness(0.9) contrast(1.1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
            {currentImage + 1}/{images.length}
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImage
                    ? 'bg-white scale-125'
                    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-6 left-6 text-white text-xs opacity-60">
        <div>← → keys to navigate, ESC to close</div>
      </div>
    </div>
  );
};

export default ImageSliderDet;
