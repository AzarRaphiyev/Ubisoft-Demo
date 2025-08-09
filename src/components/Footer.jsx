import React from 'react'
import { FaDiscord, FaTwitch } from 'react-icons/fa'
import { FaMeta, FaXTwitter } from 'react-icons/fa6'
import { GrLanguage } from 'react-icons/gr'
import { SlSocialInstagram } from 'react-icons/sl'
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube } from 'react-icons/ti'
import { Link } from 'react-router'

function Footer() {
  return (
    <div className='flex flex-col'>
      {/* Top Social Media Section */}
      <div className='w-full bg-black flex flex-col justify-center py-3'>
        <div className='flex w-[90%] mx-auto xl:justify-between lg:justify-between justify-center items-center'>
          <p className='text-[#8c8a8a] open-sans-text text-sm hidden xl:block lg:block'>
            Visit Other Ubisoft Channels
          </p>
  
          <div className='flex gap-5 justify-center items-center'>
            <Link to={"https://x.com/ubisoft"} target="_blank" rel="noopener noreferrer" 
              className='hidden text-black bg-white hover:text-white hover:bg-[#908e8e]/50 transition-all duration-300 cursor-pointer rounded-2xl p-2'>
              <FaXTwitter size={20} />
            </Link>
            <Link to={"https://www.twitch.tv/ubisoft"} target="_blank" rel="noopener noreferrer" 
              className='hidden text-black bg-white hover:text-white hover:bg-[#908e8e]/50 transition-all duration-300 cursor-pointer rounded-2xl p-2'>
              <FaTwitch size={20} />
            </Link>
            <Link to={"https://www.facebook.com/ubisoft"} target="_blank" rel="noopener noreferrer" 
              className='hidden text-black bg-white hover:text-white hover:bg-[#908e8e]/50 transition-all duration-300 cursor-pointer rounded-2xl p-2'>
              <TiSocialFacebook size={20} />
            </Link>
            <Link to={"https://discord.com/invite/ubisoftofficial"} target="_blank" rel="noopener noreferrer" 
              className='text-black bg-white hover:text-white hover:bg-[#908e8e]/50 transition-all duration-300 cursor-pointer rounded-2xl p-2'>
              <FaDiscord size={22} />
            </Link>
            <Link to={"https://www.youtube.com/channel/UC62IIuaPmV-KeuYmEaIZ0eQ"} target="_blank" rel="noopener noreferrer" 
              className='hidden text-black bg-white hover:text-white hover:bg-[#908e8e]/50 transition-all duration-300 cursor-pointer rounded-2xl p-2'>
              <TiSocialYoutube size={20} />
            </Link>
            <Link to={"https://www.instagram.com/ubisoftuk/#"} target="_blank" rel="noopener noreferrer" 
              className='hidden text-black bg-white hover:text-white hover:bg-[#908e8e]/50 transition-all duration-300 cursor-pointer rounded-2xl p-2'>
              <SlSocialInstagram size={20} />
            </Link>
            <Link to={"https://www.linkedin.com/company/ubisoft/"} target="_blank" rel="noopener noreferrer" 
              className='hidden text-black bg-white hover:text-white hover:bg-[#908e8e]/50 transition-all duration-300 cursor-pointer rounded-2xl p-2'>
              <TiSocialLinkedin size={20} />
            </Link>
          </div>
  
          <div className='xl:block lg:block hidden w-4'></div>
        </div>
      </div>
  
      {/* Main Footer Section */}
      <div className='bg-[#1D1E22] flex flex-col gap-10 px-6 py-12 md:px-8 lg:px-12 xl:px-16'>
        {/* Top Row: Logo, Download Button, Language */}
        <div className='flex justify-between items-center flex-col xl:flex-row lg:flex-row md:flex-row gap-8 md:gap-6'>
          <Link to={"/"} className='w-fit order-1 md:order-1'>
            <img src="/assets/img/logo.png" className='w-32 md:w-36' alt="Ubisoft Logo" />
          </Link>
          
          <div className='bg-gray-400/40 hover:bg-gray-400/60 transition-colors cursor-pointer py-3 px-6 md:py-4 md:px-8 rounded-full ubisoft-bold text-base md:text-lg text-white order-3 md:order-2'>
            Download Ubisoft Connect
          </div>
          
          <div className='flex items-center gap-3 cursor-pointer text-lg md:text-xl ubisoft-bold text-white order-2 md:order-3'>
            <GrLanguage size={30} className="md:w-8 md:h-8" /> 
            <span className="text-base md:text-lg">English</span>
          </div>
        </div>
  
        {/* Footer Links Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-6 text-center md:text-left'>
          {/* Privacy & Legal */}
          <div className='flex flex-col gap-3'>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              PRIVACY
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              Terms of Use
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              LEGAL INFO
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              Set cookies
            </h1>
          </div>
  
          {/* Ubisoft Connect & Help */}
          <div className='flex flex-col gap-3'>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              UBISOFT CONNECT
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              HELP
            </h1>
          </div>
  
          {/* Investors & Press */}
          <div className='flex flex-col gap-3'>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              INVESTORS
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              PRESS
            </h1>
          </div>
  
          {/* Company Info */}
          <div className='flex flex-col gap-3'>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              COMPANY
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              CAREERS
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              LOCATIONS
            </h1>
            <h1 className='cursor-pointer hover:underline text-white ubisoft-bold text-sm md:text-base transition-all duration-200'>
              More than Games
            </h1>
          </div>
  
          {/* Copyright */}
          <div className='md:col-span-2 lg:col-span-4 xl:col-span-1 text-center xl:text-right'>
            <p className='text-[#959393] ubisoft-text text-xs md:text-sm leading-relaxed'>
              © 2025 Ubisoft Entertainment. All Rights Reserved. Ubisoft, Ubi.com and the Ubisoft logo are trademarks of Ubisoft Entertainment in the U.S. and/or other countries.
            </p>
          </div>
        </div>
  
        {/* Bottom Links */}
        <div className='flex flex-col items-center xl:items-start lg:items-start md:items-start gap-2'>
          <h1 className='ubisoft-text text-sm md:text-base text-[#959393] hover:underline cursor-pointer transition-all duration-200'>
            UK Tax strategy
          </h1>
          <h1 className='ubisoft-text text-sm md:text-base text-[#959393] hover:underline cursor-pointer transition-all duration-200'>
            Modern Slavery Statement
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Footer