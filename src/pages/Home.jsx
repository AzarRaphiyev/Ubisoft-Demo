import React, { useContext } from 'react'
import Slider from '../components/Slider'
import GameInfoSec from '../components/GameInfoSec'

import { GameContext } from '../context/DataContext'
import Loader from '../components/Loader'
import PopularGames from '../components/PopularGames'
import RainbowSixSec from '../components/RainbowSixSec'
import FreeGames from '../components/FreeGames'
import UniverseSec from '../components/UniverseSec'


function Home() {
  const {gamedata, sliderdata, dlcdata,universedata, error, loader} = useContext(GameContext)
  
  // Loading göstər
  console.log(gamedata);
  console.log(sliderdata);
  console.log(dlcdata);
  
  
  if (loader) {
    return (
     <Loader/>
    )
  }
  
  // Error göstərbhgh
  if (error) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-red-500 text-xl">Xəta: {error}</div>
      </div>
    )
  }
  
  return (
    <div className='bg-gradient-to-b from-[#0E0D0E] via-[#150C15] to-[#0F131E] pb-[30px] pt-5'>
      {/* ✅ Data-ları prop olaraq ötür */}
      <Slider sliderdata={sliderdata} />
      <GameInfoSec />
      <PopularGames gamedata={gamedata}/>
      <RainbowSixSec gamedata={gamedata}/>
      <UniverseSec universedata={universedata}/>
      <FreeGames gamedata={gamedata}/>

      <div className='flex xl:flex-row lg:flex-row flex-col    rounded items-center justify-between px-[20px] py-[10px] container2 mx-auto mt-[20px] bg-gradient-to-r from-[#1D1230]/30 via-[#0a0119]/30 to-[#021B39]/30 '>
                <div>
                    <img className='xl:w-[600px] lg:w-[500px] md:w-[400px] w-[300px]' src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6SfvkXTESPJr6U4faPWqfA/e7dc017f2f6a652d708180474ca48881/UCW_promo_asset_1080_mobile_decom_announcement.png" alt="" />
                </div>

                <div className='flex flex-col items-start xl:w-[30%] lg:w-[30%] w-[100%] '>
                    <h3 className='open-sans-bold text-[30px]'>Ubisoft Connect</h3>
                    <p className='open-sans-text text-[#B5B5B5]'>All your games, friends, and benefits in one place.</p>
                    <button className='py-3 px-10  text-[18px] w-[100%] xl:w-[70%] lg:w-[70%] bg-[#006EF5] mt-3 rounded-4xl font-bold'>Get Ubisoft Connect</button>
                </div>
            </div>
    </div>
  )
}

export default Home