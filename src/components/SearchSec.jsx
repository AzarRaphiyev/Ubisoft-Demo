import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { GameContext } from '../context/DataContext';
import { Link, useNavigate } from 'react-router';

function SearchSec({ searchSec, setSearchSec }) {
  const ref = useRef(null);
  const [inputprop, setInputProp] = useState('');
  const { gamedata, dlcdata } = useContext(GameContext);

  const [filteredGame, setFilteredGame] = useState([]);
  const [filteredDlc, setFilteredDlc] = useState([]);

  // Modalı kənara klikləyib bağlamaq
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchSec(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchSec]);

  // Filter funksiyası input dəyişdikdə işə düşür
  useEffect(() => {
    const searchTerm = inputprop.toLowerCase();

    if (searchTerm.trim() === '') {
      setFilteredGame([]);
      setFilteredDlc([]);
      return;
    }

    const filteredGames = gamedata?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
    const filteredDlcs = dlcdata?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );

    setFilteredGame(filteredGames);
    setFilteredDlc(filteredDlcs);
  }, [inputprop, gamedata, dlcdata]);

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputprop.trim() !== '') {
      navigate(`/resulte?query=${encodeURIComponent(inputprop.trim())}`);
      setSearchSec(false);
    }
  };
  return (
    <>
      <div className='fixed inset-0 bg-black opacity-60 z-100'></div>

      <div
        ref={ref}
        className='h-[500px] bg-white w-[45%] fixed z-110 left-[50%] top-[5px] translate-x-[-50%] rounded-2xl overflow-hidden'
      >
       <div className='flex items-center bg-gray-300 px-[10px] gap-[10px]'>
  <IoSearch size={25} className='h-[40px] cursor-pointer text-black' />
  <input
    onChange={(e) => setInputProp(e.target.value)}
    onKeyDown={handleKeyDown}
    type='text'
    value={inputprop}
    autoFocus
    className='w-full placeholder-black bg-gray-300 h-[40px] text-black px-[10px] focus:outline-none'
    placeholder='Type your search'
  />
  {inputprop.length > 0 && (
    <IoIosClose
      onClick={() => setInputProp('')}
      size={23}
      className='cursor-pointer text-black'
    />
  )}
</div>

        <div className='overflow-y-auto h-[calc(100%-40px)] px-[10px] py-[5px]'>
          {inputprop && (
            <>
              <div>
                <h2 className='text-lg text-black font-bold mb-2'>Games</h2>
                {filteredGame.length > 0 ? (
                  filteredGame.map((game, index) => (

                    <div className='flex p-2 border-b hover:bg-gray-100 gap-10 text-black cursor-pointer itemce'>
                      <img src={game.cardImg} className='w-[30px]' alt="" />
                      <Link to={`detail/${game.type}/${game.id}`}
                        key={index}
                        className=''
                      >
                        {game.title}
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className='text-sm text-gray-500'>No games found.</p>
                )}
              </div>

              <div className='mt-4'>
                <h2 className='text-lg font-bold text-black mb-2'>DLCs</h2>
                {filteredDlc.length > 0 ? (
                  filteredDlc.map((dlc, index) => (
                    <div className='flex p-2 border-b hover:bg-gray-100 gap-10 text-black cursor-pointer items-center'>
                      <img src={dlc.cardImg} className='w-[30px]' alt="" />
                      <Link to={`/detail/${dlc.type}/${dlc.id}`}
                        key={index}
                        className=''
                      >
                        {dlc.title}
                      </Link>
                    </div>
                    
                  ))
                ) : (
                  <p className='text-sm text-gray-500'>No DLCs found.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchSec;
