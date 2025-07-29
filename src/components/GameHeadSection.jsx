import React from 'react'
import { Link } from 'react-router'

function GameHeadSection({setGameBar,setGameSection}) {
  return (
    <div
    onMouseEnter={() => {setGameBar(true) ,setGameSection(true)}}
    onMouseLeave={() => {setGameBar(false) ,setGameSection(false)}}
    className='w-[94%] hidden xl:block z-100  py-[20px] px-[50px] bg-[#fff] mx-auto text-[#000] fixed left-[50%] translate-x-[-50%] top-[50px]'>
        <div className='flex justify-center'>
            <div className='w-[30%] ubisoft-text flex   flex-col gap-[10px]'>
                <div>
                    <h1 className='py-[5px] font-semibold text-[0.75rem] uppercase ubisoft-bold text-[#1d1e22] '>Browse By Category</h1>
                    <hr className='w-[60%] my-[5px]'/>
                    <ul className='flex flex-col gap-[5px] text-[15px] '>
                        <li className='cursor-pointer hover:font-bold '>Featured</li>
                        <li className='cursor-pointer hover:font-bold '>New To Old</li>
                        <li className='cursor-pointer hover:font-bold '>Free To Play</li>
                    </ul>
                </div>
                <div>
                    <h1 className='py-[5px] font-semibold text-[0.75rem] uppercase ubisoft-bold text-[#1d1e22]'>Browse By Platform</h1>
                    <hr className='w-[60%] my-[5px]'/>
                    <ul className='flex flex-col gap-[5px] text-[15px] '>
                        <li className='cursor-pointer hover:font-bold '>PC</li>
                        <li className='cursor-pointer hover:font-bold '>Xbox</li>
                        <li className='cursor-pointer hover:font-bold '>PlayStation</li>
                        <li className='cursor-pointer hover:font-bold '>Nintendo Switch</li>
                        <li className='cursor-pointer hover:font-bold '>Virtual Reality</li>
                        <li className='cursor-pointer hover:font-bold '>Mobile</li>
                    </ul>
                </div>
            </div>
            <div className='w-[30%] ubisoft-text flex   flex-col gap-[10px]'>
                <div>
                    <h1 className='py-[5px] font-semibold text-[0.75rem] uppercase ubisoft-bold text-[#1d1e22]'>Browse By Game</h1>
                    <hr className='w-[60%] my-[5px]'/>
                    <ul className='flex flex-col gap-[5px] text-[15px] '>
                        <li className='cursor-pointer hover:font-semibold  '>Assassin's Creed Shadows</li>
                        <li className='cursor-pointer hover:font-semibold'>Rainbow Six Siege X</li>
                        <li className='cursor-pointer hover:font-semibold'>Star Wars Outlaws</li>
                        <li className='cursor-pointer hover:font-semibold'>Anno 117 : Pax Romana</li>
                        <li className='cursor-pointer hover:font-semibold'>Avatar: Frontiers of Pandora</li>
                        <li className='cursor-pointer hover:font-semibold'>Skull and Bones</li>
                        <li className='cursor-pointer hover:font-semibold'>The Crew Motorfest</li>
                        <li className='cursor-pointer hover:font-semibold'>Assassin's Creed Mirage</li>
                        <li className='cursor-pointer hover:font-semibold'>Just Dance 2025 Edition</li>
                        <li className='cursor-pointer hover:font-semibold'>For Honor</li>
                    </ul>
                </div>
                
            </div>
            <div className='w-fit ubisoft-text flex   flex-col gap-[10px]'>
                <div>
                    <h1 className='py-[5px] font-semibold text-[0.75rem] uppercase ubisoft-bold text-[#1d1e22]'>Most Popular</h1>
                    <hr className=' my-[5px] mb-[15px] text-[#c1b4b4] '/> 
                    <div className='flex justify-between gap-[20px]'>
                        <div className='w-[33.33%] flex flex-col gap-[5px]'>
                            <img src="./assets/img/gameSection/rainbow.webp" alt="" className='w-[150px] py-[10px] px-[25px] bg-[#F0F3F4]' />
                            <div className='w-[70%]'>
                                <h1 className='ubisoft-bold hover:underline cursor-pointer'>Tom Clancy’s Rainbow Six Siege</h1>
                                <p className='open-sans-text text-[14px] text-[#1d1e22]'>1,200 R6 Credits</p>
                                <p className='open-sans-text text-[#D80388] text-[20px]'>$9.99</p>
                            </div>
                        </div>
                        <div className='w-[33.33%] flex flex-col gap-[5px]'>
                            <img src="./assets/img/gameSection/ubisoftPremiumwebp.webp" alt="" className='w-[150px] py-[10px] px-[25px] bg-[#F0F3F4]' />
                            <div className='w-[70%]'>
                                <h1 className='ubisoft-bold hover:underline cursor-pointer'>Premium</h1>
                                <p className='open-sans-text text-[14px] text-[#1d1e22]'>Ubisoft+ Premium Monthly</p>
                                <p className='open-sans-text text-[#D80388] text-[20px]'>$17.99</p>
                            </div>
                        </div>
                        <div className='w-[33.33%] flex flex-col gap-[5px]'>
                            <img src="./assets/img/gameSection/theDvision.jpg" alt="" className='w-[150px] py-[10px] px-[25px] bg-[#F0F3F4]' />
                            <div className='w-[70%]'>
                                <h1 className='ubisoft-bold hover:underline cursor-pointer'>Tom Clancy's The Division 2</h1>
                                <p className='open-sans-text text-[14px] text-[#1d1e22]'>Battle for Brooklyn</p>
                                <p className='open-sans-text text-[#D80388] text-[20px]'>$14.99</p>
                            </div>
                        </div>
                      
                        
                       
                    </div>
                </div>
                
            </div>
        </div>
        <div className='flex my-5 w-[60%] mx-auto justify-between'>
            <Link to={''}  ><p className='uppercase text-white bg-[#D80388] hover:bg-[#fff] hover:border-[#D80388] border-2 hover:text-black  py-1 px-7 rounded-2xl duration-300'>
            View All Games</p></Link>
            <Link to={''}  ><p className='uppercase text-white bg-[#D80388] hover:bg-[#fff] hover:border-[#D80388] border-2 hover:text-black py-1 px-7 rounded-2xl duration-300'>
            View All </p></Link>
        </div>
    </div>
  )
}

export default GameHeadSection