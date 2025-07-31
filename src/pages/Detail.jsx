import React from 'react'
import { CiHeart } from 'react-icons/ci';
import { useParams } from 'react-router'
import GameSlider from '../components/GameSlider';


function Detail() {
    const {id}=useParams()
    console.log(id);
    
  return (
    <div className='py-[50px]'>
      {/* Detail Header Section */}
      <header className='w-[100%] sticky bg-black px-[30px]'>
        <div>
          <div>
            <img src="https://cloud.shopback.com/c_scale,c_auto,q_70,f_webp/media-production-aps1/tsUCkcIrNuM/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vZGlyZWN0L0VHQnFwQVo1T2U5MTg5VkROSi9yZXF1ZXN0cy8wMDAvMDQ5LzA3OC84MzAvTFdYckExcVJvUXZYVjU0Snp5cE1KZWdCai9hY2QxZjYzM2E2MDRkZjNlODM5ZDQ1OWI1MmM1YjU0Njg3NDEyMjY3LnBuZw.jpg" className='w-[100px]' alt="" />
          </div>
          <div className='flex '>
            <h1>as</h1>
            <h1>as</h1>
            <h1>as</h1>
          </div>
          <div></div>
        </div>
        <div></div>
      </header>

      {/* Banner Section */}
    <div className=' bg-white relative  mb-[90px] '>



      
      <div className=' relative '>
        <div><img className='w-[100%]' src="https://store.ubisoft.com/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw3dc29355/images/pdpbanner/6638e5dcaa201a2d55bcc772-bg.jpg?sw=1920&sfrm=jpg" alt="" /></div>
        <div className='absolute top-0 flex w-[100%] h-[100%] justify-between px-[30px] pt-[30px]'>
          <div className='flex flex-col gap-[80px]'>
            <div><img src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwf3a4f54b/Anno%20117/Logo_Anno117_EN.png" className='w-[200px]' alt="" /></div>
            <div>
              <h1 className='ubisoft-bold text-[2.5vw] text-[#fff]'>Anno 117: Pax Romana - </h1>
              <h1 className='ubisoft-bold text-[2.5vw] text-[#fff]'>Standard Edition</h1>
              <p className='ubisoft-text text-[#fff]'>Release date: 13/11/2025</p>
              <button className='ubisoft-bold px-[30px] py-[5px]  border-[#fff] border-[1px] duration-200 my-[15px] text-[20px] cursor-pointer text-[#fff] rounded-2xl hover:border-[#000] hover:bg-[#fff] hover:text-[#000] '>Discover Editions</button>
            </div>
          </div>
          <div className='flex flex-col justify-between items-end '>
            <div className='flex gap-[10px] items-center justify-between p-[10px] bg-[#2a2a2a]/70 rounded-xl '>
              <img className='w-[55px]'  src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw1531754a/12_Pending.PNG" alt="" />
              <p className='ubisoft-text text-[#fff]'>Bad Language, Violence</p>
              </div>
          <div>
            <div className='h-[210px] w-[400px] bg-black p-[30px] flex  flex-col justify-between'>
              <div className='bg-[#45464A] px-[10px] rounded'>
                <p className='ubisoft-text text-[#fff] text-[2.5vw]'>$45.55</p>
              </div>
              <div className='flex items-center justify-between' >
                <button className='text-center text-[#fff] text-[23px] open-sans-bold bg-[#006EF5] w-[85%] p-[2px] rounded-2xl cursor-pointer hover:text-[black] duration-300'>Pre-Order</button>
                <CiHeart className='text-[#fff] ' size={40}/>
              </div>

            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
    {/* Slider Section */}
    <div  className='pb-[50px]'>

      <GameSlider />
    </div >
    {/* About Section */}
    <div className='container2 mx-auto flex flex-col gap-[20px] '>
    <h1 className='ubisoft-bold text-white text-2xl' >About this game</h1>
    <div className='flex justify-between bg-[#1B1B1B] px-[30px] py-[20px] rounded-lg'>

      <div className='flex flex-col w-[70%] gap-[10px] items-start '>
        <p className='ubisoft-text  text-[18px]'>Enter the world of feudal Japan! Unleash your inner Assassin as Naoe, a stealthy and cunning shinobi, and strike from the shadows. Or take command as Yasuke, a towering samurai, and dominate the battlefield.</p>
        <div className='flex gap-[5px]'>
          <p className='ubisoft-bold text-[16px]'>Release date:</p>
          <p className='ubisoft-text text-[16px]'>20/03/2025</p>
        </div>
      </div>
      <div className='w-[20%] flex flex-col gap-[10px]'>
        <div>
          <h3 className='ubisoft-bold text-white mb-[5px] text-[16px] '>Platform:</h3>
          <div className='flex flex-wrap gap-3'>
          <button className='border-white border-[2px] px-[16px] py-[1.5px]  ubisoft-bold rounded uppercase text-[14px]'>azer</button>
          <button className='border-white border-[2px] px-[16px] py-[1.5px] ubisoft-bold rounded uppercase text-[14px]'>azerbaycanlilar</button>
          <button className='border-white border-[2px] px-[16px] py-[1.5px] ubisoft-bold rounded uppercase text-[14px]'>azer</button>
          <button className='border-white border-[2px] px-[16px] py-[1.5px] ubisoft-bold rounded uppercase text-[14px]'>azer</button>
          </div>
        </div>
        <div >
          <h3 className='ubisoft-bold text-white mb-[5px] text-[16px] '>Genre:</h3>
          <div className='flex flex-wrap gap-3'>
          <button className='border-white border-[2px] px-[16px] py-[1.5px]  ubisoft-bold rounded uppercase text-[14px]'>azer</button>
          <button className='border-white border-[2px] px-[16px] py-[1.5px] ubisoft-bold rounded uppercase text-[14px]'>azerbaycanlilar</button>
          <button className='border-white border-[2px] px-[16px] py-[1.5px] ubisoft-bold rounded uppercase text-[14px]'>azer</button>
          <button className='border-white border-[2px] px-[16px] py-[1.5px] ubisoft-bold rounded uppercase text-[14px]'>azer</button>
          </div>
        </div>
        
      </div>
    </div>
    </div>

    {/* Navbar Detail Section */}

    <div className='flex bg-black gap-[50px] justify-center mt-[50px] h-[80px] items-center'>
      <p className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>Editions</p>
      <p className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>More Content</p>
      <p className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>General Information</p>
      <p className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>Pc Specs</p> 
    </div>


    </div>
  )
}

export default Detail