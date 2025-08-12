import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ReactPlayer from 'react-player';

const VideoSliderDet = ({ videos, startIndexVideo = 0, onCloseVideo, SetOnCloseVideo }) => {
  const [currentImage, setCurrentImage] = useState(startIndexVideo);

  const media = videos || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + media.length) % media.length);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  // Klaviatura naviqasiyası
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        SetOnCloseVideo(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (media.length === 0) return null;

  // URL-in video olub olmadığını yoxlamaq (YouTube, Vimeo və s.)
  const isVideo = (url) => {
    return (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('vimeo.com') ||
      url.endsWith('.mp4') ||
      url.endsWith('.webm')
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[200]">
      <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
        
        {/* Close Button */}
        <button 
          className="absolute cursor-pointer top-6 right-6 z-10 text-white hover:text-gray-300 transition-colors duration-200"
          onClick={() => SetOnCloseVideo(false)}
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        {/* Left Navigation */}
        <button
          onClick={prevImage}
          className="absolute cursor-pointer left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full p-3 md:p-4 text-black transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={30} strokeWidth={2.5} />
        </button>

        {/* Right Navigation */}
        <button
          onClick={nextImage}
          className="absolute cursor-pointer text-black right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full p-3 md:p-4 transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={30} strokeWidth={2.5} />
        </button>

        {/* Main Media (Video və ya Şəkil) */}
        <div className="relative w-full h-full max-h-[90vh] mx-8 md:mx-16 flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden rounded-lg flex items-center justify-center">
            {isVideo(media[currentImage]) ? (
              <ReactPlayer
                src={media[currentImage]}
                controls
                playing
                width="80%"
                height="80%"
              />
            ) : (
              <img
                src={media[currentImage]}
                alt={`Screenshot ${currentImage + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{ filter: 'brightness(0.9) contrast(1.1)' }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
            {currentImage + 1}/{media.length}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {media.map((_, index) => (
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

      {/* Keyboard Hint */}
      <div className="absolute top-6 left-6 text-white text-xs opacity-60">
        ← → keys to navigate, ESC to close
      </div>
    </div>
  );
};

export default VideoSliderDet;
