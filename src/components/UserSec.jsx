import React, { useEffect, useRef } from 'react'
import { FaExternalLinkAlt, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SiUbisoft } from "react-icons/si";
import { FaGamepad } from "react-icons/fa6";

function UserSec({ user, userBar, setUserBar }) {
  const panelRef = useRef(null);

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
        <div className='flex gap-2 px-2 items-center bg-[#242424] py-2 rounded-xl  w-[50%] justify-center h-[50px]'>
          <SiUbisoft className='text-white' size={30} />
          <p className='ubisoft-bold text-[13px] text-[#9b9b9b]'>new player</p>
        </div>
        <div className='flex gap-2 px-2 items-center bg-[#242424] py-2 rounded-xl w-[50%] justify-center  h-[50px]'>
          <FaGamepad className='text-white' size={30} />
          <p className='ubisoft-bold text-[13px] text-[#9b9b9b]'>no games yet</p>
        </div>
      </div>

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
      {user.role=="super_admin" ?
      <div className='my-3 flex flex-col gap-[2px]'>
      <div className='bg-[#1C1C1C] hover:bg-[#2f2f2f] duration-300 cursor-pointer py-2'>
        <Link to={"admin"} className='px-3 flex justify-between items-center text-blue-500'>
          <p className='ubisoft-bold'>Admin panel</p>
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>
    </div>  :""
    }
      
    </div>
  )
}

export default UserSec