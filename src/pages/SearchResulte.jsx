import React, { useState, useContext, useEffect } from 'react';
import { Search, Gamepad2, Package, List } from 'lucide-react';
import Loader from '../components/Loader';
import { GameContext } from '../context/DataContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [user, setUser] = useState(null);
  const [storageType, setStorageType] = useState(null); // 'localStorage' or 'sessionStorage'

  const { gamedata, dlcdata } = useContext(GameContext);
  const [searchParams] = useSearchParams();

  // User məlumatını localStorage və sessionStorage-dən yüklə
  useEffect(() => {
    let storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setStorageType('localStorage');
      } catch (e) {
        console.error('User məlumatı parse olunarkən xəta:', e);
      }
    } else {
      storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setStorageType('sessionStorage');
        } catch (e) {
          console.error('User məlumatı parse olunarkən xəta:', e);
        }
      }
    }
  }, []);

  // User dəyişdikdə wishlist məlumatını yüklə
  useEffect(() => {
    if (user && user.id && storageType) {
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      const storedWishlist = storage.getItem(`wishlist_${user.id}`);
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    } else {
      setWishlist([]);
    }
  }, [user, storageType]);

  // URL parametri oxu və searchQuery-ə yaz
  useEffect(() => {
    const query = searchParams.get('query') || '';
    setSearchQuery(query);
  }, [searchParams]);

  // fullData birləşdirilməsi
  useEffect(() => {
    setFullData([...gamedata, ...dlcdata]);
  }, [gamedata, dlcdata]);

  // filterData-nın yenilənməsi (tab + search)
  useEffect(() => {
    let filtered = fullData;

    if (activeTab === 'games') {
      filtered = gamedata;
    } else if (activeTab === 'dlc') {
      filtered = dlcdata;
    }

    const query = searchQuery.trim().toLowerCase();

    if (query !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query)
      );
    }

    setFilterData(filtered);
  }, [searchQuery, activeTab, fullData, gamedata, dlcdata]);

  if (!gamedata?.length || !dlcdata?.length) {
    return <Loader />;
  }

  const toggleWishlistItem = (item) => {
    // User giriş etməyibsə wishlist funksiyası işləməsin
    if (!user || !storageType) {
      toast.error('Wishlist-ə əlavə etmək üçün daxil olun!');
      return;
    }

    const exists = wishlist.some(i => i.id === item.id);

    let updatedWishlist;
    if (exists) {
      updatedWishlist = wishlist.filter(i => i.id !== item.id);
      toast.error(
        <div className="flex items-center gap-3 min-w-[300px] sm:min-w-[400px]">
          <img src={item.cardImg} alt={item.title} className="w-10 h-10 object-cover rounded" />
          <div>
            <p className="font-semibold text-black">{item.title}</p>
            <p className="text-[#333] text-sm">Removed from wishlist</p>
          </div>
        </div>
      );
    } else {
      updatedWishlist = [...wishlist, item];
      toast.success(
        <div className="flex items-center gap-3 min-w-[300px] sm:min-w-[400px]">
          <img src={item.cardImg} alt={item.title} className="w-10 h-10 object-cover rounded" />
          <div>
            <p className="font-semibold text-black">{item.title}</p>
            <p className="text-[#333] text-sm">Added to wishlist</p>
          </div>
        </div>
      );
    }

    setWishlist(updatedWishlist);
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
    storage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
  };

  const totalResults = filterData.length;

  const tabs = [
    { id: 'all', label: 'All', icon: <List />, count: gamedata.length + dlcdata.length },
    { id: 'games', label: 'Games', icon: <Gamepad2 />, count: gamedata.length },
    { id: 'dlc', label: 'DLC', icon: <Package />, count: dlcdata.length },
  ];

  return (
    <div className="bg-white min-h-screen py-[60px]">
      <Toaster position="top-right" />

      {/* Search Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Type your search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-2 text-black rounded-full border border-gray-300 focus:border-pink-400 focus:outline-none text-lg bg-white"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-[95%] sm:max-w-[93%] md:max-w-[89%] lg:max-w-[87%] xl:max-w-[85%] mx-auto py-8">
        {/* Results Count */}
        <h1 className="text-4xl font-light open-sans-bold mb-8 text-black">
          <span className="text-pink-500 open-sans-bold">{totalResults.toLocaleString()}</span> Results
        {
         searchQuery.length!=0?   
        <span className='text-3xl'> "{searchQuery}"</span>:""
        }
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="text-pink-500">{tab.icon}</span>
                <span className="text-pink-500 font-semibold">{tab.count.toLocaleString()}</span>
                <span className={activeTab === tab.id ? 'text-black cursor-pointer' : 'text-gray-600 cursor-pointer'}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Games Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center text-xl font-medium text-gray-700">
              {tabs.find((t) => t.id === activeTab)?.icon}
              <span className="ml-2 text-pink-500 font-semibold">{filterData.length}</span>
              <span className="ml-2 text-black font-semibold cursor-pointer">{tabs.find((t) => t.id === activeTab)?.label}</span>
            </h2>
            <Link to={`/store?type=${tabs.find((t) => t.id === activeTab)?.label}`} className="text-pink-500 hover:text-pink-600 font-medium">
              See all {tabs.find((t) => t.id === activeTab)?.label}
            </Link>
          </div>

          {/* Games Grid */}
          {filterData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {filterData.map((item) => (
                <div key={item.id} className="bg-[#242424] overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  <div className="overflow-hidden w-full h-full">
                    <div className="bg-[#fff] overflow-hidden h-full flex flex-col justify-between">
                      <div className="overflow-hidden w-full relative group">
                        <Link to={`/detail/${item.type}/${item.id}`}>
                          <img src={item.cardImg} className="w-full hover:scale-110 duration-300" alt={item.title} />
                        </Link>

                        {/* Desktop wishlist button */}
                        <Link
                          to={`/detail/${item.type}/${item.id}`}
                          className="absolute opacity-0 group-hover:opacity-100 hidden xl:flex lg:flex duration-100 top-0 left-0 bg-black/70 w-full h-full z-30 items-center justify-center text-white"
                        >
                          <div
                            className="absolute top-5 right-5 z-40"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlistItem(item);
                            }}
                          >
                            {wishlist.some((i) => i.id === item.id) ? (
                              <FaHeart className="text-white cursor-pointer hover:scale-110 duration-300" size={20} />
                            ) : (
                              <FaRegHeart className="text-white cursor-pointer hover:scale-110 duration-300" size={20} />
                            )}
                          </div>
                        </Link>

                        {/* Mobile wishlist button */}
                        <div
                          className="absolute xl:hidden lg:hidden flex top-5 right-5 z-10"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlistItem(item);
                          }}
                        >
                          {wishlist.some((i) => i.id === item.id) ? (
                            <FaHeart className="text-white cursor-pointer" size={25} />
                          ) : (
                            <FaRegHeart className="text-white cursor-pointer" size={25} />
                          )}
                        </div>
                      </div>

                      {/* Card content */}
                      <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                        <div className="flex flex-col text-left">
                          <div className="flex gap-2 items-start mb-2">
                            {item.type.toLowerCase() === 'dlc' && (
                              <div className="py-1 px-2 bg-black rounded-lg text-xs text-white ubisoft-bold whitespace-nowrap h-fit">DLC</div>
                            )}
                            <h1 className="text-black ubisoft-bold text-sm sm:text-base leading-tight">
                              {item.title.length > 25 ? item.title.slice(0, 25) + '...' : item.title}
                            </h1>
                          </div>

                          {item.type.toLowerCase() === 'dlc' ? (
                            <h1 className="text-[#b5b5b5] text-xs sm:text-sm ubisoft-bold">{item.typeDlc}</h1>
                          ) : (
                            <h1 className="text-[#b5b5b5] text-xs sm:text-sm ubisoft-bold">{item.productEdition}</h1>
                          )}
                        </div>

                        <div className="flex items-center justify-end mt-4">
                          <h1 className="text-black ubisoft-bold text-base sm:text-lg">{item.price === 0 ? 'Free' : '€' + item.price}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;