import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  MessageCircle, 
  Sparkles,
  Check
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  currencySymbol: string;
  currencyRate: number;
  onProceedToCheckout: () => void;
  discountRate: number;
  onApplyPromoCode: (code: string) => boolean;
  appliedPromo: string | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currencySymbol,
  currencyRate,
  onProceedToCheckout,
  discountRate,
  onApplyPromoCode,
  appliedPromo,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromoCode(promoInput.trim().toUpperCase());
    if (success) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try "MANI15" for 15% off.');
      setPromoSuccess(false);
    }
  };

  const handleWhatsAppOrderCart = () => {
    if (cartItems.length === 0) return;
    let message = `*Hi Mani Minars Kids Wear!* 🛍️%0A%0AI'd like to place an order for the following items:%0A`;
    cartItems.forEach((item, idx) => {
      message += `%0A${idx + 1}. *${encodeURIComponent(item.product.name)}*%0A   • Size: ${encodeURIComponent(item.selectedSize)}%0A   • Color: ${encodeURIComponent(item.selectedColor)}%0A   • Qty: ${item.quantity} x $${item.product.price}%0A`;
    });
    message += `%0A*Subtotal:* $${subtotal.toFixed(2)}`;
    if (discount > 0) {
      message += `%0A*Discount:* -$${discount.toFixed(2)} (${appliedPromo})`;
    }
    message += `%0A*Total:* $${total.toFixed(2)}`;
    message += `%0A*Shipping:* FREE Shipping%0A%0APlease confirm stock availability and payment details. Thank you!`;

    window.open(`https://wa.me/923046466815?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-900" />
            <h2 className="text-base font-extrabold text-blue-950 font-display">
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-emerald-50 px-5 py-2.5 border-b border-emerald-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>✓ FREE Express Shipping applied to your order!</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                🛍️
              </div>
              <p className="text-sm font-bold text-slate-700">Your shopping bag is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our denim cargo shorts, casual cotton shirts, and trendy outfits in sizes 1 to 12 Years!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => {
              const itemPrice = (item.product.price * currencyRate).toFixed(2);
              return (
                <div 
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors bg-white shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover rounded-xl bg-slate-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-blue-950 line-clamp-1 font-display">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">
                          {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <span className="text-xs font-extrabold text-blue-950">
                        {currencySymbol}{itemPrice}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 rounded-l"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-slate-800 text-[11px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 rounded-r"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
            
            {/* Promo coupon input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Coupon code (e.g. MANI15)"
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 pl-8 pr-3 text-xs uppercase font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-900"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {promoSuccess && appliedPromo && (
                <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Coupon {appliedPromo} applied ({discountRate * 100}% OFF)!</span>
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-red-600 font-semibold">
                  {promoError}
                </div>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {currencySymbol}{(subtotal * currencyRate).toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-red-600 font-semibold">
                  <span>Discount ({appliedPromo})</span>
                  <span>-{currencySymbol}{(discount * currencyRate).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Shipping</span>
                <span className="uppercase font-bold text-[11px]">Free</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-blue-950 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span>{currencySymbol}{(total * currencyRate).toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons: Checkout & WhatsApp */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm active:scale-95 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppOrderCart}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Order Bag via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
