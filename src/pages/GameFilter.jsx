import React, { useContext, useEffect, useState } from 'react'
import { getAllGames } from '../services/GameService'
import { GameContext } from '../context/DataContext';
import { Loader } from 'lucide-react';
import { Link } from 'react-router';
import { FaWindows, FaPlaystation, FaXbox, FaApple } from 'react-icons/fa';

function GameFilter() {
    const [games, setGames] = useState()
    const [filteredGames, setFilteredGames] = useState()
    const [platformInput, setPlatformInput] = useState("all")
    const [sortInput, setSortInput] = useState("new")
    const { gamedata } = useContext(GameContext);

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
        <div className='py-[60px]'>
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
                        <div key={item.id || index} className='rounded-xl overflow-hidden min-w-[200px]'>
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
        </div>
    )
}

export default GameFilter