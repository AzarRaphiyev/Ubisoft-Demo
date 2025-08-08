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
  
    if (promoCode.toLowerCase() === "azer30") {
      const discountValue = subtotal * 0.3;
      setDiscount(discountValue);
      toast.success("🎉 Promo code applied: 30% discount");
    } else {
      setDiscount(0);
      toast.error("❌ Invalid promo code");
    }
  };
  

  return (
    <div className="bg-gray-800 text-white min-h-screen p-[100px]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">
            Your shopping cart ({cartItems.length} items)
          </h1>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gray-700/50 rounded-lg p-4 flex items-center space-x-4">
                
                <Link to={`/detail/${item.type}/${item.id}`} className="flex-shrink-0 relative">
                  <img 
                    src={item.cardImg} 
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                  {item.type === "DLC" && (
                    <span className="absolute top-2 right-2 bg-[#333] text-white font-bold text-xs px-2 py-1 rounded">
                      DLC
                    </span>
                  )}
                </Link>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">{item.productEdition}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-400">Platform:</span>
                    {item.platforms.slice(0, 5).map((platform, index) => (
                      <span key={index} className="text-blue-400 text-sm">
                        {platform}{index < item.platforms.slice(0,5).length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => removeItem(item)}
                    className="text-gray-400 hover:text-white text-sm flex items-center"
                  >
                    🗑️ Remove
                  </button>
                </div>

                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400 text-xl font-bold">
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
          <div className="bg-gray-700/50 rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-6">Summary</h2>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-600/30 rounded-lg hover:bg-gray-600/50 transition">
                <input
                  type="text"
                  placeholder="Add a promo code or creator code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 flex-grow outline-none"
                />
                <button 
                  onClick={handlePromoCode}
                  className="text-white hover:text-blue-400"
                >
                  ✚
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>€ {subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>Discount (30%)</span>
                  <span>- € {discount.toFixed(2)}</span>
                </div>
              )}

              <hr className="border-gray-600 border-dashed" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total <span className="text-sm font-normal text-gray-400">incl. taxes</span></span>
                <span>€ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 rounded-4xl mb-4 transition transform hover:scale-105"
            >
              CHECKOUT
            </button>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="block text-center underline text-white font-bold hover:scale-105 transition"
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
