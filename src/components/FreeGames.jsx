import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router';

function FreeGames({gamedata}) {
    const top6FreeGames = gamedata.filter(item => item.isFree === true);
    console.log(top6FreeGames);
    

  return (
    <div className='container2 m-auto mt-[30px] pb-[30px] '>
        <h1 className='text-[#f2f2f2] text-[24px] ubisoft-bold my-[15px] '>Free Games</h1>
        <div className='flex gap-[20px] overflow-x-auto xl:overflow-hidden flex-nowrap  scrollbar-hide'>
    {
        top6FreeGames.slice(0,3).map(item =>
            <div className='bg-[#242424] rounded-xl overflow-hidden min-w-[250px]'>
                <div className='overflow-hidden w-[100%]'>
                    <Link to={`detail/${item.type}/${item.id}`}>
                    <img src={item.sectionImg} className='w-[100%] hover:scale-110 duration-300' alt="" />
                    </Link>
                </div>
                <div className='p-[8px] flex flex-col justify-between'>
                    <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.brand}</h1>
                    <div>
                        <h1 className='text-white ubisoft-bold '>
                            {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                        </h1>
                    </div>

                    <Link to={`detail/${item.type}/${item.id}`} className='py-2 flex items-center justify-center px-4 text-[14px] text-center w-[100%] xl:w-[30%] lg:w-[30%] bg-[#006EF5] mt-3 rounded-4xl font-bold'>Play  <p className='mx-2'><FaExternalLinkAlt size={12}/></p> </Link>

                </div>
            </div>
        )
    }
</div>

    </div>
  )
}

export default FreeGames