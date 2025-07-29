import React from 'react'
import { FaExternalLinkAlt, FaPause } from 'react-icons/fa'

function SlideContent({ slide }) {
   

  return (
    <div className='relative flex h-[60vh] gap-[10px] items-center justify-between py-[30px] px-[30px]'>
        <div className='  bottom-0  w-[40%]  '>
            
            <p className='text-[#b5b5b5] text-[16px] mb-[10px] pb-[2px] open-sans-bold'>{slide.category}</p>
            <h1 className='text-[#fff] pr-0 text-[32px] mb-[10px] pb-[2px] open-sans-bold'>{slide.title}</h1>
            <p className='text-[#b5b5b5] text-[16px] mb-[10px] pb-[2px] open-sans-bold'>{slide.description}</p>
            <button className='py-2 px-4 flex items-center gap-[10px] rounded-2xl duration-300 cursor-pointer bg-[#1372F1] hover:bg-[#1356f1] text-[#fff] text-[16px] mb-[10px]  open-sans-bold '>{slide.btnType} <FaExternalLinkAlt size={12}/></button>
        </div>

        <div className=' right-0 w-[60%]'>
<div className='rounded-xl overflow-hidden cursor-pointer w-[100%]'>
    <img src={slide.image} className='rounded-xl hover:scale-105 duration-300' alt="" />
</div>
        </div>
    </div>
  )
}

export default SlideContent
