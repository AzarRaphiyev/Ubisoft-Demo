import React, { useContext, useEffect, useState } from 'react';
import DetailHeader from '../components/DetailHeader';
import { GameContext } from '../context/DataContext';
import { Link, useSearchParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../css/filter.css';
import { Navigation } from 'swiper/modules';
import Loader from '../components/Loader';
import FilterComponent from '../components/FilterComponent';
import { FaHeart, FaRegHeart, FaWindows } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

function Store() {
  const { gamedata, dlcdata, universedata } = useContext(GameContext);
  const [games, setGames] = useState([]);
  const [dlc, setDlc] = useState([]);
  const [universe, setUniverse] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [pricevalue, setPriceValue] = React.useState([0, 530]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({
    type: [],
    genre: [],
    brand: [],
    dlcType: [],
    productEdition: []
  });
  
  useEffect(() => {
    if (gamedata && dlcdata && universedata) {
      setGames(gamedata);
      setDlc(dlcdata);
      setUniverse(universedata);
    }
  }, [gamedata, dlcdata, universedata]);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });
 
  useEffect(() => {
    const combinedData = [...games, ...dlc];
    setFullData(combinedData);
  }, [games, dlc]);

  // Ana filter useEffect
  useEffect(() => {
    if (fullData.length === 0) return;

    let filtered = [...fullData];

    // Qiymət filtri
    filtered = filtered.filter(item =>
      Number(item.price) >= pricevalue[0] && Number(item.price) <= pricevalue[1]
    );

    // Type filtri (games/dlcs)
    if (selectedTypes.type.length > 0) {
      filtered = filtered.filter(item => {
        if (selectedTypes.type.includes('games') && item.type === 'basedgame') {
          return true;
        }
        if (selectedTypes.type.includes('dlcs') && item.type === 'DLC') {
          return true;
        }
        return false;
      });
    }

    // Genre filtri
    if (selectedTypes.genre.length > 0) {
      filtered = filtered.filter(item => {
        if (!item.genre || !Array.isArray(item.genre)) return false;
        return selectedTypes.genre.some(selectedGenre => 
          item.genre.includes(selectedGenre)
        );
      });
    }

    // Brand filtri
    if (selectedTypes.brand.length > 0) {
      filtered = filtered.filter(item => 
        selectedTypes.brand.includes(item.brand)
      );
    }

    // DLC Type filtri
    if (selectedTypes.dlcType.length > 0) {
      filtered = filtered.filter(item => 
        selectedTypes.dlcType.includes(item.typeDlc)
      );
    }

    // Product Edition filtri
    if (selectedTypes.productEdition.length > 0) {
      filtered = filtered.filter(item => 
        selectedTypes.productEdition.includes(item.productEdition)
      );
    }

    setFilteredData(filtered);
  }, [pricevalue, selectedTypes, fullData]);
  
  const toggleWishlistItem = (item) => {
    const exists = wishlist.some(i => i.id === item.id);
  
    let updatedWishlist;
    if (exists) {
      updatedWishlist = wishlist.filter(i => i.id !== item.id);
      toast.error( 
        <div className="flex items-center gap-3 min-w-[400px] ">
          <img
            src={item.cardImg}
            alt={item.title}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <p className=" font-semibold text-black">{item.title}</p>
            <p className="text-[#333] text-sm">Removed from wishlist</p>
          </div>
        </div>
      )
    } else {
      updatedWishlist = [...wishlist, item];
      toast.success('Oyun wishlist-ə əlavə olundu!')
    }
  
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };
  
  if (!gamedata?.length || !dlcdata?.length || !universe?.length) {
    return <Loader />;
  }

  const top10Games = games
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

    
    
  

  return (
    <div className='min-h-screen py-[30px] bg-gradient-to-b from-[#0E0D0E] via-[#150C15] to-[#0F131E]'>
      <Toaster position="top-right" />
      <DetailHeader />

      {/* Hero Banner */}
      <div
  className="w-full h-32 sm:h-48 md:h-60 lg:h-72 mt-17  bg-center bg-cover bg-no-repeat flex justify-center items-center relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
  style={{
    backgroundImage: `url("https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw63eef5dc/images/category-banners/CatBan_AC_Desk.jpg")`
  }}
>
  <div className="absolute inset-0 bg-black/40"></div>
  <div className="relative flex flex-col items-center gap-3 sm:gap-4 md:gap-5 text-white text-center px-4">
    <h1 className="ubisoft-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Ubisoft Games</h1>
    <p className="ubisoft-text text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
      Buy, download and play our latest releases, best sellers and free games!
    </p>
  </div>
</div>


      {/* Universe Section */}
      <div className='my-8 sm:my-12 md:my-16 mx-4 sm:mx-6 md:mx-8'>
        <div className='mb-6 sm:mb-8'>
          <h3 className='open-sans-text text-xl sm:text-2xl md:text-3xl text-white'>Visit Ubisoft's universes</h3>
          <hr className='h-1 border-3 w-12 sm:w-16 md:w-20 mt-2'/>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {universe.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='bg-[#] overflow-hidden '>
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

      {/* Must-own games Section */}
      <div className='my-8 sm:my-12 md:my-16 mx-4 sm:mx-6 md:mx-8'>
        <div className='mb-6 sm:mb-8'>
          <h3 className='open-sans-text text-xl sm:text-2xl md:text-3xl text-white'>Must-own games</h3>
          <hr className='h-1 border-3 w-12 sm:w-16 md:w-20 mt-2'/>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {top10Games.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='bg-[#242424] overflow-hidden '>
                <div className='overflow-hidden w-full'>
                  <div className='bg-[#fff] overflow-hidden'>
                    <div className='overflow-hidden w-full'>
                      <Link to={`/detail/${item.type}/${item.id}`}>
                        <img src={item.cardImg} className='w-full hover:scale-110 duration-300' alt="" />
                      </Link>
                    </div>
                    <div className='p-2 sm:p-3 flex flex-col justify-between'>
                      <div className='flex flex-col text-left'>
                        <h1 className='text-black ubisoft-bold text-sm sm:text-base'>
                          {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                        </h1>
                        <h1 className='text-[#b5b5b5] text-xs sm:text-sm ubisoft-bold'>{item.productEdition}</h1>
                      </div>
                      <h1 className='text-black ubisoft-bold text-right mt-4 text-sm sm:text-base'>
                        {item.price == 0 ? "Free" : "€" + item.price}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content with Filters */}
      <div className='w-full px-4 sm:px-6 md:px-8 my-12 sm:my-16 md:my-20'>
        {/* Mobile Filter Toggle */}
        <div className='lg:hidden mb-4'>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors'
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
            </svg>
            Filters ({Object.values(selectedTypes).reduce((total, arr) => total + arr.length, 0)})
          </button>
        </div>

        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
          {/* Filter Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterComponent 
              pricevalue={pricevalue} 
              setPriceValue={setPriceValue} 
              fulldata={fullData} 
              selectedTypes={selectedTypes} 
              setSelectedTypes={setSelectedTypes} 
            />
          </div>

          {/* Games Grid */}
          <div className='flex-1'>
            <div className="text-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl">All Games</h3>
                <p className="text-gray-400 text-sm sm:text-base">({filteredData.length} results)</p>
              </div>
              
              {filteredData.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="text-gray-400 text-lg sm:text-xl mb-2">No games found matching your criteria.</div>
                  <div className="text-gray-500 text-sm sm:text-base">Try adjusting your filters.</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                 {filteredData.map((item, index) => (
                    <div
                      key={index}
                      className='bg-[#242424] overflow-hidden  hover:transform hover:scale-105 transition-all duration-300'
                    >
                      <div className='overflow-hidden w-full h-full'>
                        <div className='bg-[#fff] overflow-hidden h-full flex flex-col justify-between'>



                        <div className='overflow-hidden w-full relative group'>
                        <Link to={`/detail/${item.type}/${item.id}`}>
                          <img
                            src={item.cardImg}
                            className='w-full hover:scale-110 duration-300'
                            alt=""
                          />
                        </Link>

                          <Link
                            to={`/detail/${item.type}/${item.id}`}
                            className='absolute opacity-0 group-hover:opacity-100 hidden xl:flex lg:flex  duration-100 top-0 left-0 bg-black/70 w-full h-full z-30  items-center justify-center text-white'
                          >
                            <div
                              className='absolute top-5 right-5 z-40'
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlistItem(item);
                              }}
                            >
                              {wishlist.some(i => i.id === item.id) ? (

                                <div>
                                  <FaHeart className="text-white cursor-pointer hover:scale-110 duration-300 " size={20} />
                                  
                                </div>
                              ) : (
                                <FaRegHeart className="text-white cursor-pointer hover:scale-110 duration-300 " size={20} />
                              )}
                            </div>

                            <div className='absolute top-[70%] right-[50%] translate-x-[50%]'>
                              <FaWindows className="text-white hover:scale-110 duration-300 " size={25} />
                            </div>
                          </Link>
                          <div
                              className='absolute xl:hidden lg:hidden flex top-5 right-5 z-10'
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlistItem(item);
                              }}
                            >
                              {wishlist.some(i => i.id === item.id) ? (
                                <FaHeart className="text-white cursor-pointer" size={25} />
                              ) : (
                                <FaRegHeart className="text-white cursor-pointer" size={25} />
                              )}
                            </div>
                        </div>

                          


                          <div className='p-3 sm:p-4 flex flex-col justify-between flex-grow'>
                            <div className='flex flex-col text-left'>
                              <div className='flex gap-2 items-start   mb-2'>
                                {(item.type === "DLC") && (
                                  <div className='py-1 px-2 bg-black rounded-lg  text-xs text-white ubisoft-bold whitespace-nowrap h-fit'>
                                    DLC
                                  </div>
                                )}
                                <h1 className='text-black ubisoft-bold text-sm sm:text-base leading-tight'>
                                  {item.title.length > 25 ? item.title.slice(0, 25) + '...' : item.title}
                                </h1>
                              </div>

                              {(item.type === "DLC") ? (
                                <h1 className='text-[#b5b5b5] text-xs sm:text-sm ubisoft-bold'>
                                  {item.typeDlc}
                                </h1>
                              ) : (
                                <h1 className='text-[#b5b5b5] text-xs sm:text-sm ubisoft-bold'>
                                  {item.productEdition}
                                </h1>
                              )}
                            </div>

                            <div className='flex items-center justify-end mt-4'>
                              <h1 className='text-black ubisoft-bold text-base sm:text-lg'>
                                {item.price === 0 ? "Free" : "€" + item.price}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;