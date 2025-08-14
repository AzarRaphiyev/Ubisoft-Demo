import React from 'react'
import { Link } from 'react-router';

function PopularGames({gamedata}) {
    const top6Games = gamedata
  .sort((a, b) => b.viewCount - a.viewCount)
  .slice(0, 6);
  
    
  return (
    <div className='container2 m-auto my-[30px]'>
    <h1 className='text-[#f2f2f2] text-[24px] ubisoft-bold my-[15px]'>
      What's hot this week{" "}
      <sup className='bg-[#ffffff26] text-[12px] px-[4px] py-[2px] rounded '>
        {top6Games.length}
      </sup>
    </h1>
    <div className='flex gap-[20px] overflow-x-auto xl:overflow-hidden flex-nowrap scrollbar-hide'>
      {top6Games.map(item => {
        const discountedPrice = item.discount !== 0 
          ? (item.price - (item.price * (item.discount / 100))).toFixed(2) 
          : item.price;
  
        return (
          <div key={item.id} className='bg-[#242424] rounded-xl overflow-hidden min-w-[200px]'>
            <div className='overflow-hidden w-[100%] relative'>
              <Link to={`detail/${item.type}/${item.id}`}>
                <img src={item.cardImg} className='w-[250px] hover:scale-110 duration-300' alt="" />
              </Link>
  
              {item.discount !== 0 && (
                <span className='absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold'>
                  -{item.discount}%
                </span>
              )}
            </div>
  
            <div className='p-[8px] flex flex-col justify-between'>
              <div>
                <h1 className='text-white ubisoft-bold'>
                  {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                </h1>
                <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.productEdition}</h1>
              </div>
  
              <div className='flex items-center justify-end gap-2 mt-[10px]'>
                {item.discount !== 0 ? (
                  <>
                    <span className='text-gray-400 line-through text-sm'>
                      €{item.price.toFixed(2)}
                    </span>
                    <span className='text-white text-lg font-bold'>
                      €{discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className='text-white text-lg font-bold'>
                    {item.price === 0 ? "Free" : "€" + item.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  
  )
}

export default PopularGames