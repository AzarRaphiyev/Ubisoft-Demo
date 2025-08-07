import React from 'react'
import { Link } from 'react-router'

function Error404() {
  return (
    <div className='flex pb-[200px] pt-[50px] bg-white '>
        <div className='w-[70%] mx-auto  flex xl:flex-row lg:flex-row md:flex-row flex-col justify-between items-center'>
            <div className='flex flex-col '>
                <h3 className='ubisoft-bold text-[50px] text-black'>404 - Page not found</h3>
                <h3 className='ubisoft-bold text-[50px] text-black'>Oops! This page doesn't exist!</h3>
                <Link className='px-5 mt-10 py-2 rounded-4xl w-fit bg-[#008AA4] text-white open-sans-bold text-[18px] text-center ' to={"/"}>Go back to the homepage</Link>
            </div>
            <div>
                <img className='' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw825b8ce1/Web_Revamp_Contribution/Other/game-art-rabbit.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Error404