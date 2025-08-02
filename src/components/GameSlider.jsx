import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './gameslider.css';

import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { FaPlay } from 'react-icons/fa';

function GameSlider({screenshots,videos}) {
  return (
    <>
      <Swiper
        slidesPerView={1} // ✅ Kiçik ekranlar üçün default dəyər
        spaceBetween={20} // ✅ Default spaceBetween
        freeMode={true}
        pagination={{
            clickable: true,
        }}
        navigation={true}
        grabCursor={true}
        breakpoints={{
            320: { // ✅ Çox kiçik telefonlar
                slidesPerView: 1,
                spaceBetween: 10,
            },
            480: { // ✅ Kiçik telefonlar
                slidesPerView: 1.5,
                spaceBetween: 15,
            },
            640: { // ✅ Böyük telefonlar
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: { // ✅ Tabletlər
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: { // ✅ Kiçik desktop
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1280: { // ✅ Böyük desktop
                slidesPerView: 5,
                spaceBetween: 50,
            }
        }}
        loop={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
      >

        {videos.map(item=>

          <SwiperSlide>
          <img
             src={`https://img.youtube.com/vi/${item?.split("v=")[1]}/0.jpg`}
            className="w-[100%]"
            alt="Game 1"
          />
          <div className='absolute z-3 p-3 bg-[#fff] text-black rounded-[50%]'> 
          <FaPlay  size={20}/>
          </div>
          </SwiperSlide>

        )}
        {screenshots.map(item=>

          <SwiperSlide>
          <img
            src={item}
            className="w-[100%]"
            alt="Game 1"
          />
          </SwiperSlide>

        )}
       

        
       
      </Swiper>
    </>
  );
}

export default GameSlider;