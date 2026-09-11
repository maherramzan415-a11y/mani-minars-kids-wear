import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  Sparkles, 
  Printer, 
  Phone,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, OrderItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  currencySymbol: string;
  currencyRate: number;
  onOrderComplete: (order: Order) => void;
  onTrackOrder: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  total,
  currencySymbol,
  currencyRate,
  onOrderComplete,
  onTrackOrder,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email, setEmail] = useState('sarah.jenkins@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [postalCode, setPostalCode] = useState('97477');
  const [orderNotes, setOrderNotes] = useState('Leave with front porch security');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet'>('cod');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFillDemoCard = () => {
    setPaymentMethod('card');
    setCardNumber('4532 8921 7734 4242');
    setCardExpiry('08/29');
    setCardCvc('382');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const randomId = `MM-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderItems: OrderItem[] = cartItems.map((ci) => ({
        id: `${ci.product.id}-${ci.selectedSize}-${Date.now()}`,
        productId: ci.product.id,
        name: ci.product.name,
        price: ci.product.price,
        size: ci.selectedSize,
        color: ci.selectedColor,
        quantity: ci.quantity,
        image: ci.product.images[0]
      }));

      const newOrder: Order = {
        id: randomId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        customerName: fullName,
        customerPhone: phone,
        customerEmail: email,
        address: address,
        city: city,
        items: orderItems,
        subtotal: subtotal,
        discount: discount,
        shipping: 0,
        total: total,
        paymentMethod: paymentMethod,
        status: 'confirmed',
        trackingNumber: `TRK-MM-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: 'In 2-3 Business Days'
      };

      setCreatedOrder(newOrder);
      onOrderComplete(newOrder);
      setIsProcessing(false);
      setStep('success');

      // Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button if not success */}
        {step !== 'success' && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-blue-950 font-display">
                {step === 'success' ? 'Order Confirmed!' : 'Secure Checkout'}
              </h2>
              <p className="text-[11px] text-slate-500">
                Mani Minars Kids Wear • 256-Bit SSL Encrypted
              </p>
            </div>
          </div>

          {/* Stepper indicators */}
          {step !== 'success' && (
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`px-2.5 py-1 rounded-full ${step === 'shipping' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                1. Delivery
              </span>
              <span>→</span>
              <span className={`px-2.5 py-1 rounded-full ${step === 'payment' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                2. Payment
              </span>
            </div>
          )}
        </div>

        {/* STEP 1: Shipping Details */}
        {step === 'shipping' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Delivery & Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-900"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address for Order Updates</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-900"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Apartment #, Street name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Delivery Notes (Optional)</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Ring bell, leave with neighbor, afternoon delivery preferred"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:bg-white focus:ring-1 focus:ring-blue-900"
                />
              </div>
            </div>

            {/* Next button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setStep('payment')}
                disabled={!fullName || !phone || !address || !city}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Continue to Payment Method →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Payment Method */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Select Payment Option
              </h3>
              <button
                onClick={() => setStep('shipping')}
                className="text-xs text-blue-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Delivery
              </button>
            </div>

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-red-600 bg-red-50/60 ring-2 ring-red-600/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Truck className="w-5 h-5 text-red-600" />
                  {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                </div>
                <div className="mt-2 font-bold text-xs text-blue-950">Cash on Delivery (COD)</div>
                <p className="text-[10px] text-slate-500 mt-0.5">Pay safely in cash when the package arrives at your door.</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-blue-900 bg-blue-50/60 ring-2 ring-blue-900/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-5 h-5 text-blue-900" />
                  {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-blue-900" />}
                </div>
                <div className="mt-2 font-bold text-xs text-blue-950">Debit / Credit Card</div>
                <p className="text-[10px] text-slate-500 mt-0.5">Visa, MasterCard, Amex via secure 3D encrypted gateway.</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'wallet'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-emerald-700 font-bold text-xs">📱 Wallet</span>
                  {paymentMethod === 'wallet' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <div className="mt-2 font-bold text-xs text-blue-950">Mobile Wallet</div>
                <p className="text-[10px] text-slate-500 mt-0.5">JazzCash, EasyPaisa, or PayPal quick transfer.</p>
              </button>
            </div>

            {/* Card Inputs if Card chosen */}
            {paymentMethod === 'card' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Card Credentials</span>
                  <button
                    type="button"
                    onClick={handleFillDemoCard}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline"
                  >
                    ⚡ Autofill Test Card
                  </button>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-mono font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">CVV / Security Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Totals Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
                <span>{currencySymbol}{(subtotal * currencyRate).toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-600 font-semibold">
                  <span>Special Discount</span>
                  <span>-{currencySymbol}{(discount * currencyRate).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Delivery Charge</span>
                <span className="font-bold">FREE SHIPPING</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-blue-950 pt-2 border-t border-slate-200">
                <span>Total Amount Due</span>
                <span>{currencySymbol}{(total * currencyRate).toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Safe & Secure Checkout</span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Processing Order...' : `Confirm & Place Order (${currencySymbol}${(total * currencyRate).toFixed(2)})`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmation Success */}
        {step === 'success' && createdOrder && (
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black">
              ✓
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Order Received Successfully
              </span>
              <h2 className="text-2xl font-extrabold text-blue-950 font-display mt-2">
                Thank You, {createdOrder.customerName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your kids wear parcel is being prepared with care and love.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left max-w-lg mx-auto space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-mono font-extrabold text-blue-950 text-sm">{createdOrder.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tracking Number:</span>
                <span className="font-mono font-bold text-red-600">{createdOrder.trackingNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700">{createdOrder.estimatedDelivery}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-medium text-slate-800">{createdOrder.address}, {createdOrder.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold uppercase text-slate-800">{createdOrder.paymentMethod.toUpperCase()} (Total: {currencySymbol}{(createdOrder.total * currencyRate).toFixed(2)})</span>
              </div>

              {/* Items summary */}
              <div className="pt-2 border-t border-slate-200 space-y-1">
                <span className="font-bold text-slate-700">Items ({createdOrder.items.length}):</span>
                {createdOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600 text-[11px]">
                    <span>{it.quantity}x {it.name} ({it.size})</span>
                    <span>{currencySymbol}{(it.price * it.quantity * currencyRate).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onTrackOrder(createdOrder.id);
                }}
                className="px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Package className="w-4 h-4 text-blue-300" />
                <span>Track Package in Real-Time</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
