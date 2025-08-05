import React, { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoMenu, IoSearch, IoClose } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'
import { Link } from 'react-router'

function DetailHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  

  return (
    <>
      <div className='w-full h-[70px] bg-black fixed top-14 z-100'>
        <header className='w-[95%] mx-auto px-[15px] sm:px-[30px] flex justify-between items-center h-full'>
          <div className='flex items-center gap-4 sm:gap-10'> 
            <button 
              onClick={toggleMobileMenu}
              className='xl:hidden lg:hidden block text-white hover:text-gray-300 transition-colors'
            >
              <IoMenu size={30} />
            </button>
            <div>
              <img 
                src="https://cloud.shopback.com/c_scale,c_auto,q_70,f_webp/media-production-aps1/tsUCkcIrNuM/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vZGlyZWN0L0VHQnFwQVo1T2U5MTg5VkROSi9yZXF1ZXN0cy8wMDAvMDQ5LzA3OC84MzAvTFdYckExcVJvUXZYVjU0Snp5cE1KZWdCai9hY2QxZjYzM2E2MDRkZjNlODM5ZDQ1OWI1MmM1YjU0Njg3NDEyMjY3LnBuZw.jpg" 
                className='w-[80px] sm:w-[100px]' 
                alt="Logo" 
              />
            </div>
            <div className='xl:flex lg:flex gap-6 xl:gap-10 hidden'>
              <h1 className='text-[16px] xl:text-[18px] text-white cursor-pointer px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60 transition-colors'>Games</h1>
              <h1 className='text-[16px] xl:text-[18px] text-white cursor-pointer px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60 transition-colors'>Dlc</h1>
              <h1 className='text-[16px] xl:text-[18px] text-white cursor-pointer px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60 transition-colors'>Ubisoft+</h1>
            </div>
          </div>

          <div className='flex gap-[15px] sm:gap-[20px]'>
            <div className='xl:flex lg:flex hidden items-center gap-[10px] border-[2px] border-white px-4 rounded-2xl bg-transparent'>
              <IoSearch size={20} className='text-white'/>
              <input 
                type="text" 
                className='text-white bg-transparent px-2 py-2 outline-none placeholder-gray-400 w-[200px]' 
                placeholder='Search for Games' 
              />
            </div>
            <button className='text-white font-bold text-[12px] sm:text-[14px] hover:bg-[#6f6e6e]/60 px-2 sm:px-3 rounded-xl py-2 flex gap-[8px] sm:gap-[10px] items-center transition-colors'> 
              <FaRegHeart size={16} /> 
              <p className='hidden sm:block'>Wishlist</p>
            </button>
            <button className='text-white font-bold text-[12px] sm:text-[14px] hover:bg-[#6f6e6e]/60 px-2 sm:px-3 rounded-xl py-2 flex gap-[8px] sm:gap-[10px] items-center transition-colors'> 
              <LuShoppingCart size={16} /> 
              <p className='hidden sm:block'>Cart</p>
            </button>
          </div>
        </header>
      </div>

      {/* Search bar for mobile/tablet - shows below header */}
      <div className='w-full bg-black fixed top-30 z-40 xl:hidden lg:hidden'>
        <div className='w-[95%] mx-auto px-[15px] sm:px-[30px] py-3'>
          <div className='flex items-center gap-[10px] border-[2px] border-white px-4 rounded-2xl bg-transparent'>
            <IoSearch size={20} className='text-white'/>
            <input 
              type="text" 
              className='text-white bg-transparent px-2 py-2 outline-none placeholder-gray-400 w-full' 
              placeholder='Search for Games' 
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 w-[50%] z-90 xl:hidden lg:hidden'
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-black transform transition-transform duration-300 ease-in-out z-100 xl:hidden lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className='flex justify-between items-center p-6 border-b border-gray-700'>
          <img 
            src="https://cloud.shopback.com/c_scale,c_auto,q_70,f_webp/media-production-aps1/tsUCkcIrNuM/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vZGlyZWN0L0VHQnFwQVo1T2U5MTg5VkROSi9yZXF1ZXN0cy8wMDAvMDQ5LzA3OC84MzAvTFdYckExcVJvUXZYVjU0Snp5cE1KZWdCai9hY2QxZjYzM2E2MDRkZjNlODM5ZDQ1OWI1MmM1YjU0Njg3NDEyMjY3LnBuZw.jpg" 
            className='w-[80px]' 
            alt="Logo" 
          />
          <button 
            onClick={toggleMobileMenu}
            className='text-white hover:text-gray-300 transition-colors'
          >
            <IoClose size={24} />
          </button>
        </div>
        
        <nav className='pt-8'>
          <div className='flex flex-col space-y-2'>
            <Link to={"store"} 
              className='text-white text-[18px] text-left px-6 py-4 hover:bg-[#6f6e6e]/60 transition-colors w-full'
              
            >
              Games
            </Link>
            <Link to={"store"} 
              className='text-white text-[18px] text-left px-6 py-4 hover:bg-[#6f6e6e]/60 transition-colors w-full'
              
            >
              Dlc
            </Link>
            <Link to={"ubisoftplus"} 
              className='text-white text-[18px] text-left px-6 py-4 hover:bg-[#6f6e6e]/60 transition-colors w-full'
              
            >
              Ubisoft+
            </Link>
          </div>
        </nav>
      </div>

      {/* Content spacer to account for fixed header */}
      <div className='h-[70px] xl:h-[70px] lg:h-[70px] block xl:hidden lg:hidden'>
        <div className='h-[50px]'></div> {/* Additional space for mobile search */}
      </div>
      <div className='h-[70px] hidden xl:block lg:block'></div>
    </>
  )
}

export default DetailHeader

