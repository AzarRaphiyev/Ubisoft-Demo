import React from 'react'

function Loader() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-white text-xl"><img src="/assets/img/ubisoftLoader.png" className=' pulse-wave'  alt="" /></div>
    </div>
   
  )
}

export default Loader