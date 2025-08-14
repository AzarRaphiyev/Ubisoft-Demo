import React, { useEffect, useRef, useState } from 'react'
import { FaExternalLinkAlt, FaUserAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SiUbisoft } from "react-icons/si";
import { FaGamepad } from "react-icons/fa6";

function UserSec({ user, userBar, setUserBar }) {
  const panelRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const orderedGames = user?.orderedList || [];
  const hasGames = orderedGames.length > 0;

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Panel mövcuddursa və click panelin xaricindədirsə
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // User button-un özünə click olunmayıbsa bağla
        const userButton = document.querySelector('[data-user-button]');
        if (!userButton || !userButton.contains(event.target)) {
          setUserBar(false); 
        }
      }
    };
  
    // Timeout ilə event listener əlavə et (DOM yenilənməsini gözlə)
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setUserBar]);

  // Slider navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % orderedGames.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + orderedGames.length) % orderedGames.length);
  };
  

  if (user == null) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.reload(); // və ya navigate("/") istifadə edə bilərsən
  };

  return (
    <div 
      ref={panelRef}
      className="bg-black fixed top-14 xl:px-0 lg:px-0 px-2 mx-auto right-11 z-[90] py-5 
      h-[94vh] w-[40vh] 
      max-md:top-13 max-md:right-0 max-md:w-screen max-md:h-screen"
    >
      <div className='flex items-center justify-between w-full mx-auto px-3'>
        <div className="text-white cursor-pointer px-2 rounded-full font-semibold uppercase ubisoft-text select-none">
          <FaUserAlt size={35} />
        </div>
        <div>
          <h3 className='ubisoft-bold text-[20px] text-white'>
            {user.username.slice(0, 15)}
          </h3>
        </div>
      </div>

      <div className='flex my-5 justify-between items-center gap-2 px-3'>
        <div className='flex gap-2 px-2 items-center bg-[#242424] py-2 rounded-xl w-[50%] justify-center h-[50px]'>
          <SiUbisoft className='text-white' size={30} />
          <p className='ubisoft-bold text-[13px] text-[#9b9b9b]'>new player</p>
        </div>
        <div className='flex gap-2 px-2 items-center bg-[#242424] py-2 rounded-xl w-[50%] justify-center h-[50px]'>
          <FaGamepad className='text-white' size={30} />
          <p className='ubisoft-bold text-[13px] text-[#9b9b9b]'>
            {hasGames ? `${orderedGames.length} games` : 'no games yet'}
          </p>
        </div>
      </div>

      {/* Ordered Games Slider - Show only if user has games */}
      {hasGames && (
        <div className='mx-3 mb-5'>
          <div className='relative bg-[#1C1C1C] rounded-xl p-3'>
            <h4 className='ubisoft-bold text-white text-sm mb-3'>Your Games</h4>
            
            <div className='relative overflow-hidden rounded-lg'>
              <div 
                className='flex transition-transform duration-300 ease-in-out'
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {orderedGames.map((game, index) => (
                  <div key={`${game.id}-${game.type}`} className='w-full flex-shrink-0'>
                    <Link 
                      to={`/detail/${game.type}/${game.id}`}
                      className='block relative group'
                      onClick={() => setUserBar(false)}
                    >
                      <img 
                        src={game.cardImg} 
                        alt={game.title}
                        className='w-full h-[120px] object-cover rounded-lg group-hover:opacity-80 transition-opacity'
                      />
                      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg'>
                        <p className='ubisoft-bold text-white text-xs truncate'>
                          {game.title}
                        </p>
                        <p className='text-[#9b9b9b] text-[10px] truncate'>
                          {game.productEdition}
                        </p>
                        {game.type === "DLC" && (
                          <span className='inline-block bg-blue-600 text-white text-[8px] px-1 py-0.5 rounded mt-1'>
                            DLC
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              {/* Navigation arrows - Show only if more than 1 game */}
              {orderedGames.length > 1 && (
                <>
                  <button 
                    onClick={prevSlide}
                    className='absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors'
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className='absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors'
                  >
                    <FaChevronRight size={12} />
                  </button>
                </>
              )}
            </div>
            
            {/* Dots indicator - Show only if more than 1 game */}
            {orderedGames.length > 1 && (
              <div className='flex justify-center mt-2 gap-1'>
                {orderedGames.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentIndex === index ? 'bg-blue-500' : 'bg-[#9b9b9b]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <hr className='text-[#9b9b9b] w-[90%] mx-auto' />

      <div className='my-3 flex flex-col gap-[2px]'>
        <div className='bg-[#1C1C1C] hover:bg-[#2f2f2f] duration-300 cursor-pointer py-2'>
          <div className='px-3 flex justify-between items-center text-white'>
            <p className='ubisoft-bold'>Account Management</p>
            <FaExternalLinkAlt size={15} />
          </div>
        </div>
        <div className='bg-[#1C1C1C] hover:bg-[#2f2f2f] duration-300 cursor-pointer py-2'>
          <div className='px-3 flex justify-between items-center text-white'>
            <p className='ubisoft-bold'>Customer Support</p>
            <FaExternalLinkAlt size={15} />
          </div>
        </div>
        <div className='bg-[#1C1C1C] hover:bg-[#2f2f2f] duration-300 cursor-pointer py-2'>
          <Link to={"/store"} className='px-3 flex justify-between items-center text-white'>
            <p className='ubisoft-bold'>Ubisoft Store</p>
            <FaExternalLinkAlt size={15} />
          </Link>
        </div>
      </div>

      <div className='my-3 flex flex-col gap-[2px]'>
        <div
          onClick={handleLogout}
          className='bg-[#1C1C1C] hover:bg-[#2f2f2f] duration-300 cursor-pointer py-2'
        >
          <div className='px-3 flex justify-between items-center text-blue-500'>
            <p className='ubisoft-bold'>Log Out</p>
            <FaExternalLinkAlt size={15} />
          </div>
        </div>
      </div>
      {user.role == "super_admin" ? (
        <div className='my-3 flex flex-col gap-[2px]'>
          <div className='bg-[#1C1C1C] hover:bg-[#2f2f2f] duration-300 cursor-pointer py-2'>
            <Link to={"admin"} className='px-3 flex justify-between items-center text-blue-500'>
              <p className='ubisoft-bold'>Admin panel</p>
              <FaExternalLinkAlt size={15} />
            </Link>
          </div>
        </div>
      ) : ""}
    </div>
  )
}

export default UserSec