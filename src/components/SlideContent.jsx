import React from 'react'
import { FaExternalLinkAlt, FaPause } from 'react-icons/fa'

function SlideContent({ slide }) {
   

  return (
    <div className='relative flex flex-col lg:flex-row h-auto min-h-[50vh] md:h-[55vh] lg:h-[60vh] gap-[15px] lg:gap-[10px] items-center justify-between py-[20px] md:py-[25px] lg:py-[30px] px-[20px] md:px-[25px] lg:px-[30px]'>
        
        <div className='w-full lg:w-[40%] order-2 lg:order-1 text-center lg:text-left'>
            
            <p className='text-[#b5b5b5] text-[12px] md:text-[14px] lg:text-[16px] mb-[8px] md:mb-[10px] pb-[2px] open-sans-bold'>
                {slide.category}
            </p>
            
            <h1 className='text-[#fff] text-[20px] md:text-[28px] lg:text-[32px] xl:text-[36px] mb-[8px] md:mb-[10px] pb-[2px] open-sans-bold leading-tight'>
                {slide.title}
            </h1>
            
            <p className='text-[#b5b5b5] text-[12px] md:text-[14px] lg:text-[16px] mb-[15px] md:mb-[20px] lg:mb-[10px] pb-[2px] open-sans-bold line-clamp-3 lg:line-clamp-none'>
                {slide.description}
            </p>
            
            <button className='w-full sm:w-auto py-2 md:py-3 px-4 md:px-6 flex items-center justify-center gap-[8px] md:gap-[10px] rounded-2xl duration-300 cursor-pointer bg-[#1372F1] hover:bg-[#1356f1] active:bg-[#0f5cb8] text-[#fff] text-[14px] md:text-[16px] mb-[10px] open-sans-bold transition-all hover:shadow-lg'>
                {slide.btnType} 
                <FaExternalLinkAlt size={10} className="md:w-3 md:h-3"/>
            </button>
        </div>

        <div className='w-full lg:w-[60%] order-1 lg:order-2'>
            <div className='rounded-xl overflow-hidden cursor-pointer w-full group'>
                <img 
                    src={slide.image} 
                    className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-xl group-hover:scale-105 duration-300 transition-transform' 
                    alt={slide.title || "Slide image"}
                />
            </div>
        </div>
    </div>
  )
}

export default SlideContent
