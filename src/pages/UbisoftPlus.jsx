import React from 'react'
import { Link } from 'react-router'

function UbisoftPlus() {
  return (
<div className='pt-[60px]'>
      <div
    className="h-[80vh] flex justify-center items-center  bg-cover bg-center"
    style={{
      backgroundImage: "url('https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw770f5622/ubisoftPlus_additional_assets/Ubisoft+_GamingList-Mosaic_WEB_768x300_x2.jpg')"
    }}
  >
  <div className='w-[50%] flex flex-col gap-10 justify-center items-center text-center'>
        <img className='w-[300px]' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw59902287/ubisoftPlus_additional_assets/ubisoftPlus_logos/logoWhiteLarge.svg" alt="" />
        <h3  className='ubisoft-bold xl:w-[50%]  lg:w-[50%] text-[40px]'>Sorry, our subscription service is not available yet in your country</h3>
        <Link to={'/'} className='py-2  w-[100%] xl:w-[30%] lg:w-[40%] hover:scale-110 duration-300 bg-amber-50 rounded-4xl text-[16px] text-black font-bold'>Go To Home</Link>
    
  </div>  
</div>
</div>

  )
}

export default UbisoftPlus