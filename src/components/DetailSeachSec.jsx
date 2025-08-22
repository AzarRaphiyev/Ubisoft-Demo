import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../context/DataContext';
import { Link } from 'react-router';
import { IoCloseCircle } from 'react-icons/io5';

function DetailSearchSec({ serach, setSearch }) {
  const [filteredData, setFilteredData] = useState([]);
  const { gamedata, dlcdata } = useContext(GameContext);

  useEffect(() => {
    const searchTerm = serach.toLowerCase().trim();

    if (searchTerm === '') {
      setFilteredData([]);
      return;
    }

    const filteredGames = gamedata?.filter(item =>
      item.title.toLowerCase().includes(searchTerm)
    ).map(item => ({ ...item, type: 'basedgame' }));

    const filteredDlcs = dlcdata?.filter(item =>
      item.title.toLowerCase().includes(searchTerm)
    ).map(item => ({ ...item, type: 'dlc' }));

    setFilteredData([...(filteredGames || []), ...(filteredDlcs || [])]);
  }, [serach, gamedata, dlcdata]);
  console.log(filteredData);
  

  return (
    <div className='bg-white/90 fixed z-90 xl:top-30 lg:top-30 top-45 w-full h-[100vh] pb-[100px] overflow-y-auto'>
  <div className='w-full container2 mx-auto py-[100px]'>
    <div>
    <h3 className='ubisoft-bold text-[25px] text-black mb-10'>Result ({filteredData.length})</h3>
    </div>

    {filteredData.length > 0 ? (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {filteredData.map((item, index) => (
          <div key={index} className='bg-[#242424] rounded-xl overflow-hidden min-w-[200px]'>
            <div className='overflow-hidden w-full'>
              <Link to={`/detail/${item.type}/${item.id}`} onClick={() => setSearch('')} >
                <img src={item.cardImg} className='w-full hover:scale-110 duration-300' alt="" />
              </Link>
            </div>
            <div className='p-[8px] flex flex-col justify-between'>
              <div>
                <h1 className='text-white ubisoft-bold'>
                  {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                </h1>
                <h1 className='text-[#b5b5b5] text-[14px] ubisoft-bold'>{item.productEdition}</h1>
              </div>
              <h1 className='text-white ubisoft-bold text-right mt-[30px]'>
                {item.price == 0 ? "Free" : "€" + item.price}
              </h1>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className='text-center text-black'>No results found.</div>
    )}
  </div>

  
  <IoCloseCircle 
    onClick={() => setSearch('')} 
    className='absolute right-2 xl:right-5 lg:right-5 top-5 text-black cursor-pointer' 
    size={40} 
  />
</div>

  );
}

export default DetailSearchSec;
