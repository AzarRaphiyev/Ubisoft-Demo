import React from 'react'
import { FaDiscord, FaTwitch } from 'react-icons/fa'
import { FaMeta, FaXTwitter } from 'react-icons/fa6'
import { GrLanguage } from 'react-icons/gr'
import { SlSocialInstagram } from 'react-icons/sl'
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube } from 'react-icons/ti'
import { Link } from 'react-router'

function Footer() {
  return (
    <div className='flex flex-col  '>
      <div className='w-[100%] bg-black flex flex-col justify-center   py-3  '>
      <div className='flex w-[90%] mx-auto xl:justify-between lg:justify-between justify-center items-center'>
        <p className='text-[#8c8a8a] open-sans-text text-[12px] hidden xl:block lg:block'>Visit Other Ubisoft Channels
        </p>

        <div className='flex gap-[20px] justify-center items-center'>
          <Link  to={"https://x.com/ubisoft"} target="_blank" rel="noopener noreferrer"  className='text-black hidden bg-[#fff] hover:text-white hover:bg-[#908e8e]/50 duration-400 cursor-pointer rounded-2xl p-[5px]'>
            <FaXTwitter  size={20} />
          </Link>
          <Link to={"https://www.twitch.tv/ubisoft"} target="_blank" rel="noopener noreferrer"  className='text-black hidden bg-[#fff] hover:text-white hover:bg-[#908e8e]/50 duration-400 cursor-pointer rounded-2xl p-[5px]'>
            <FaTwitch  size={20} />
          </Link>
          <Link to={"https://www.facebook.com/ubisoft"} target="_blank" rel="noopener noreferrer"  className='text-black hidden bg-[#fff] hover:text-white hover:bg-[#908e8e]/50 duration-400 cursor-pointer rounded-2xl p-[5px]'>
            <TiSocialFacebook  size={20} />
          </Link>
          <Link to={"https://discord.com/invite/ubisoftofficial"} target="_blank" rel="noopener noreferrer"  className='text-black bg-[#fff] hover:text-white hover:bg-[#908e8e]/50 duration-400 cursor-pointer rounded-2xl p-[5px]'>
            <FaDiscord size={25} />
          </Link>
          <Link to={"https://www.youtube.com/channel/UC62IIuaPmV-KeuYmEaIZ0eQ"} target="_blank" rel="noopener noreferrer"  className='text-black hidden bg-[#fff] hover:text-white hover:bg-[#908e8e]/50 duration-400 cursor-pointer rounded-2xl p-[5px]'>
            <TiSocialYoutube  size={20} />
          </Link>
          <Link to={"https://www.instagram.com/ubisoftuk/#"} target="_blank" rel="noopener noreferrer"  className='text-black bg-[#fff] hidden hover:text-white hover:bg-[#908e8e]/50 duration-400 cursor-pointer rounded-2xl p-[5px]'>
            <SlSocialInstagram  size={20} />
          </Link>
          <Link to={"https://www.linkedin.com/company/ubisoft/"} target="_blank" rel="noopener noreferrer"  className='text-black hidden bg-[#fff] hover:text-white hover:bg-[#908e8e]/50 duration-400 cursor-pointer rounded-2xl p-[5px]'>
            <TiSocialLinkedin  size={20} />
          </Link>
        </div>

        <p className='xl:block lg:block'></p>
        </div>
      </div>
      <div className=' bg-[#1D1E22] flex flex-col gap-[40px] px-[30px] py-[60px]'>
        <div className='flex justify-between items-center xl:flex-row lg:flex-row md:flex-row flex-col gap-[50px] '>
          <Link to={"/"} className='w-fit'>
            <img src="/assets/img/logo.png" className='w-[120px]' alt="" />
          </Link>
          <div className='bg-gray-400/40 cursor-pointer py-[14px] px-[30px] rounded-4xl ubisoft-bold text-[1.125em] text-white'>
          Download Ubisoft Connect
          </div>
          <div className='flex items-center gap-[10px] cursor-pointer text-[1.5em] ubisoft-bold text-white'>
          <GrLanguage size={35} /> English
          </div>
        </div>
        <div className='flex lg:flex-row xl:flex-row md:flex-row flex-col  lg:text-left items-center gap-[20px] xl:text-left md:text-left lg:justify-between xl:justify-between  justify-center text-center '>
          <div className='w-[20%] text-[0.875em] text-white  ubisoft-bold flex  flex-col gap-[5px]'>
            <h1 className='cursor-pointer hover:underline '>PRIVACY</h1>
            <h1 className='cursor-pointer hover:underline '>Terms of Use</h1>
            <h1 className='cursor-pointer hover:underline '>LEGAL INFO</h1>
            <h1 className='cursor-pointer hover:underline '>Set cookies</h1>
          </div>
          <div className='w-[20%] text-[0.875em] text-white ubisoft-bold flex  flex-col gap-[5px]'>
            <h1 className='cursor-pointer hover:underline '>UBISOFT CONNECT</h1>
            <h1 className='cursor-pointer hover:underline '>HELP</h1>
          </div>
          <div className='w-[20%] text-[0.875em] text-white ubisoft-bold flex  flex-col gap-[5px]'>
            <h1 className='cursor-pointer hover:underline '>INVESTORS</h1>
            <h1 className='cursor-pointer hover:underline '>PRESS</h1>
          </div>
          <div className='w-[20%] text-[0.875em] text-white ubisoft-bold flex  flex-col gap-[5px]'>
            <h1 className='cursor-pointer hover:underline '>COMPANY</h1>
            <h1 className='cursor-pointer hover:underline '>CAREERS</h1>
            <h1 className='cursor-pointer hover:underline '>LOCATIONS</h1>
            <h1 className='cursor-pointer hover:underline '>More than Games</h1>
          </div>
          <div className='w-[20%] text-[#959393] ubisoft-text text-[.7em] text-right  flex  flex-col gap-[5px]'>
            <h1>© 2025 Ubisoft Entertainment. All Rights Reserved. Ubisoft, Ubi.com and the Ubisoft logo are trademarks of Ubisoft Entertainment in the U.S. and/or other countries.</h1>
          </div>
        </div>
        <div className='flex flex-col xl:items-start lg:items-start md:items-start items-center justify-start'>
          <h1 className='ubisoft-text text-[.8em] text-[#959393] hover:underline'>UK Tax strategy</h1>
          <h1 className='ubisoft-text text-[.8em] text-[#959393] hover:underline'>Modern Slavery Statement</h1>
        </div>

      </div>
    </div>
  )
}

export default Footer