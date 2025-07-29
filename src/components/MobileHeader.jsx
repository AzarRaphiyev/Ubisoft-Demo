import React, { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { MdSaveAlt } from 'react-icons/md'
import { Link } from 'react-router'

function MobileHeader({mobilesec2}) {
    const [mobilesec , setMobileSec]=useState(true)
  return (
    <div  className={`bg-black fixed text-white z-[200] py-[30px] h-[100vh] w-[100vw] transition-all duration-500 ${
        mobilesec2 ? 'top-[-100%]' : 'top-[50px]'
      }`}>
        <div className='w-[90%] mx-auto flex flex-col gap-[20px]'>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <div onClick={()=>setMobileSec(!mobilesec)} className='w-[100%] flex flex-col gap-[10px]  '>
       <div className='flex items-center justify-between '>
         <h1 className='text-[24px] ubisoft-bold'>GAMES</h1>
         {mobilesec?<IoMdArrowDropdown size={25} />:<IoMdArrowDropup size={25} />}
       </div>
        {mobilesec?'':<div className='flex flex-col gap-[8px] pl-[8px]'>
        <p className='ubisoft-bold cursor-pointer'>Browse By Category</p>
        <p className='ubisoft-bold cursor-pointer'>Browse By Game</p>
        <p className='ubisoft-bold cursor-pointer'>Ubisoft+</p>
        </div>}
        </div>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <h1 className='text-[24px] ubisoft-bold flex gap-[5px] items-center'>HELP <p className='mx-2'><FaExternalLinkAlt size={12}/></p></h1>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <h1 className='text-[24px] ubisoft-bold flex gap-[5px] items-center'>STORE <p className='mx-2'><FaExternalLinkAlt size={12}/></p></h1>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <h1 className='text-[24px] ubisoft-bold flex gap-[5px] items-center'>UBISOFT+ <p className='mx-2'><FaExternalLinkAlt size={12}/></p></h1>
        <hr className="h-[0.1px] bg-gray-400 border-none" />

        <div className='text-white uppercase ubisoft-text flex  justify-center  '>
        <Link to="/ubisoftConnet" className=' h-[50px] text-white flex justify-center items-center'>
        <p className='font-bold  text-[13px]'>Download Ubisoft Connect</p>
        <p className='mx-2'><MdSaveAlt size={17}/></p>
        </Link>
        </div>
        <div className='bg-[#393939] flex items-center rounded-2xl px-[10px]'>
        <IoSearch size={25} className='h-[35px] cursor-pointer' />
        <input type="text" placeholder='Type your search' active className=' h-[35px] px-[5px] focus:outline-none w-[90%] mx-auto' />
        </div>

        </div>
    </div>
  )
}

export default MobileHeader