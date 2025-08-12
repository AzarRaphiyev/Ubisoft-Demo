import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import GameSlider from '../components/GameSlider';
import DetailHeader from '../components/DetailHeader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getAllGames, getDLCsById, getGamesById } from '../services/GameService';
import Loader from '../components/Loader';
import { ChevronRight } from 'lucide-react';
import SystemRequit from '../components/SystemRequit';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { updateGame } from "../services/GameadminService";
import ImageSliderDet from '../components/ImageSliderDet';

async function increaseViewCount(gameId) {
  try {
    const game = await getGamesById(gameId);
    const updatedGame = { ...game, viewCount: (game.viewCount || 0) + 1 };
    await updateGame(gameId, updatedGame);
    return updatedGame;
  } catch (error) {
    console.error("ViewCount artırılarkən xəta:", error);
    return null;
  }
}

function Detail() {
  const [relatedGames, setRelatedGames] = useState([]);
  const [isAlreadyInWishlist, setIsAlreadyInWishlist] = useState(false);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [systemReq, setSystemReq] = useState("minimum");
  const [user, setUser] = useState(null);
  const [obj, setObj] = useState(null);
  
  const { type, id } = useParams();

  // User məlumatlarını yükləmək
  useEffect(() => {
    let storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('User məlumatı parse olunarkən xəta:', e);
        setUser(null);
      }
    }
  }, []);

  // AOS initialize
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Məlumatları yükləmək və view count artırmaq
  useEffect(() => {
    async function fetchDataAndIncreaseView() {
      try {
        let data;
        if (type === "basedgame") {
          data = await getGamesById(id);
          setObj(data);
          // Yalnız basedgame olduqda viewCount artıraq
          await increaseViewCount(id);
        } else {
          data = await getDLCsById(id);
          setObj(data);
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Data yüklənərkən xəta:', error);
      }
    }
    
    if (id && type) {
      fetchDataAndIncreaseView();
    }
  }, [type, id]);

  // Related games yükləmək
  useEffect(() => {
    if (obj) {
      getAllGames().then((allGames) => {
        const sameTitleGames = allGames.filter(
          (game) => game.title === obj.title && game.id !== obj.id
        );
        setRelatedGames(sameTitleGames);
      }).catch(error => {
        console.error('Related games yüklənərkən xəta:', error);
      });
    }
  }, [obj]);

  // Wishlist vəziyyətini yoxlamaq
  useEffect(() => {
    if (obj && user) {
      const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
      const storedWishlist = JSON.parse(storage.getItem(`wishlist_${user.id}`)) || [];
      const exists = storedWishlist.some(
        (game) => game.id === obj.id && game.type === type
      );
      setIsAlreadyInWishlist(exists);
    }
  }, [obj, type, user]);

  // Cart vəziyyətini yoxlamaq
  useEffect(() => {
    if (obj && user) {
      const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
      const storedCart = JSON.parse(storage.getItem(`cart_${user.id}`)) || [];
      const exists = storedCart.some(
        (game) => game.id === obj.id && game.type === type
      );
      setIsAlreadyInCart(exists);
    }
  }, [obj, type, user]);

  const toggleWishlist = () => {
    if (!user) {
      toast.error('Zəhmət olmasa qeydiyyatdan keçin');
      return;
    }
  
    if (!obj) return;
  
    // User-in hansı storagedə olduğunu tapırıq
    let storage = null;
    if (localStorage.getItem('user')) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser.id === user.id) {
        storage = localStorage;
      }
    }
    if (!storage && sessionStorage.getItem('user')) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user'));
      if (sessionUser.id === user.id) {
        storage = sessionStorage;
      }
    }
  
    if (!storage) {
      toast.error('User məlumatı tapılmadı. Zəhmət olmasa yenidən daxil olun.');
      return;
    }
  
    const storedWishlist = JSON.parse(storage.getItem(`wishlist_${user.id}`)) || [];
    const exists = storedWishlist.some(
      (game) => game.id === obj.id && game.type === type
    );
  
    let updatedWishlist;
  
    if (exists) {
      // Çıxar
      updatedWishlist = storedWishlist.filter(
        (game) => !(game.id === obj.id && game.type === type)
      );
      toast.error(
        <div className="flex items-center gap-3 min-w-[400px]">
          <img
            src={obj.cardImg}
            alt={obj.title}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <p className="font-semibold text-black">{obj.title}</p>
            <p className="text-[#333] text-sm">Removed from wishlist</p>
          </div>
        </div>
      );
      setIsAlreadyInWishlist(false);
    } else {
      // Əlavə et
      updatedWishlist = [...storedWishlist, { ...obj, type }];
      toast.success(
        <div className="flex items-center gap-3 min-w-[400px]">
          <img src={obj.cardImg} alt="game" className="w-10 h-10 rounded object-cover" />
          <div>
            <p className="font-semibold text-black">{obj.title}</p>
            <p className="text-sm text-[#333]">Added to wishlist</p>
          </div>
        </div>
      );
      setIsAlreadyInWishlist(true);
    }
  
    storage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
  };
  

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Zəhmət olmasa qeydiyyatdan keçin');
      return;
    }

    if (!obj) return;

    const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
    const storedCart = JSON.parse(storage.getItem(`cart_${user.id}`)) || [];
    const exists = storedCart.some(
      (game) => game.id === obj.id && game.type === type
    );

    if (exists) {
      toast.error("Artıq səbətdədir");
      return;
    }

    const updatedCart = [...storedCart, { ...obj, type }];
    storage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    toast.success("Səbətə əlavə olundu");
    setIsAlreadyInCart(true);
  };

  if (!obj) {
    return <Loader />;
  }

  let systemKeysArray = [];
  if (obj.type === "basedgame") {
    systemKeysArray = Object.keys(obj.systemRequirements);
  }

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div className='py-[20px] xl:py-0 lg:py-0'>
      <Toaster position="top-right" />
      
      {/* Detail Header Section */}
      <DetailHeader />

      {/* Banner Section */}
      <div className='bg-white relative mt-[67px] xl:mb-[90px] lg:mb-[90px] mb-0'>
        <div className='relative'>
          <div className="relative w-full">
            <img className="w-full h-[40vh] xl:h-[65vh] lg:h-[55vh]" src={obj?.bannerImg} alt="" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-60 z-1"></div>
          </div>

          <div className='absolute z-2 top-0 flex xl:flex-row flex-col gap-5 lg:flex-row w-[100%] h-[100%] xl:justify-between lg:justify-between px-[30px] pt-[30px]'>
            <div className='flex flex-col gap-[80px]'>
              <div><img src={obj?.logo} className='w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] max-w-full' alt="" /></div>
              <div className='xl:block lg:block absolute top-40'>
                <h1 className='ubisoft-bold xl:text-[60px] lg:text-[40px] text-[#fff]'>{obj?.title} - </h1>
                <h1 className='ubisoft-bold xl:text-[30px] lg:text-[20px] text-[#fff]'>{obj?.productEdition}</h1>
                <p className='ubisoft-text text-[#fff] xl:text-[18px] lg:text-[16px]'>Release date: {formatDate(obj?.releaseDate)}</p>
                <button className='ubisoft-bold px-[30px] py-[5px] hidden xl:block border-[#fff] border-[1px] duration-200 my-[15px] text-[20px] cursor-pointer text-[#fff] rounded-2xl hover:border-[#000] hover:bg-[#fff] hover:text-[#000]'>Discover Editions</button>
              </div>
            </div>
            
            <div className='flex flex-col justify-between items-end'>
              <div className='flex flex-col items-center justify-between'>
                <div className='flex gap-[10px] w-[20vw] items-center justify-between p-[10px] bg-[#2a2a2a]/70 rounded-xl'>
                  {obj?.ageRating.rating == 18 ?
                    <img className='w-[30px] md:w-[50px] lg:w-[70px] object-contain' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwc012ec98/images/rating/pegi-18.png" alt="" /> :
                    obj?.ageRating.rating == 12 ?
                      <img className='w-[30px] md:w-[50px] lg:w-[70px] object-contain' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw1531754a/12_Pending.PNG" alt="" /> :
                      <img className='w-[30px] md:w-[50px] lg:w-[70px] object-contain' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwcb496937/images/rating/pegi-7.png" alt="" />
                  }
                  <p className='ubisoft-text w-[70%] text-[1.2vw] text-[#fff]'>{obj?.ageRating?.reasons?.join(", ")}</p>
                </div>
                <button className='ubisoft-bold px-[10px] py-[5px] xl:hidden border-[#fff] border-[1px] duration-200 my-[15px] xl:text-[20px] lg:text-[20px] text-[16px] cursor-pointer text-[#fff] rounded-2xl hover:border-[#000] hover:bg-[#fff] hover:text-[#000]'>Discover Editions</button>
              </div>
              
              <div>
                <div className='h-[210px] w-[400px] bg-black p-[30px] xl:flex hidden flex-col justify-between'>
                  <div className='bg-[#45464A] px-[10px] rounded'>
                    <p className='ubisoft-text text-[#fff] text-[2.5vw]'>{obj.price == 0 ? "Free" : "€ " + obj.price}</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    {isAlreadyInCart ?
                      <Link to={'/cart'} className='text-center text-[#fff] text-[23px] open-sans-bold bg-[#00f587] w-[85%] p-[2px] rounded-2xl cursor-pointer hover:text-[black] duration-300'>Go to Cart</Link> :
                      <button onClick={handleAddToCart} className='text-center text-[#fff] text-[23px] open-sans-bold bg-[#006EF5] w-[85%] p-[2px] rounded-2xl cursor-pointer hover:text-[black] duration-300'>Pre-Order</button>
                    }
                    <div onClick={toggleWishlist} className='cursor-pointer'>
                      {isAlreadyInWishlist ? 
                        <FaHeart className='text-[#fff]' size={40} /> : 
                        <FaRegHeart className='text-[#fff]' size={40} />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Section */}
      <div className='h-[210px] w-[100%] bg-[#0D0D0D] p-[30px] xl:hidden flex flex-col justify-between mb-[20px]'>
        <div className='bg-[#45464A] px-[10px] rounded h-[50px] flex items-center'>
          <p className='ubisoft-text text-[#fff] text-[20px]'>{obj.price == 0 ? "Free" : "€ " + obj.price}</p>
        </div>
        <div className='flex items-center justify-between'>
          {isAlreadyInCart ?
            <Link to={'/cart'} className='text-center text-[#fff] text-[23px] open-sans-bold bg-[#00f587] w-[85%] p-[2px] rounded-2xl cursor-pointer hover:text-[black] duration-300'>Go to Cart</Link> :
            <button onClick={handleAddToCart} className='text-center text-[#fff] text-[23px] open-sans-bold bg-[#006EF5] w-[85%] p-[2px] rounded-2xl cursor-pointer hover:text-[black] duration-300'>Pre-Order</button>
          }
          <div onClick={toggleWishlist} className='cursor-pointer'>
            {isAlreadyInWishlist ? 
              <FaHeart className='text-[#fff]' size={40} /> : 
              <FaRegHeart className='text-[#fff]' size={40} />
            }
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className='pb-[50px]'>
        <GameSlider screenshots={obj.screenshots} videos={obj.videos} />
      </div>

      {/* About Section */}
      <div className='container2 mx-auto flex flex-col gap-[20px]'>
        <h1 className='ubisoft-bold text-white text-2xl'>About this game</h1>
        <div className='flex flex-col md:flex-row justify-between bg-[#1B1B1B] px-[20px] md:px-[30px] py-[20px] rounded-lg gap-[20px]'>
          <div className='flex flex-col w-full md:w-[70%] gap-[10px] items-start'>
            <p className='ubisoft-text text-[16px] md:text-[18px]'>{obj?.shortDescription}</p>
            <div className='flex flex-wrap gap-[5px]'>
              <p className='ubisoft-bold text-[16px]'>Release date:</p>
              <p className='ubisoft-text text-[16px]'>{formatDate(obj?.releaseDate)}</p>
            </div>
          </div>

          <div className='w-full md:w-[30%] flex flex-col gap-[15px]'>
            <div>
              <h3 className='ubisoft-bold text-white mb-[5px] text-[16px]'>Platform:</h3>
              <div className='flex flex-wrap gap-3'>
                {obj?.platforms.map((item, idx) => (
                  <button key={idx} className='border-white border-[2px] px-[12px] py-[2px] ubisoft-bold rounded uppercase text-[14px]'>{item}</button>
                ))}
              </div>
            </div>

            <div>
              <h3 className='ubisoft-bold text-white mb-[5px] text-[16px]'>Genre:</h3>
              <div className='flex flex-wrap gap-3'>
                {obj?.genre.map((item, idx) => (
                  <button key={idx} className='border-white border-[2px] px-[12px] py-[2px] ubisoft-bold rounded uppercase text-[14px]'>{item}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Detail Section */}
      {obj.type === "basedgame" ? 
        <div className='flex flex-col xl:flex-row lg:flex-row bg-black xl:gap-[50px] lg:gap-[50px] gap-[5px] justify-center mt-[50px] py-[10px] items-center'>
          {relatedGames.length != 0 ? 
            <a href='#editions' className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>Editions</a> : ''
          }
          {(!obj.descriptionImg || obj.descriptionImg.length !== 0) ? (
            <a href='#moreContent' className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>More Content</a>
          ) : ''}
          <a href='#generalInformation' className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>General Information</a>
          <a href='#systemReq' className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>Pc Specs</a>
        </div> : ""
      }

      {/* Editions Section */}
      {relatedGames.length != 0 ?
        <div id='editions' className='bg-red-900/10 flex flex-col py-10 gap-10 items-center justify-center bg-no-repeat bg-cover bg/10'
          style={{ backgroundImage: "url('https://wallpapercrafter.com/th8004/1240510-Asus-Black-And-Red-gamers-PC-Gaming-video-games.jpg')" }}>
          <div className='mb-10'>
            <h3 className='ubisoft-bold text-4xl'>Compare {obj.title} Editions</h3>
          </div>

          <div className='flex flex-wrap gap-5 justify-center w-[90%] mx-auto'>
            {relatedGames.map(item => (
              <div key={item.id} className="max-w-sm mx-auto hover:scale-105 duration-300 bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="relative h-48 bg-gradient-to-br from-red-900 via-red-700 to-black">
                  <img
                    src={item.cardImg}
                    alt="Game artwork"
                    className="w-full h-full opacity-80"
                  />
                </div>

                <div className="p-6 bg-gray-800">
                  <h2 className="text-white text-xl font-bold mb-6">{item.productEdition}</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-600 rounded overflow-hidden flex-shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                            alt="Base game"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white font-medium">Base game</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    {item.features?.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-medium">{feature}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-white text-3xl font-bold">{item.price == 0 ? "Free" : "€ " + item.price}</span>
                  </div>

                  <Link to={`/detail/${item.type}/${item.id}`} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 text-lg block text-center">
                    GET THE GAME
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div> : ""
      }

      {/* More Content Section */}
      {obj.descriptionImg?.length != 0 ?
        <div id="moreContent" className="mt-[50px] overflow-hidden scroll-mt-[150px]">
          {obj.descriptionImg?.map((item, index) => (
            <div
              key={index}
              className="bg-cover bg-center w-full h-[90vh] flex flex-col md:flex-row items-center justify-center relative"
              style={{ backgroundImage: `url(${encodeURI(item)})` }}>
              <div
                className={`bg-black/80 text-white px-6 py-4 h-fit absolute 
                  ${index % 2 === 0 ? 'md:left-20' : 'md:right-20'} 
                  bottom-10 md:top-[110px] md:w-[45%] w-[90%]`}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
                <h3 className="font-bold text-[24px] md:text-[40px]">{obj.fullDescription?.[index]?.heading}</h3>
                <p className="ubisoft-text text-[16px] md:text-[20px] mt-2">
                  {obj.fullDescription?.[index]?.content}
                </p>
              </div>
            </div>
          ))}
        </div> : ''
      }

      {/* General information Section */}
      {obj.type === "basedgame" ?
        <div id="generalInformation" className='w-[80%] mx-auto mt-[50px] mb-[30px] scroll-mt-[150px]'>
          <h2 className='ubisoft-bold text-[2.5rem] text-center mb-[20px]'>General information</h2>
          <div className='flex gap-10 items-start flex-col lg:flex-row xl:flex-row'>
            <div className='flex flex-col gap-5'>
              <div className='flex gap-2 text-[16px]'>
                <p className='ubisoft-bold'>Publisher:</p> <span className='ubisoft-text'>{obj.publisher}</span>
              </div>
              <div className='flex gap-2 text-[16px]'>
                <p className='ubisoft-bold'>Developer:</p> <span className='ubisoft-text'>{obj.developer}</span>
              </div>
              <div className='flex gap-2 text-[16px]'>
                <p className='ubisoft-bold'>Release date:</p> <span className='ubisoft-text'>{formatDate(obj?.releaseDate)}</span>
              </div>
            </div>

            <div className='flex flex-col gap-5'>
              <div className='flex gap-5 text-[16px]'>
                <p className='ubisoft-bold'>Description:</p> <span className='ubisoft-text'>{obj.shortDescription}</span>
              </div>
              <div className='flex gap-[10px] w-fit items-center justify-between'>
                {obj?.ageRating.rating == 18 ?
                  <img className='w-[45px]' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwc012ec98/images/rating/pegi-18.png" alt="" /> :
                  obj?.ageRating.rating == 12 ?
                    <img className='w-[45px]' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw1531754a/12_Pending.PNG" alt="" /> :
                    <img className='w-[45px]' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwcb496937/images/rating/pegi-7.png" alt="" />
                }
                <p className='ubisoft-text w-[70%] text-[#fff]'>{obj?.ageRating?.reasons?.join(", ")}</p>
              </div>
              <div>
                <p className='ubisoft-bold'>Language:</p>
                {obj.languages?.slice(0, 3).map((item, index) => (
                  <p className='ubisoft-text' key={index}>
                    {item.language} (
                    {item.audio ? " Audio, " : ""}
                    {item.interface ? " Interface, " : ""}
                    {item.subtitle ? " Subtitle, " : ""}
                    )
                  </p>
                ))}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='flex gap-2 flex-wrap text-[16px] items-center'>
                <p className='ubisoft-bold'>Platforms:</p>
                {obj?.platforms.map((item, index) => (
                  <span key={index} className='ubisoft-text uppercase text-[14px]'>
                    {item}{index !== obj.platforms.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
              <div className='flex gap-2 flex-wrap text-[16px] items-center'>
                <p className='ubisoft-bold'>Genres:</p>
                {obj?.genre.map((item, index) => (
                  <span key={index} className='ubisoft-text uppercase text-[14px]'>
                    {item}{index !== obj.genre.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div> : ""
      }

      {/* System Requirements Section */}
      {obj.type === "basedgame" ?
        <div id='systemReq' className='bg-black/10 flex flex-col py-10 px-5 gap-10 items-center justify-center scroll-mt-[150px]'>
          <div className='mb-2'>
            <h3 className='ubisoft-bold xl:text-4xl lg:text-3xl md:text-2xl text-xl'>System requirements for {obj.title}</h3>
            <div className='flex xl:flex-row lg:flex-row md:flex-row mt-10 justify-center items-center gap-10 border-b-2 flex-col'>
              {systemKeysArray?.map(item => (
                <h3
                  key={item}
                  onClick={() => setSystemReq(item)}
                  className={`ubisoft-text xl:text-[20px] lg:text-[20px] text-[16px] capitalize cursor-pointer ${systemReq === item ? 'border-b-3' : ''}`}
                >
                  {item}
                </h3>
              ))}
            </div>
          </div>

          <div>
            <SystemRequit obj={obj} systemReq={systemReq} />
          </div>
        </div> : ""
      }
    </div>
  )
}

export default Detail