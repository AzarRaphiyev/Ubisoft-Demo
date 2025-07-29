import React from 'react'
import { FaDiscord } from 'react-icons/fa'
import { Link } from 'react-router'

function Footer() {
  return (
    <div className='flex flex-col mt-[20px]'>
      <div className='w-[100%] bg-black flex flex-col justify-center  h-[55px]  '>
      <div className='flex w-[90%] mx-auto xl:justify-between lg:justify-between justify-center items-center'>
        <p className='text-[#8c8a8a] open-sans-text text-[12px] hidden xl:block lg:block'>Visit Other Ubisoft Channels
        </p>

        <Link to={"https://discord.com/invite/ubisoftofficial"} target="_blank" rel="noopener noreferrer"  className='text-white bg-[#777]/40 hover:bg-[#908e8e]/50 duration-300 cursor-pointer rounded-2xl p-[4px]'>
          <FaDiscord size={25} />
        </Link>

        <p className='xl:block lg:block'></p>
        </div>
      </div>
      <div className='h-[300px] bg-[#1D1E22]'>

      </div>
    </div>
  )
}

export default Footer