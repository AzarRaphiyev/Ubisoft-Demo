import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaOpencart, FaTrashAlt } from 'react-icons/fa';
import { TbBell, TbBellOff } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import DetailHeader from '../components/DetailHeader';

function Whislist() {
  const [wishlist, setWishlist] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleToggle = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const toggleWishlistItem = (item) => {
    const exists = wishlist.some(i => i.id === item.id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter(i => i.id !== item.id);
      toast.error('Oyun wishlist-dən silindi!');
    } else {
      updatedWishlist = [...wishlist, item];
      toast.success('Oyun wishlist-ə əlavə olundu!');
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (item) => {
    const exists = cartItems.some(
      (game) => game.id === item.id && game.type === item.type
    );

    if (exists) {
      toast.error( 
        <div className="flex items-center gap-3 min-w-[400px] ">
          <img
            src={item.cardImg}
            alt={item.title}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <p className=" font-semibold text-black">{item.title}</p>
            <p className="text-[#333] text-sm">Removed from wishlist</p>
          </div>
        </div>
      )
      return;
    }

    const updatedCart = [...cartItems, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.success( 
      <div className="flex items-center gap-3 min-w-[400px] ">
        <img src={item.cardImg} alt="game" className="w-10 h-10 rounded object-cover" />
        <div>
          <p className="font-semibold text-black">{item.title}</p>
          <p className="text-sm text-[#333]">Added to wishlist</p>
        </div>
      </div>
    )
  };

  const isInCart = (item) => {
    return cartItems.some(
      (game) => game.id === item.id && game.type === item.type
    );
  };

  return (
    <div className='h-fit min-h-[100vh] bg-[#E5E8F0] py-[70px]'>
      <DetailHeader/>
      <Toaster position="top-right" />
      <div className='container2 mx-auto'>
        <div className='w-fit pt-[40px]'>
          <h3 className='text-[30px] ubisoft-text text-black'>
            Your Wishlist <span className='text-[#1EADD5]'>({wishlist.length})</span>
          </h3>
          <hr className='border-3 text-[#008AA4] w-[20%]' />
        </div>
      </div>

      <div className='w-full my-[30px] py-3 flex bg-white'>
        <div className="flex flex-row container2 mx-auto gap-10 items-center">
          <div className='flex gap-10 items-center'>
            {isSelected ? <TbBell className='text-[#1795AC]' size={25} /> : <TbBellOff className='text-[#929DB6]' size={25} />}
            <h3 className='text-black'>Notification for all items in your wishlist</h3>
          </div>
          <div
            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
              isSelected ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={handleToggle}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                isSelected ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container2 mx-auto">
        {wishlist.length === 0 ? (
          <div className=" flex flex-col xl:flex-row lg:flex-row justify-around items-center gap-10  py-10">
            <div className='flex flex-col gap-5 w-[50%]'>
              <h3 className='ubisoft-bold text-black text-[35px]'>Your wishlist is empty</h3>
              <p className='text-black ubisoft-text text-[16px]'>Save items to your wishlist to buy later and to get news and price drop notifications.</p>
            </div>
            <img className='max-w-[50%]' src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwb7863869/wishlist/empty-wishlist-banner.png" alt="" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className='bg-[#242424] overflow-hidden hover:transform hover:scale-105 transition-all duration-300'
              >
                <div className='overflow-hidden w-full h-full'>
                  <div className='bg-[#fff] overflow-hidden h-full flex flex-col justify-between'>
                    <div className='overflow-hidden w-full relative group'>
                      <Link to={`/detail/${item.type}/${item.id}`}>
                        <img
                          src={item.cardImg}
                          className='w-full hover:scale-110 duration-300'
                          alt=""
                        />
                      </Link>

                      <div
                        className='absolute opacity-0 group-hover:opacity-100 hidden xl:flex lg:flex duration-100 top-0 left-0 bg-black/70 w-full h-full z-30 items-center justify-center text-white'
                      >
                        <div
                          className='absolute top-5 right-5 z-40'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlistItem(item);
                          }}
                        >
                          <FaTrashAlt className="text-white hover:scale-110 duration-300 cursor-pointer" size={20} />
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          className={`absolute top-[50%] right-[50%] translate-x-[50%] border-2 rounded-xl  py-1 ubisoft-bold capitalize transition-all duration-300 ${
                            isInCart(item)
                              ? 'bg-white/90 border-green-600 text-green-600 cursor-not-allowed px-1 w-[150px] '
                              : 'hover:bg-white/90 hover:border-black hover:text-black text-white px-5 border-white'
                          }`}
                          disabled={isInCart(item)}
                        >
                          {isInCart(item) ?  <p className='flex gap-2 items-center justify-center'><FaCartPlus />   Added To Cart</p> : <p>Add to cart</p>}
                        </button>
                      </div>

                      {/* Mobile (trash always visible) */}
                      <div
                        className='absolute xl:hidden lg:hidden flex top-5 right-5 z-10'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlistItem(item);
                        }}
                      >
                        <FaTrashAlt className="text-white cursor-pointer" size={25} />
                      </div>
                    </div>

                    <div className='p-3 sm:p-4 flex flex-col justify-between flex-grow'>
                      <div className='flex flex-col text-left'>
                        <div className='flex gap-2 items-start mb-2'>
                          {item.type === "DLC" && (
                            <div className='py-1 px-2 bg-black rounded-lg text-xs text-white ubisoft-bold whitespace-nowrap h-fit'>
                              DLC
                            </div>
                          )}
                          <h1 className='text-black ubisoft-bold text-sm sm:text-base leading-tight'>
                            {item.title.length > 25 ? item.title.slice(0, 25) + '...' : item.title}
                          </h1>
                        </div>

                        {(item.type === "DLC") ? (
                          <h1 className='text-[#b5b5b5] text-xs sm:text-sm ubisoft-bold'>
                            {item.typeDlc}
                          </h1>
                        ) : (
                          <h1 className='text-[#b5b5b5] text-xs sm:text-sm ubisoft-bold'>
                            {item.productEdition}
                          </h1>
                        )}
                      </div>

                      <div className='flex items-center justify-end mt-4'>
                        <h1 className='text-black ubisoft-bold text-base sm:text-lg'>
                          {item.price === 0 ? "Free" : "€" + item.price}
                        </h1>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Whislist;
