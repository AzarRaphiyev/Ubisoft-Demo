import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { GameContext } from '../context/DataContext';

function GameHeadSection({setGameBar,setGameSection}) {
    const [games, setGames] = useState([])
    const { gamedata } = useContext(GameContext);

    useEffect(() => {
        if (gamedata) {
            setGames(gamedata);
            
        }
    }, [gamedata]);
    

    const allPlatforms = games?.length
    ? [...new Set(games.flatMap(game => game.platforms))]
    : [];
  



  return (
    <div
    onMouseEnter={() => {setGameBar(true) ,setGameSection(true)}}
    onMouseLeave={() => {setGameBar(false) ,setGameSection(false)}}
    className='w-[94%] hidden xl:block z-101  py-[20px] px-[50px] bg-[#fff] mx-auto text-[#000] fixed left-[50%] translate-x-[-50%] top-[50px]'>
        <div className='flex justify-center'>
            <div className='w-[30%] ubisoft-text flex   flex-col gap-[10px]'>
                <div>
                    <h1 className='py-[5px] font-semibold text-[0.75rem] uppercase ubisoft-bold text-[#1d1e22] '>Browse By Category</h1>
                    <hr className='w-[60%] my-[5px]'/>
                    <ul className='flex flex-col gap-[5px] text-[15px] '>
                        <Link onClick={() => {setGameBar(false) ,setGameSection(false)}}  to={'/store'} className='cursor-pointer hover:font-bold '>Featured</Link>
                        <Link onClick={() => {setGameBar(false) ,setGameSection(false)}}  to={'/allgames'} className='cursor-pointer hover:font-bold '>New To Old</Link>
                        <Link onClick={() => {setGameBar(false) ,setGameSection(false)}}  to={"/store?free=true"} className='cursor-pointer hover:font-bold '>
                            Free To Play
                            </Link>


                    </ul>
                </div>
                <div>
                    <h1 className='py-[5px] font-semibold text-[0.75rem] uppercase ubisoft-bold text-[#1d1e22]'>Browse By Platform</h1>
                    <hr className='w-[60%] my-[5px]'/>
                    <ul className='flex flex-col gap-[5px] text-[15px] '>
                        {
                            allPlatforms.map(item=>(<Link onClick={() => {setGameBar(false) ,setGameSection(false)}}  to={`/allgames?platform=${item}`} className='cursor-pointer hover:font-bold '>{item}</Link>))
                        }
                        
                        
                    </ul>
                </div>
            </div>
            <div className='w-[30%] ubisoft-text flex   flex-col gap-[10px]'>
                <div>
                    <h1 className='py-[5px] font-semibold text-[0.75rem] uppercase ubisoft-bold text-[#1d1e22]'>Browse By Game</h1>
                    <hr className='w-[60%] my-[5px]'/>
                    <ul className='flex flex-col gap-[5px] text-[15px] '>
                        {
                          games.slice(0,10).map(item=>(<Link onClick={() => {setGameBar(false) ,setGameSection(false)}}  to={`detail/${item.type}/${item.id}`} className='cursor-pointer hover:font-semibold  '>{item.title}</Link>))  
                        }
                        
                        
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
            <Link  onClick={() => {setGameBar(false) ,setGameSection(false)}} to={'/allgames'}  ><p className='uppercase text-white bg-[#D80388] hover:bg-[#fff] hover:border-[#D80388] border-2 hover:text-black  py-1 px-7 rounded-2xl duration-300'>
            View All Games</p></Link>
            <Link onClick={() => {setGameBar(false) ,setGameSection(false)}} to={'/store'}  ><p className='uppercase text-white bg-[#D80388] hover:bg-[#fff] hover:border-[#D80388] border-2 hover:text-black py-1 px-7 rounded-2xl duration-300'>
            View All </p></Link>
        </div>
    </div>
  )
}

export default GameHeadSection