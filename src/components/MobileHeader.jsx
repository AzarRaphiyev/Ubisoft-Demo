import React, { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { MdSaveAlt } from 'react-icons/md'
import { Link, useNavigate } from 'react-router'

function MobileHeader({mobilesec2,setMobileSec2}) {
    const [mobilesec , setMobileSec]=useState(true)
    const [inputprop, setInputProp] = useState('');

    const navigate = useNavigate();
    const handleSearch = () => {
      if (inputprop.trim() !== '') {
        navigate(`/resulte?query=${encodeURIComponent(inputprop.trim())}`);
      }
      setMobileSec2(!mobilesec2)
    };
 
    return (
    <div  className={`bg-black fixed text-white z-[200] py-[30px] h-[100vh] w-[100vw] transition-all duration-500 ${
        mobilesec2 ? 'top-[-100%]' : 'top-[50px]'
      }`}>
        <div className='w-[90%] mx-auto flex flex-col gap-[20px]'>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <div onClick={()=>setMobileSec(!mobilesec)} className='w-[100%] flex flex-col gap-[10px]  '>
       <div className='flex items-center justify-between '>
         <h1 className='text-[24px] ubisoft-bold'>GAMES</h1>
         {mobilesec?<IoMdArrowDropdown size={25} />:<IoMdArrowDropup size={25} />}
       </div>
        {mobilesec?'':<div className='flex flex-col gap-[8px] pl-[8px]'>
        <Link onClick={()=>setMobileSec2(!mobilesec2)}  className='ubisoft-bold cursor-pointer' to="store">Browse By Category</Link>
        <Link onClick={()=>setMobileSec2(!mobilesec2)}  className='ubisoft-bold cursor-pointer' to="store">Browse By Game</Link>
        <Link onClick={()=>setMobileSec2(!mobilesec2)}  className='ubisoft-bold cursor-pointer' to="ubisoftplus">Ubisoft+</Link>
        </div>}
        </div>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <h1 onClick={()=>setMobileSec2(!mobilesec2)} className='text-[24px] ubisoft-bold flex gap-[5px] items-center'>HELP <p className='mx-2'><FaExternalLinkAlt size={12}/></p></h1>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <Link onClick={()=>setMobileSec2(!mobilesec2)} to="store" className='text-[24px] ubisoft-bold flex gap-[5px] items-center'>STORE <p className='mx-2'><FaExternalLinkAlt size={12}/></p></Link>
        <hr className="h-[0.1px] bg-gray-400 border-none" />
        <Link to={"ubisoftplus"} onClick={()=>setMobileSec2(!mobilesec2)} className='text-[24px] ubisoft-bold flex gap-[5px] items-center'>UBISOFT+ <p className='mx-2'><FaExternalLinkAlt size={12}/></p></Link>
        <hr className="h-[0.1px] bg-gray-400 border-none" />

        <div className='text-white uppercase ubisoft-text flex  justify-center  '>
        <Link to="/" onClick={()=>setMobileSec2(!mobilesec2)} className=' h-[50px] text-white flex justify-center items-center'>
        <p className='font-bold  text-[13px]'>Download Ubisoft Connect</p>
        <p className='mx-2'><MdSaveAlt size={17}/></p>
        </Link>
        </div>
        <div className='bg-[#393939] flex items-center rounded-2xl px-[10px]'>
        <IoSearch onClick={handleSearch} size={25} className='h-[35px] cursor-pointer' />

        <input  onChange={(e) => setInputProp(e.target.value)}
        
        type='text'
        value={inputprop}
         placeholder='Type your search' active className=' h-[35px] px-[5px] focus:outline-none w-[90%] mx-auto' />
        </div>

        </div>
    </div>
  )
}

export default MobileHeader