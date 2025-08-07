import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../context/DataContext';
import { Loader } from 'lucide-react';
import { Link } from 'react-router';
import { FaWindows, FaPlaystation, FaXbox, FaApple } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

function GameFilter() {
    const [games, setGames] = useState()
    const [filteredGames, setFilteredGames] = useState()
    const [platformInput, setPlatformInput] = useState("")
    const [sortInput, setSortInput] = useState("new")
    const { gamedata } = useContext(GameContext);
    const [searchParams] = useSearchParams();
    const urlPlatform = searchParams.get('platform');
    useEffect(() => {
        if (urlPlatform) {
          setPlatformInput(urlPlatform);
        } else {
          setPlatformInput("all");
        }
      }, [urlPlatform]);
    useEffect(() => {
        if (gamedata) {
            setGames(gamedata);
            setFilteredGames(gamedata);
        }
    }, [gamedata]);

    // Platform filtering və sorting
    useEffect(() => {
        if (games) {
            let filtered = games;

            // Platform filtering
            if (platformInput !== "all") {
                filtered = games.filter(game => 
                    game.platforms.some(platform => 
                        platform.toLowerCase().includes(platformInput.toLowerCase())
                    )
                );
            }

            // Sorting
            if (sortInput === "new") {
                filtered = [...filtered].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            } else if (sortInput === "old") {
                filtered = [...filtered].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
            }

            setFilteredGames(filtered);
        }
    }, [games, platformInput, sortInput]);

    if (!games) {
        return <div className="flex justify-center items-center h-64"><Loader className="animate-spin" /></div>
    }

    const allPlatforms = [...new Set(games.flatMap(game => game.platforms))];

    // Platform icon göstərmək üçün funksiya

    const getPlatformIcons = (platforms) => {
      return platforms.map((platform, index) => {
        const p = platform.toLowerCase();
    
        if (p.includes("pc") || p.includes("windows")) {
          return <FaWindows key={index} className="text-gray-300" />;
        }
    
        if (p.includes("ps") || p.includes("playstation")) {
          return <FaPlaystation key={index} className="text-gray-300" />;
        }
    
        if (p.includes("xbox")) {
          return <FaXbox key={index} className="text-gray-300" />;
        }
    
        if (p.includes("app store") || p.includes("ios")) {
          return <FaApple key={index} className="text-gray-300" />;
        }
    
        // Uyğun ikon tapılmazsa platforma adını text kimi göstər
        return (
          <span key={index} className="text-xs text-gray-400">
            {platform}
          </span>
        );
      });
    };
    
        
    return (
        <div className='py-[60px] bg-gradient-to-b from-[#0E0D0E] via-[#150C15] to-[#0F131E]
'>
            <div className='bg-gradient-to-r from-[#021B39] via-[#1D1230] to-black py-8 px-4'>
                <div className='w-[90%] mx-auto'>
                    <h1 className='ubisoft-bold text-[25px] text-white'>More Games</h1> 
                </div>
            </div>
            <div className='w-[90%] mx-auto py-10 flex flex-col xl:flex-row gap-10  lg:flex-row xl:justify-between lg:justify-between justify-center items-center'>
                <div className='ubisoft-bold text-[18px]'>Sort By:</div>
                <div className='flex flex-col xl:flex-row lg:flex-row gap-10 justify-center w-[50%]'>
                    <select 
                        onChange={(e) => setPlatformInput(e.target.value)}
                        value={platformInput}
                        className=' xl:w-[50%] lg:w-[50%] w-[100%] border-[1px] rounded py-2 px-3 text-[#424242] hover:text-white/90 active:text-white/90 duration-300 ubisoft-text bg-[#202020] hover:bg-[#2f2f2f] text-[16px]' 
                        name="" 
                        id=""
                    >
                        <option value="all">All Platforms</option>
                        {allPlatforms.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <select 
                        onChange={(e) => setSortInput(e.target.value)}
                        value={sortInput}
                        className=' xl:w-[50%] lg:w-[50%] w-[100%] border-[1px] rounded py-2 px-3 text-[#424242] hover:text-white/90 active:text-white/90 duration-300 ubisoft-text bg-[#202020] hover:bg-[#2f2f2f] text-[16px]' 
                        name="" 
                        id=""
                    >
                        <option value="new">New to Old</option>
                        <option value="old">Old to New</option>
                    </select>
                </div>
            </div>

            <div className='w-[90%] mx-auto flex flex-wrap gap-5 justify-center'>
                {filteredGames && filteredGames.length > 0 ? (
                    filteredGames.map((item, index) => (
                        <div key={item.id || index} className='rounded-xl overflow-hidden xl:w-[200px] lg:w-[200px] md:w-[200px] w-[150px] '>
                            <div className='overflow-hidden w-[100%]'>
                                <Link to={`/detail/${item.type}/${item.id}`}>
                                    <img src={item.cardImg} className='w-[250px] hover:scale-105 duration-300' alt={item.title} />
                                </Link>
                            </div>
                            <div className='p-[8px] flex flex-col justify-between'>
                                <div className='flex flex-col gap-5 pb-2'>
                                    <h1 className='text-white ubisoft-bold text-[17px]'>
                                        {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                                    </h1>
                                    <div className='flex items-center gap-2 text-[14px]'>
                                        {getPlatformIcons(item.platforms)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-white text-center w-full">No games found for this platform</div>
                )}
            </div>

            <div className='flex xl:flex-row lg:flex-row flex-col   rounded items-center justify-between px-[20px] py-[10px] container2 mx-auto mt-[20px] bg-gradient-to-r from-[#1D1230]/30 via-[#0a0119]/30 to-[#021B39]/30 '>
                <div>
                    <img className='xl:w-[600px] lg:w-[500px] md:w-[400px] w-[300px]' src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6SfvkXTESPJr6U4faPWqfA/e7dc017f2f6a652d708180474ca48881/UCW_promo_asset_1080_mobile_decom_announcement.png" alt="" />
                </div>

                <div className='flex flex-col items-start xl:w-[30%] lg:w-[30%] w-[100%] '>
                    <h3 className='open-sans-bold text-[30px]'>Ubisoft Connect</h3>
                    <p className='open-sans-text text-[#B5B5B5]'>All your games, friends, and benefits in one place.</p>
                    <button className='py-3 px-10  text-[18px] w-[100%] xl:w-[70%] lg:w-[70%] bg-[#006EF5] mt-3 rounded-4xl font-bold'>Get Ubisoft Connect</button>
                </div>
            </div>

            <div className='flex xl:flex-row container2 mx-auto py-10 px-5 lg:flex-row flex-col gap-10 justify-between items-center'>
                <div>
                    <h3 className='ubisoft-bold xl:text-[40px] lg:text-[35px] md:text-[30px] text-[30px] '>Ubisoft Fan Kits, Wallpapers and More!</h3>
                    <button className='py-5 px-10 text-[18px] w-[100%] xl:w-[50%] lg:w-[50%] bg-[#006EF5] mt-3 rounded-4xl font-bold'>Learn More</button>
                </div>
                <div>
                    <img src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3GuXXIwqLXe9SOVWAElIX1/3f6ef0ee0af05c4db2b96fe3f7e71892/2023_06_Multi-Brands.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default GameFilter