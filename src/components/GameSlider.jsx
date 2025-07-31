import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './gameslider.css';

import { FreeMode, Pagination, Navigation } from 'swiper/modules';

function GameSlider() {
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
        <SwiperSlide>
          <img
            src="https://store.ubisoft.com/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw0f6f4477/images/large/673b49019baa3f5f7f025a29-pc.jpg?sw=500&sh=270&sm=fit"
            className="w-[100%]"
            alt="Game 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <span>Game 2</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <span>Game 2</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <span>Game 2</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <span>Game 2</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <span>Game 2</span>
          </div>
        </SwiperSlide>
       
      </Swiper>
    </>
  );
}

export default GameSlider;