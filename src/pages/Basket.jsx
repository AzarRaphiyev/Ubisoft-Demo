import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Basket() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // 🆕 Discount state

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeItem = (item) => {
    const updatedCart = cartItems.filter(
      (game) => !(game.id === item.id && game.type === item.type)
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal - discount;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.info("🛒 Your cart is already empty.");
      return;
    }
  
    localStorage.removeItem("cart");        // Cart'ı silirik
    setCartItems([]);                       // State-i sıfırlayırıq
    setDiscount(0);                         // Əgər promo code tətbiq olunubsa, onu da sıfırla
    setPromoCode("");                       // Promo kodu təmizlə
  
    toast.success("✅ Purchase completed successfully!");
  };

  const handlePromoCode = () => {
    if (cartItems.length === 0) {
      toast.info("🛒 Your cart is empty. Please add items before applying a promo code.");
      return;
    }
  
    if (promoCode.toLowerCase() === "azer30" ) {
      const discountValue = subtotal * 0.3;
      setDiscount(discountValue);
      toast.success("🎉 Promo code applied: 30% discount");
    } else {
      setDiscount(0);
      toast.error("❌ Invalid promo code");
    }
  };
  

  return (
    <div className="bg-gray-800 text-white min-h-screen p-4 sm:py-10 md:p-10 lg:p-[100px]">
  <div className="mx-auto w-[70%]  grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
    
    {/* Cart Items Section */}
    <div className="lg:col-span-2">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mt-6 mt-12 sm:mb-6">
        Your shopping cart ({cartItems.length} items)
      </h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
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
            </Link>

            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm mb-2">{item.productEdition}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 mb-3">
                <span className="text-sm text-gray-400">Platform:</span>
                {item.platforms.slice(0, 5).map((platform, index) => (
                  <span key={index} className="text-blue-400 text-sm">
                    {platform}
                    {index < item.platforms.slice(0, 5).length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
              <button
                onClick={() => removeItem(item)}
                className="text-gray-400 hover:text-white text-sm flex items-center justify-center sm:justify-start"
              >
                🗑️ Remove
              </button>
            </div>

            <div className="flex-shrink-0 text-center sm:text-right">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
                <span className="text-orange-400 text-lg sm:text-xl font-bold">
                  € {item.price.toFixed(2)}
                </span>
                {item.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    € {item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Summary Section */}
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
            <span>Subtotal ({cartItems.length} items)</span>
            <span>€ {subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-xs sm:text-sm text-green-400">
              <span>Discount (30%)</span>
              <span>- € {discount.toFixed(2)}</span>
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
