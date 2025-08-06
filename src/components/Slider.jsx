import { useEffect, useState } from "react";
import SlideControls from "./SlideControls";
import SlideContent from "./SlideContent";

function Slider({sliderdata}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const sliderData = sliderdata
  // ✅ Son 4 elementi götür
  const displayedSlides = sliderData.slice(-4);

  // Avtomatik slayd dəyişməsi
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === displayedSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [isPaused, displayedSlides.length]);

  return (
    <div className="pt-[60px]">
      <div className="bg-gradient-to-b from-[#181818] to-[#18181800] rounded-xl overflow-hidden mx-auto top-[60px] w-[90vw]">
        <SlideContent slide={displayedSlides[currentIndex]} /> 
        <SlideControls 
          sliderData={displayedSlides} 
          setCurrentIndex={setCurrentIndex} 
          currentIndex={currentIndex}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </div>
    </div>
  );
}

export default Slider;