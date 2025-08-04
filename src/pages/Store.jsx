import React, { useContext, useEffect, useState } from 'react';
import DetailHeader from '../components/DetailHeader';
import { GameContext } from '../context/DataContext';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../css/filter.css';
import { Navigation } from 'swiper/modules';
import Loader from '../components/Loader';
import FilterComponent from '../components/FilterComponent';



function Store() {
  const { gamedata, dlcdata, universedata } = useContext(GameContext);
  const [games, setGames] = useState([]);
  const [dlc, setDlc] = useState([]);
  const [universe, setUniverse] = useState([]);
  useEffect(() => {
      if (gamedata && dlcdata && universedata) {
          setGames(gamedata);
          setDlc(dlcdata);
          setUniverse(universedata);
        }
    }, [gamedata, dlcdata, universedata]);
    
    if (!gamedata?.length || !dlcdata?.length || !universe?.length) {
        return <Loader />;
    }
    
    const fullData = [...games, ...dlc];
    console.log(fullData);
    
  const top10Games = games
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

  return (
    <div className='min-h-[400vh] py-[58px] bg-gradient-to-b from-[#0E0D0E] via-[#150C15] to-[#0F131E]'>
      <DetailHeader />

      <div
        className="w-[100%] h-[300px] mt-[90px] bg-center flex justify-center items-center 
                   bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw63eef5dc/images/category-banners/CatBan_AC_Desk.jpg')"
        }}
      >
        <div className="flex flex-col items-center gap-5 text-white text-center px-4">
          <h1 className="ubisoft-bold text-4xl">Ubisoft Games</h1>
          <p className="ubisoft-text text-lg">
            Buy, download and play our latest releases, best sellers and free games!
          </p>
        </div>
      </div>

      <div className='my-[20px] mx-auto ml-[30px]'>
        <div className='mb-10'>
          <h3 className='open-sans-text text-[28px]'>Visit Ubisoft's universes</h3>
          <hr className='h-[5px] border-[3px] w-[60px]'/>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {universe.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='bg-[#242424] overflow-hidden'>
                <div className='overflow-hidden w-full'>
                  <Link to={`/`}>
                    <img
                      src={item.cardImg}
                      className='hover:scale-110 duration-300 w-full h-auto'
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='my-[20px] mx-auto ml-[30px]'>
        <div className='mb-10'>
          <h3 className='open-sans-text text-[28px]'>Must-own games</h3>
          <hr className='h-[5px] border-[3px] w-[60px]'/>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {top10Games.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='bg-[#242424] overflow-hidden'>
                <div className='overflow-hidden w-full'>
                  <Link to={`/`}>
                    <div className='bg-[#fff] overflow-hidden min-w-[200px]'>
                      <div className='overflow-hidden w-[100%]'>
                        <Link to={`/detail/${item.type}/${item.id}`}>
                          <img src={item.cardImg} className='w-[250px] hover:scale-110 duration-300' alt="" />
                        </Link>
                      </div>
                      <div className='p-[8px] flex flex-col justify-between'>
                        <div className='flex flex-col text-left'>
                          <h1 className='text-black ubisoft-bold '>
                            {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                          </h1>
                          <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.productEdition}</h1>
                        </div>
                        <h1 className='text-black ubisoft-bold text-right mt-[30px] '>{item.price == 0 ? "Free" : "€" + item.price}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='flex w-[95%] mx-auto my-20'>
        <div className='w-[25%]'>
          <FilterComponent />
        </div>
        <div className='w-[70%] pl-8'>
          {/* Burada oyun listesi gösterilecek */}
          <div className="text-white">
            <h3 className="text-2xl mb-4">All Games</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {fullData.map(item =>(
                <div className='bg-[#242424] overflow-hidden'>
                <div className='overflow-hidden w-full'>
                  <Link to={`/`}>
                    <div className='bg-[#fff] overflow-hidden min-w-[200px]'>
                      <div className='overflow-hidden w-[100%]'>
                        <Link to={`/detail/${item.type}/${item.id}`}>
                          <img src={item.cardImg} className='w-[250px] hover:scale-110 duration-300' alt="" />
                        </Link>
                      </div>
                      <div className='p-[8px] flex flex-col justify-between'>
                        <div className='flex flex-col text-left'>

                       <div className='flex gap-3'>
                         {(item.type=="DLC")? <div className='py-1 px-3 bg-black rounded-4xl text-[10px] text-white ubisoft-bold'>Dlc</div>:""}
                           <h1 className='text-black ubisoft-bold '>
                        
                             {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                           </h1>
                       </div>

                          {(item.type=="DLC")? 
                          <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.typeDlc}</h1>:
                          <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.productEdition}</h1>}
                        </div>
                        <div className='flex items-center justify-between'>
                        <h1 className='text-black ubisoft-bold  mt-[30px] '>{item.price == 0 ? "Free" : "€" + item.price}</h1>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;