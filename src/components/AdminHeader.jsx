import React, { useState } from 'react'
import { FaGamepad } from 'react-icons/fa'
import { IoMenu, IoClose } from 'react-icons/io5'
import {  MdSendTimeExtension } from 'react-icons/md'
import { TbUniverse } from 'react-icons/tb'
import { TfiLayoutSlider } from "react-icons/tfi";
import { Link } from 'react-router'

function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const menuItems = [
    { name: 'Slider', icon: <TfiLayoutSlider  size={20} /> },
    { name: 'universe', icon: <TbUniverse  size={20} /> },
    { name: 'game', icon: <FaGamepad  size={20} /> },
    { name: 'dlcs', icon: <MdSendTimeExtension  size={20} /> }
  ]

  return (
    <>
      <div className='w-full h-[70px] bg-gradient-to-r from-blue-900 via-blue-600 to-blue-800 shadow-lg fixed top-0 z-[100]'>
        <header className='w-[95%] mx-auto px-[15px] sm:px-[30px] flex justify-between items-center h-full'>
          {/* Left Side - Logo and Menu */}
          <div className='flex items-center gap-4 sm:gap-8'>
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className='lg:hidden text-white hover:text-blue-200 transition-colors p-2'
            >
              <IoMenu size={28} />
            </button>

            {/* Logo */}
            <Link to={'/'} className='flex items-center gap-3'>
              <img 
                src="https://a.storyblok.com/f/185929/3590x1158/f32a1d3904/ubisoft-horizontal-logo-white_1.png/m/fit-in/1200x0/filters:quality(85):format(webp)" 
                className='w-[150px] h-auto' 
                alt="Ubisoft Logo" 
              />
              
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center gap-6'>
            {menuItems.map((item, index) => (
              <Link
              to={`${item.name}`}
                key={index}
                className='flex items-center cursor-pointer gap-2 text-white hover:text-blue-200 hover:bg-blue-800/50 px-4 py-2 rounded-lg transition-all duration-300 font-medium'
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side - User Actions */}
          <div className='flex items-center gap-3'>
            {/* Admin Badge */}
            <div className='hidden sm:flex items-center gap-2 bg-blue-800/50 px-3 py-1 rounded-full'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-white text-sm font-medium'>Admin</span>
            </div>
            
            {/* Profile Button */}
            <button className='w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold transition-colors'>
              A
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-[90] lg:hidden'
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-gradient-to-b from-blue-900 to-blue-800 transform transition-transform duration-300 ease-in-out z-[100] lg:hidden shadow-2xl ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Mobile Header */}
        <div className='flex justify-between items-center p-6 border-b border-blue-700'>
          <div className='flex items-center gap-3'>
           
            <div>
              <h2 className='text-white font-bold text-lg'>Admin</h2>
              <p className='text-blue-200 text-xs'>Panel</p>
            </div>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className='text-white hover:text-blue-200 transition-colors p-2'
          >
            <IoClose size={24} />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav className='pt-6'>
          <div className='flex flex-col'>
            {menuItems.map((item, index) => (
              <Link 
              to={`${item.name}`}
                key={index}
                onClick={toggleMobileMenu}
                className='flex items-center gap-4 text-white hover:text-blue-200 hover:bg-blue-800/50 px-6 py-4 transition-all duration-300 text-left font-medium border-b border-blue-700/30'
              >
                {item.icon}
                <span className='text-lg'>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className='absolute bottom-6 left-6 right-6'>
            <div className='flex items-center gap-3 bg-blue-800/50 px-4 py-3 rounded-lg'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              <div>
                <p className='text-white font-medium'>Administrator</p>
                <p className='text-blue-200 text-xs'>Online</p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Content Spacer */}
      <div className='h-[70px]'></div>
    </>
  )
}

export default AdminHeader