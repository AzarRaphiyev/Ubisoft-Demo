import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from 'react-router'

function GameInfoSec() {
  return (
   <div className='container2 group mt-[50px] m-auto bg-[#010127] rounded-lg overflow-hidden'>
  <div id='image_gameSec' className='relative overflow-hidden'>
    <img
      src="https://ubiservices.cdn.ubi.com/a19a847d-d482-4b92-9714-10cf73c28d23/news/Ubisoftplus_RPOP.jpg?imWidth=1800&quality=100"
      className='cursor-pointer transform duration-300 group-hover:scale-105'
      alt=""
    />
    <div
      id='content_gameSec'
      className='absolute py-3 top-[50%] translate-y-[-50%] pl-[20px] w-[50%]'
    >
      <h1 className='text-[#fff] pr-0 text-[2vw] mb-[10px] pb-[2px] open-sans-bold'>
      Play it now with Ubisoft+
      </h1>
      <p className='text-[#b5b5b5] text-[1.5vw] mb-[10px] pb-[2px] open-sans-text'>
      Subscribe to play The Rogue Prince of Persia
      </p>
      <Link to={'ubisoftplus'} className='py-2 w-fit px-4 flex items-center gap-[10px] rounded-2xl duration-300 cursor-pointer bg-[#1372F1] hover:bg-[#1356f1] text-[#fff] text-[1.2vw] mb-[10px] open-sans-bold'>
        Join now
      </Link>
    </div>
  </div>
</div>

  )
}

export default GameInfoSec