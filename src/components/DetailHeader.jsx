import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoMenu, IoSearch, IoClose } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import DetailSeachSec from './DetailSeachSec'

function DetailHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('User məlumatı parse olunarkən xəta:', e)
        setUser(null)
      }
    }
  }, [])

  
  useEffect(() => {
    if (user && user.id) {
      let storedWishlist = localStorage.getItem(`wishlist_${user.id}`) || sessionStorage.getItem(`wishlist_${user.id}`)
      storedWishlist = storedWishlist ? JSON.parse(storedWishlist) : []
      setWishlist(storedWishlist)

      let storedCart = localStorage.getItem(`cart_${user.id}`) || sessionStorage.getItem(`cart_${user.id}`)
      storedCart = storedCart ? JSON.parse(storedCart) : []
      setCart(storedCart)
    } else {
      setWishlist([])
      setCart([])
    }
  }, [user])

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
            <Link to={"/store"}>
              <img
                src="https://cloud.shopback.com/c_scale,c_auto,q_70,f_webp/media-production-aps1/tsUCkcIrNuM/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vZGlyZWN0L0VHQnFwQVo1T2U5MTg5VkROSi9yZXF1ZXN0cy8wMDAvMDQ5LzA3OC84MzAvTFdYckExcVJvUXZYVjU0Snp5cE1KZWdCai9hY2QxZjYzM2E2MDRkZjNlODM5ZDQ1OWI1MmM1YjU0Njg3NDEyMjY3LnBuZw.jpg"
                className='w-[80px] sm:w-[100px]'
                alt="Logo"
              />
            </Link>

            <div className='xl:flex lg:flex gap-6 xl:gap-10 hidden'>
              <Link to={`/store?type=Games`} className='text-[16px] xl:text-[18px] text-white cursor-pointer px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60 transition-colors'>Games</Link>
              <Link to={`/store?type=DLC`} className='text-[16px] xl:text-[18px] text-white cursor-pointer px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60 transition-colors'>Dlc</Link>
              <Link to={"/ubisoftplus"} className='text-[16px] xl:text-[18px] text-white cursor-pointer px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60 transition-colors'>Ubisoft+</Link>
            </div>
          </div>

          <div className='flex gap-[15px] sm:gap-[20px]'>
            <div className='xl:flex lg:flex hidden items-center gap-[10px] border-[2px] border-white px-4 rounded-2xl bg-transparent'>
              <IoSearch size={20} className='text-white' />
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className='text-white bg-transparent px-2 py-2 outline-none placeholder-gray-400 w-[200px]'
                placeholder='Search for Games'
              />
            </div>
            <Link to={"/whislist"} className='text-white font-bold text-[12px] sm:text-[14px] hover:bg-[#6f6e6e]/60 px-2 sm:px-3 rounded-xl py-2 flex gap-[8px] sm:gap-[10px] items-center transition-colors'>
              <div className='flex gap-1'>
                <FaRegHeart size={16} /> <sup className='px-1 py-2 rounded-4xl text-[14px] ubisoft-bold bg-[#700202]'>{wishlist.length}</sup>
              </div>
              <span className='hidden sm:block'>Wishlist</span>
            </Link>
            <Link
              to={'/cart'}
              className='text-white font-bold text-[12px] sm:text-[14px] hover:bg-[#6f6e6e]/60 px-2 sm:px-3 rounded-xl py-2 flex gap-[8px] sm:gap-[10px] items-center transition-colors'
            >
              <LuShoppingCart size={16} /> <sup className='px-1 py-2 rounded-4xl text-[14px] ubisoft-bold bg-[#700202]'>{cart.length}</sup>
              <span className='hidden sm:block'>Cart</span>
            </Link>
          </div>
        </header>
      </div>

      
      <div className='w-full bg-black fixed top-30 z-40 xl:hidden lg:hidden'>
        <div className='w-[95%] mx-auto px-[15px] sm:px-[30px] py-3'>
          <div className='flex items-center gap-[10px] border-[2px] border-white px-4 rounded-2xl bg-transparent'>
            <IoSearch size={20} className='text-white' />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className='text-white bg-transparent px-2 py-2 outline-none placeholder-gray-400 w-full'
              placeholder='Search for Games'
            />
          </div>
        </div>
      </div>

      
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 w-[50%] z-90 xl:hidden lg:hidden'
          onClick={toggleMobileMenu}
        />
      )}

      
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-black transform transition-transform duration-300 ease-in-out z-100 xl:hidden lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className='flex justify-between items-center p-6 border-b border-gray-700'>
          <Link to={"/store"}>
          <img
            src="https://cloud.shopback.com/c_scale,c_auto,q_70,f_webp/media-production-aps1/tsUCkcIrNuM/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vZGlyZWN0L0VHQnFwQVo1T2U5MTg5VkROSi9yZXF1ZXN0cy8wMDAvMDQ5LzA3OC84MzAvTFdYckExcVJvUXZYVjU0Snp5cE1KZWdCai9hY2QxZjYzM2E2MDRkZjNlODM5ZDQ1OWI1MmM1YjU0Njg3NDEyMjY3LnBuZw.jpg"
            className='w-[80px]'
            alt="Logo"
          />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className='text-white hover:text-gray-300 transition-colors'
          >
            <IoClose size={24} />
          </button>
        </div>

        <nav className='pt-8'>
          <div className='flex flex-col space-y-2'>
            <Link to={"/store?type=Games"}
              className='text-white text-[18px] text-left px-6 py-4 hover:bg-[#6f6e6e]/60 transition-colors w-full'

            >
              Games
            </Link>
            <Link to={"/store?type=DLC"}
              className='text-white text-[18px] text-left px-6 py-4 hover:bg-[#6f6e6e]/60 transition-colors w-full'

            >
              Dlc
            </Link>
            <Link to={"/ubisoftplus"}
              className='text-white text-[18px] text-left px-6 py-4 hover:bg-[#6f6e6e]/60 transition-colors w-full'

            >
              Ubisoft+
            </Link>
          </div>
        </nav>
      </div>

     
      <div className='h-[70px] xl:h-[70px] lg:h-[70px] block xl:hidden lg:hidden'>
        <div className='h-[50px]'></div> 
      </div>
      {
        search.length > 0 ? <DetailSeachSec serach={search} setSearch={setSearch} /> : ''
      }

      <div className='h-[70px] hidden xl:block lg:block'></div>
    </>
  )
}

export default DetailHeader
