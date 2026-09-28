import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setSelectedCategory
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1499;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#EAE3D9]">
          {/* Header */}
          <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FDFBF7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C1D40]" />
              <h2 className="font-serif text-xl text-[#1A1818]">Shopping Bag</h2>
              <span className="text-xs text-[#7A736E] font-medium">
                ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#5C5551] hover:text-[#1A1818] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#F7F3EB] border-b border-[#EAE3D9] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#5C5551]">
                Add <strong className="text-[#8C1D40] font-semibold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more to unlock <strong className="text-[#1A1818]">Complimentary Express Shipping</strong>!
              </p>
            ) : (
              <p className="text-emerald-800 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Complimentary Express Shipping Unlocked!</span>
              </p>
            )}

            <div className="mt-2 w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#8C1D40] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EAE3D9]">
            {cart.length > 0 ? (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded overflow-hidden bg-[#F7F3EB] border border-[#EAE3D9] shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm font-normal text-[#1A1818] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-[#9E958E] hover:text-[#8C1D40] p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7A736E] mt-1 space-x-2">
                        <span>Size: <strong className="text-[#383432]">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-[#383432]">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F0EAE1]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD5C7] rounded bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-[#5C5551] hover:bg-[#F2EDE4]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-[#1A1818]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-[#5C5551] hover:bg-[#F2EDE4]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold tabular-nums text-[#1A1818]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <ShoppingBag className="w-12 h-12 text-[#C5A059] mb-3 stroke-[1.5]" />
                <h3 className="font-serif text-lg text-[#1A1818]">Your shopping bag is empty</h3>
                <p className="text-xs text-[#7A736E] mt-1 max-w-xs">
                  Discover our pure Banarasi silks and Chikankari silhouettes to begin your journey.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedCategory('All');
                  }}
                  className="mt-5 px-6 py-2.5 bg-[#1A1818] text-white text-xs font-medium rounded hover:bg-[#8C1D40] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Module */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EAE3D9] bg-[#F7F3EB] space-y-4">
              {/* Coupon Engine */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#8C827A] absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code (e.g. POOJA15)"
                        className="w-full pl-8 pr-2 py-1.5 text-xs uppercase bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#1A1818] text-white text-xs font-medium rounded hover:bg-[#8C1D40] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-700">{couponError}</p>}
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-900">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-700 hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C5551]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#1A1818]">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount Privilege</span>
                    <span className="tabular-nums">- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-800">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EAE3D9] flex justify-between text-sm font-semibold text-[#1A1818]">
                  <span>Total Amount</span>
                  <span className="font-serif text-base tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
