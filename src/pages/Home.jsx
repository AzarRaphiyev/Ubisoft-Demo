import React, { useContext } from 'react'
import Slider from '../components/Slider'
import GameInfoSec from '../components/GameInfoSec'

import { GameContext } from '../context/DataContext'
import Loader from '../components/Loader'
import PopularGames from '../components/PopularGames'
import RainbowSixSec from '../components/RainbowSixSec'


function Home() {
  const {gamedata, sliderdata, dlcdata, error, loader} = useContext(GameContext)
  
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
    <>
      {/* ✅ Data-ları prop olaraq ötür */}
      <Slider sliderData={sliderdata} />
      <GameInfoSec />
      <PopularGames gamedata={gamedata}/>
      <RainbowSixSec gamedata={gamedata}/>
    </>
  )
}

export default Home