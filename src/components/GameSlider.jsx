import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './gameslider.css';

import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { FaPlay } from 'react-icons/fa';
import ImageSliderDet from './ImageSliderDet';
import VideoSliderDet from './VideoSliderDet';

function GameSlider({ screenshots, videos }) {
  const [onClose, SetOnClose] = useState(false);
  const [onCloseVideo, SetOnCloseVideo] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [startIndexVideo, setStartIndexVideo] = useState(0);

  const handleImageClick = (index) => {
    setStartIndex(index);
    SetOnClose(true);
  };
  const handleVideoClick = (index) => {
    setStartIndexVideo(index);
    SetOnCloseVideo(true);
  };

  return (
    <div className='w-[90%] mx-auto'>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        grabCursor={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 35,
          }
        }}
        loop={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
      >
        {videos.map((item, index) =>
          <SwiperSlide key={`video-${index}`}>
            <img
             onClick={() => handleVideoClick(index)}
              src={`https://img.youtube.com/vi/${item?.split("v=")[1]}/0.jpg`}
              className="w-[90%]"
              alt={`Video ${index + 1}`}
            />
            <div onClick={() => handleVideoClick(index)} className='absolute cursor-pointer'>
              <FaPlay   size={20} />
            </div>
          </SwiperSlide>
        )}

        {screenshots.map((item, index) =>
          <SwiperSlide key={`screenshot-${index}`}>
            <img
              onClick={() => handleImageClick(index)}
              src={item}
              className="w-[80%] cursor-pointer"
              alt={`Screenshot ${index + 1}`}
            />
          </SwiperSlide>
        )}
      </Swiper>

      

      {onCloseVideo && (
        <VideoSliderDet
          videos={videos}
          startIndexVideo={startIndexVideo}
          onCloseVideo={onCloseVideo}
          SetOnCloseVideo={SetOnCloseVideo}
        />
      )}
      {onClose && (
        <ImageSliderDet
          screenshots={screenshots}
          startIndex={startIndex}
          onClose={onClose}
          SetOnClose={SetOnClose}
        />
      )}
    </div>
  );
}

export default GameSlider;
