import React, { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IoClose, IoSearch } from 'react-icons/io5'
import { MdClose, MdSaveAlt } from 'react-icons/md'
import { Link } from 'react-router-dom' 
import GameHeadSection from './GameHeadSection'
import SearchSec from './SearchSec'
import MobileHeader from './MobileHeader'

function Header() {
  const[gameBar,setGameBar]=useState(false)
  const[gameSection,setGameSection]=useState(false)
  const[searchSec,setSearchSec]=useState(false)
  const [mobilesec , setMobileSec]=useState(true) 
  return (
    <div className=''>
      
    <div className='bg-[#000]  flex xl:px-[50px] px-[20px]  mx-auto justify-between items-center w-[100%] fixed z-100 '>
    
     <div className='flex xl:hidden' onClick={()=>setMobileSec(!mobilesec)}>
      {mobilesec?
       <div  className='flex-col gap-1 cursor-pointer flex xl:hidden  py-[10px]'>
         <div className='w-[5px] h-[5px] rounded-4xl bg-[#fff]'></div>
         <div className='w-[5px] h-[5px] rounded-4xl bg-[#fff]'></div>
         <div className='w-[5px] h-[5px] rounded-4xl bg-[#fff]'></div>
       </div>:<IoClose  size={30}  className='text-white '/>}
     </div>

      <div className='flex items-center gap-10'>
        <Link to={"/"} className='py-[10px]'>
          <img src="/assets/img/logo.png" alt="" className='w-[120px] cursor-pointer' />
        </Link>
        <div className='uppercase ubisoft-text xl:flex  text-[1em]  text-white items-center hidden gap-[35px]'>
        <div
          className={`cursor-pointer px-[20px] h-[50px] flex justify-center items-center 
            ${gameSection ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          onMouseEnter={() => {
            setGameBar(true)
            setGameSection(true)
          }}
          onMouseLeave={() => {
            setGameBar(false)
            setGameSection(false)
          }}
        >
          <p className='font-semibold'>Games</p>
          {gameBar ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
          <Link to="/help" className='hover:bg-white hover:text-black px-[20px] h-[50px] flex justify-center items-center'><p className='font-semibold'>Help</p> <sup className='mx-2'><FaExternalLinkAlt size={12}/></sup></Link>
          <Link to="store" className='hover:bg-white hover:text-black  px-[20px] h-[50px] flex justify-center items-center'><p className='font-semibold'>Store</p> <sup className='mx-2'><FaExternalLinkAlt size={12}/></sup></Link>
          <Link to="/ubisoftplus" className='hover:bg-white hover:text-black  px-[20px] h-[50px] flex justify-center items-center'><p className='font-semibold'>Ubisoft+</p> <sup className='mx-2'><FaExternalLinkAlt size={12}/></sup></Link>
        </div>
      </div>

      <div className='flex  items-center gap-[50px]'>
        <div className='text-white uppercase ubisoft-text xl:flex  hidden  '>
        <Link to="/ubisoftConnet" className=' h-[50px] flex justify-center items-center'>
        <p className='font-bold text-[13px]'>Download Ubisoft Connect</p>
        <p className='mx-2'><MdSaveAlt size={17}/></p>
        </Link>
        </div>
        <div onClick={()=>setSearchSec(!searchSec)} className='text-white xl:flex bg-[#242424] cursor-pointer rounded-4xl p-[2px] opacity-90 hidden'>
        <IoSearch  size={25} />
        </div>
        <div>
        <img src="/assets/img/registerLogo.webp" alt="" className='w-[30px] cursor-pointer opacity-90 hover:opacity-100 duration-300' />
        </div>
      </div>
    </div>
    {
      gameSection?<GameHeadSection setGameBar={setGameBar} setGameSection={setGameSection}/>:''
    }
    {
      searchSec?<SearchSec searchSec={searchSec} setSearchSec={setSearchSec}/>:''
    }
    {mobilesec?"":<MobileHeader mobilesec2={mobilesec} setMobileSec2={setMobileSec}/>}
    </div>
  )
}

export default Header
