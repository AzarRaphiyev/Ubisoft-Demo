import React from 'react'

function PopularGames({gamedata}) {
    const top6Games = gamedata
  .sort((a, b) => b.viewCount - a.viewCount)
  .slice(0, 6);
  
    
  return (
    <div className='container2 m-auto my-[30px]'>
        <h1 className='text-[#f2f2f2] text-[24px] ubisoft-bold my-[15px] '>What's hot this week <sup className='bg-[#ffffff26] text-[12px] px-[4px] py-[2px] rounded '>{top6Games.length }</sup></h1>
        <div className='flex gap-[20px] overflow-x-auto xl:overflow-hidden flex-nowrap  scrollbar-hide'>
    {
        top6Games.map(item =>
            <div className='bg-[#242424] rounded-xl overflow-hidden min-w-[200px]'>
                <div className='overflow-hidden w-[100%]'>
                    <img src={item.cardImg} className='w-[250px] hover:scale-110 duration-300' alt="" />
                </div>
                <div className='p-[8px] flex flex-col justify-between'>
                    <div>
                        <h1 className='text-white ubisoft-bold '>
                            {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                        </h1>
                        <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.productEdition}</h1>
                    </div>
                    <h1 className='text-white ubisoft-bold text-right mt-[30px] '>{item.price == 0 ? "Free" : "€" + item.price}</h1>
                </div>
            </div>
        )
    }
</div>

    </div>
  )
}

export default PopularGames