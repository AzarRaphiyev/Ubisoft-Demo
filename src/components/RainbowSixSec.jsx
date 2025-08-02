import React from 'react'
import { Link } from 'react-router';

function RainbowSixSec({gamedata}) {
    const rainbowGames = gamedata.filter(item => item.brand === "Rainbow Six");

      
    console.log(rainbowGames);
    
  

  return (
    <div className='container2 m-auto my-[30px]'>
        <h1 className='text-[#f2f2f2] text-[24px] ubisoft-bold my-[15px] '>Select your Rainbow Six Siege X Edition </h1>
        <div className='flex gap-[20px] overflow-x-auto xl:overflow-hidden flex-nowrap  scrollbar-hide'>

            {
                rainbowGames.map(item=>
                    <div className='bg-[#242424]   rounded-xl overflow-hidden min-w-[300px]'>

                    <Link to={`detail/${item.type}/${item.id}`} className='overflow-hidden'>
                    <img src={item.sectionImg} className='w-[100%] hover:scale-105 duration-300' alt="" />
                    </Link>
                    <div className='p-[8px]  flex flex-col justify-between'>
                        <div>
                            <h1 className='text-white ubisoft-bold '>
                               {item.title}
                                </h1>
                            <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.productEdition}</h1>
                        </div>
                        <h1 className='text-white ubisoft-bold text-right mt-[30px] '>{item.price==0?"Free":"€"+item.price}</h1>
                    </div>
                 </div>
                )
            }
            
             
        </div>
    </div>
  )
}

export default RainbowSixSec