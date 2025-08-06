import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './gameslider.css';

import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { FaPlay } from 'react-icons/fa';

function GameSlider({screenshots, videos}) {
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
               src={`https://img.youtube.com/vi/${item?.split("v=")[1]}/0.jpg`}
              className="w-[100%]"
              alt={`Video ${index + 1}`}
            />
            <div className='absolute'> 
              <FaPlay size={20}/>
            </div>
          </SwiperSlide>
        )}
        
        {screenshots.map((item, index) =>
          <SwiperSlide key={`screenshot-${index}`}>
            <img
              src={item}
              className="w-[100%]"
              alt={`Screenshot ${index + 1}`}
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default GameSlider;