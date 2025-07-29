import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';

function SearchSec({ searchSec, setSearchSec }) {
  const ref = useRef(null);
  const [inputprop,setInputProp]=useState('')
  console.log(inputprop);
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchSec(false); // Modalı bağla
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchSec]);

  return (
    <>
     
      <div className='fixed inset-0 bg-black opacity-60 z-100'></div>

     
      <div
        ref={ref}
        className='h-[500px] bg-white w-[45%] fixed z-110 left-[50%] top-[5px]  translate-x-[-50%]  rounded-2xl overflow-hidden'
      >
        <div className='flex items-center bg-gray-300 px-[10px] gap-[10px]'>
          <IoSearch size={25} className='h-[40px] cursor-pointer' />
          <input
          onChange={(e)=>setInputProp(e.target.value)}
            type='text'
            value={inputprop}
            autoFocus 
            className='w-[100%] placeholder-black  bg-gray-300 h-[40px] px-[10px] focus:outline-none'
            placeholder='Type your search'
          />
          {
            inputprop.length==0 ?'':<IoIosClose onClick={()=>setInputProp('')} size={23} className='cursor-pointer' />
          }
          
        </div>
        <div>{/* Buraya əlavə kontent gələ bilər */}</div>
      </div>
    </>
  );
}

export default SearchSec;
