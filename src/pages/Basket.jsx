import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllGame, updateGame } from "../services/GameadminService";
import { updateUser } from "../services/UserService"; // User service import edildi

function Basket() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [storageType, setStorageType] = useState(null); // 'localStorage' or 'sessionStorage'

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

  // User dəyişdikdə cart məlumatını yüklə
  useEffect(() => {
    if (user && user.id && storageType) {
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      const storedCart = storage.getItem(`cart_${user.id}`);
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user, storageType]);

  // Hər bir item üçün discounted price hesabla
  const getDiscountedPrice = (item) => {
    if (item.discount && item.discount > 0) {
      const discountAmount = (item.price * item.discount) / 100;
      return item.price - discountAmount;
    }
    return item.price;
  };

  // Hər bir item üçün discount amount hesabla
  const getDiscountAmount = (item) => {
    if (item.discount && item.discount > 0) {
      return (item.price * item.discount) / 100;
    }
    return 0;
  };

  // Cart-dan element siləndə həm state-ə, həm storage-a yaz
  const removeItem = (item) => {
    if (!user || !storageType) return;

    const updatedCart = cartItems.filter(
      (game) => !(game.id === item.id && game.type === item.type)
    );

    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
    storage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    toast.error(
      <div className="flex items-center gap-3 min-w-[400px]">
        <img
          src={item.cardImg}
          alt={item.title}
          className="w-10 h-10 object-cover rounded"
        />
        <div>
          <p className="font-semibold text-black">{item.title}</p>
          <p className="text-sm text-[#333]">Removed from Basket</p>
        </div>
      </div>
    );
  };

  // Hesablamalar
  const originalTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + getDiscountedPrice(item), 0);
  const itemDiscountsTotal = cartItems.reduce((sum, item) => sum + getDiscountAmount(item), 0);
  const total = subtotal - promoDiscount;

  const handleCheckout = async () => {
    if (!user || !storageType) return;

    if (cartItems.length === 0) {
      toast.info("🛒 Your cart is already empty.");
      return;
    }

    try {
      const allGames = await getAllGame();

      // Game sale count-larını yenilə
      await Promise.all(
        cartItems.map(async (cartItem) => {
          const gameFromApi = allGames.find((g) => g.id === cartItem.id);
          if (gameFromApi) {
            const updatedGame = {
              ...gameFromApi,
              saleCount: (gameFromApi.saleCount || 0) + 1,
            };
            await updateGame(gameFromApi.id, updatedGame);
          }
        })
      );

      // User-in orderedList-ini yenilə
      const currentOrderedList = user.orderedList || [];
      
      // Yeni sifariş obyektləri yarat (duplicate-ləri yoxla)
      const newOrderedItems = cartItems.filter(cartItem => {
        // Əgər bu item artıq orderedList-də varsa, əlavə etmə
        return !currentOrderedList.some(orderedItem => 
          orderedItem.id === cartItem.id && orderedItem.type === cartItem.type
        );
      });

      // Yalnız yeni item-lar varsa user-i yenilə
      if (newOrderedItems.length > 0) {
        const updatedOrderedList = [...currentOrderedList, ...newOrderedItems];
        
        const updatedUser = {
          ...user,
          orderedList: updatedOrderedList
        };

        // API-də user-i yenilə
        const result = await updateUser(user.id, updatedUser);
        
        if (result) {
          // Local storage-də user məlumatını yenilə
          const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
          storage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      }

      // Cart-ı təmizlə
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      storage.removeItem(`cart_${user.id}`);

      setCartItems([]);
      setPromoDiscount(0);
      setPromoCode("");

      toast.success("✅ Purchase completed successfully!");
      
      if (newOrderedItems.length !== cartItems.length) {
        toast.info("ℹ️ Some items were already in your library and were not duplicated.");
      }
      
    } catch (err) {
      console.error("Checkout zamanı xəta:", err);
      toast.error("❌ Checkout failed!");
    }
  };

  const handlePromoCode = () => {
    if (cartItems.length === 0) {
      toast.info(
        "🛒 Your cart is empty. Please add items before applying a promo code."
      );
      return;
    }

    if (promoCode.toLowerCase() === "azer30") {
      const discountValue = subtotal * 0.3;
      setPromoDiscount(discountValue);
      toast.success("🎉 Promo code applied: 30% discount");
    } else {
      setPromoDiscount(0);
      toast.error("❌ Invalid promo code");
    }
  };

  // User giriş etməyibsə login səhifəsinə yönləndirmə
  if (!user) {
    return (
      <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.6 8M7 13v8a2 2 0 002 2h6M9 21v-2m6 2v-2" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Səbətə baxmaq üçün daxil olun
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Oyunlarınızı əldə etmək üçün hesabınıza daxil olun.
          </p>
          <Link 
            to="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Daxil ol
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen p-4 sm:py-10 md:p-10 lg:p-[100px]">
      <div className="mx-auto w-[70%] grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mt-6 mt-12 sm:mb-6">
            Your shopping cart ({cartItems.length} items)
          </h1>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-gray-700/50 rounded-lg p-3 sm:p-4 flex gap-5 flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0"
              >
                <Link
                  to={`/detail/${item.type}/${item.id}`}
                  className="flex-shrink-0 relative mx-auto sm:mx-0"
                >
                  <img
                    src={item.cardImg}
                    alt={item.title}
                    className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg"
                  />
                  {item.type === "DLC" && (
                    <span className="absolute top-2 right-2 bg-[#333] text-white font-bold text-xs px-2 py-1 rounded">
                      DLC
                    </span>
                  )}
                {item.discount > 0 && (
  <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-xs px-2 py-1 rounded">
    -{item.discount}%
  </span>
)}

                </Link>

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {item.productEdition}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 mb-3">
                    <span className="text-sm text-gray-400">Platform:</span>
                    {item.platforms.slice(0, 5).map((platform, index) => (
                      <span key={index} className="text-blue-400 text-sm">
                        {platform}
                        {index < item.platforms.slice(0, 5).length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>

                                {item.discount > 0 && (
                  <div className="text-green-400 text-sm mb-2">
                    🏷️ {item.discount}% discount applied
                  </div>
                )}


                  <button
                    onClick={() => removeItem(item)}
                    className="text-gray-400 hover:text-white text-sm flex items-center justify-center sm:justify-start"
                  >
                    🗑️ Remove
                  </button>
                </div>

                <div className="flex-shrink-0 text-center sm:text-right">
                  <div className="flex flex-col items-center sm:items-end">
                  {item.price > 0 && (
  <div className="flex flex-col items-center sm:items-end">
    {item.discount && item.discount > 0 ? (
      <>
        <span className="text-orange-400 text-lg sm:text-xl font-bold">
          € {getDiscountedPrice(item).toFixed(2)}
        </span>
        <span className="text-gray-400 line-through text-sm">
          € {item.price.toFixed(2)}
        </span>
        <span className="text-green-400 text-xs">
          Save € {getDiscountAmount(item).toFixed(2)}
        </span>
      </>
    ) : (
      <span className="text-orange-400 text-lg sm:text-xl font-bold">
        € {item.price.toFixed(2)}
      </span>
    )}
  </div>
)}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-700/50 rounded-lg p-4 sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Summary</h2>

            {/* Promo Code */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-600/30 rounded-lg hover:bg-gray-600/50 transition">
                <input
                  type="text"
                  placeholder="Add a promo code or creator code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 flex-grow outline-none text-sm sm:text-base"
                />
                <button
                  onClick={handlePromoCode}
                  className="text-white hover:text-blue-400 text-lg sm:text-xl ml-2"
                >
                  ✚
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Original Price ({cartItems.length} items)</span>
                <span>€ {originalTotal.toFixed(2)}</span>
              </div>

              {itemDiscountsTotal > 0 && (
                <div className="flex justify-between text-xs sm:text-sm text-green-400">
                  <span>Item Discounts</span>
                  <span>- € {itemDiscountsTotal.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-xs sm:text-sm">
                <span>Subtotal</span>
                <span>€ {subtotal.toFixed(2)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-xs sm:text-sm text-green-400">
                  <span>Promo Code Discount (30%)</span>
                  <span>- € {promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <hr className="border-gray-600 border-dashed" />

              <div className="flex justify-between text-base sm:text-lg font-bold">
                <span>
                  Total{" "}
                  <span className="text-xs sm:text-sm font-normal text-gray-400">
                    incl. taxes
                  </span>
                </span>
                <span>€ {total.toFixed(2)}</span>
              </div>

              {(itemDiscountsTotal > 0 || promoDiscount > 0) && (
                <div className="text-center text-green-400 text-sm font-medium">
                  🎉 Total Savings: € {(itemDiscountsTotal + promoDiscount).toFixed(2)}
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 rounded-3xl mb-3 sm:mb-4 transition transform hover:scale-105 text-sm sm:text-base"
            >
              CHECKOUT
            </button>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="block text-center underline text-white font-bold hover:scale-105 transition text-sm sm:text-base"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;