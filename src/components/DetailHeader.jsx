import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoMenu, IoSearch } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'
import { Link } from 'react-router'

function DetailHeader() {
  return (
    <div className='w-[100%] h-[70px]  bg-black fixed z-[100]'>
        <header className=' w-[95%] mx-auto px-[30px] flex justify-between items-center'>
        <div className='flex items-center gap-10' > 
        <IoMenu size={30} className='xl:hidden lg:hidden block' />
          <div>
            <img src="https://cloud.shopback.com/c_scale,c_auto,q_70,f_webp/media-production-aps1/tsUCkcIrNuM/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vZGlyZWN0L0VHQnFwQVo1T2U5MTg5VkROSi9yZXF1ZXN0cy8wMDAvMDQ5LzA3OC84MzAvTFdYckExcVJvUXZYVjU0Snp5cE1KZWdCai9hY2QxZjYzM2E2MDRkZjNlODM5ZDQ1OWI1MmM1YjU0Njg3NDEyMjY3LnBuZw.jpg" className='w-[100px]' alt="" />
          </div>
          <div className='xl:flex lg:flex gap-10 hidden  '>
            <h1 className='text-[18px] ubisoft-text px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60'>Games</h1>
            <h1 className='text-[18px] ubisoft-text px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60'>Dlc</h1>
            <h1 className='text-[18px] ubisoft-text px-3 rounded-lg py-2 hover:bg-[#6f6e6e]/60'>Ubisoft+</h1>
          </div>
          <div></div>
        </div>
        <div className='flex gap-[20px]'>
            <div className=' xl:flex lg:flex hidden  items-center  gap-[10px] border-[2px] border-white px-4 rounded-2xl '>
                <IoSearch size={20}/>
                <input type="text" className='text-white  px-2 outline-none placeholder-gray-400' placeholder='Search for Games' />
            </div>
            <Link to={"/whislist"} className='ubisoft-bold text-[14px] hover:bg-[#6f6e6e]/60  px-3 rounded-xl py-2 flex gap-[10px] items-center'> <FaRegHeart /> <p className='hidden xl:block'>Whislist</p></Link>
            <Link to={"/cart"} className='ubisoft-bold text-[14px] hover:bg-[#6f6e6e]/60  px-3 rounded-xl py-2 flex gap-[10px] items-center'> <LuShoppingCart  /> <p className='hidden xl:block'>Cart</p></Link>
            
        </div>
      </header>
    </div>
  )
}

export default DetailHeader