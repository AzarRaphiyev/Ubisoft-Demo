import { useEffect, useState } from "react";
import SlideControls from "./SlideControls";
import SlideContent from "./SlideContent";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sliderData = [
    {
      id: 1,
      title: "Last call for up to 75% Off!",
      category: "",
      btnType: "Shop now",
      image: 'https://ubiservices.cdn.ubi.com/748afbe7-1d05-43d8-bf4b-9aff7d389b7a/news/Connect_TopNews_SummerSale25_16x9.jpg?imWidth=1800',
      description: "Summer's almost over! Don't forget to redeem 100 Ubisoft Units for an additional 20% off your cart!"
    },
    {
      id: 2,
      title: "New Hero Reveal: Virtuosa",
      category: "For Honor",
      btnType: "Read more",
      image: 'https://static-news.ubisoft.com/news/content/prod/ForHonor/ForHonor_Virtuosa.jpg?imWidth=1800',
      description: "Their mastery of the rapier is often expressed through three distinct Postures, in addition to their signature Elusive Evasion."
    },
    {
      id: 3,
      title: "The Division 2 x Payday",
      category: "The Division 2",
      btnType: "Read more",
      image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3AfriM4QApkhmxGX6GQQyW/ef62fc3cf791f76d3cfc416faebc31b0/Payday_Event_Pass_Infographic.png.jpg?imWidth=1800',
      description: "Take a look at the new rewards in the Division 2 x Payday event!"
    },
    {
      id: 4,
      title: "Discover what is coming to AC Shadows this summer",
      category: "Assassin's Creed Shadows",
      btnType: "Read more",
      image: 'https://ubiservices.cdn.ubi.com/748afbe7-1d05-43d8-bf4b-9aff7d389b7a/news/ACSH_Claws_of_Awaji_textless_key_art.webp?imWidth=1800',
      description: "From the New Game+ mode coming July 29th, and the Claws of Awaji expansion releasing on September 16th, there will be a lot to enjoy!"
    }
  ];

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