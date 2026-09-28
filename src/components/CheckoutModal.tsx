import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Banknote, QrCode, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { ShippingAddress } from '../types';
import { useStore } from '../context/StoreContext';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi NCR'
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    processOrder,
    user
  } = useStore();

  const [step, setStep] = useState<1 | 2>(1);

  // Address form
  const [address, setAddress] = useState<ShippingAddress>(() => {
    if (user && user.addresses.length > 0) {
      return user.addresses[0];
    }
    return {
      fullName: 'Pooja Pottipati',
      phone: '+91 98888 77665',
      email: 'pottipooja000@gmail.com',
      streetAddress: '12th Cross, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038'
    };
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash on Delivery'>('UPI');
  const [upiId, setUpiId] = useState('pottipooja@oksbi');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.streetAddress || !address.pincode) {
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate gateway handoff
    setTimeout(() => {
      setIsProcessing(false);
      processOrder(address, paymentMethod);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
      <div className="bg-[#FDFBF7] rounded-lg max-w-2xl w-full border border-[#DDD5C7] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FDFBF7]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#8C1D40] font-semibold">
              Secure Checkout · Step {step} of 2
            </span>
            <h2 className="font-serif text-2xl text-[#1A1818] mt-0.5">
              {step === 1 ? 'Shipping Destination' : 'Select Payment Method'}
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#5C5551] hover:text-[#1A1818] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step 1: Shipping Address */}
        {step === 1 && (
          <form onSubmit={handleAddressSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">Mobile Number (For Courier Updates) *</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4543] mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                className="w-full p-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4543] mb-1">Street Address, Apartment, Flat No. *</label>
              <textarea
                required
                rows={2}
                value={address.streetAddress}
                onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                placeholder="House / Flat No., Road / Street, Landmark"
                className="w-full p-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">City / District *</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">State *</label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  placeholder="560038"
                  className="w-full p-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                />
              </div>
            </div>

            {/* Price Preview */}
            <div className="p-3 bg-[#F7F3EB] rounded border border-[#EAE3D9] flex items-center justify-between text-xs">
              <span className="text-[#5C5551]">Cart Total ({cart.reduce((s, i) => s + i.quantity, 0)} items):</span>
              <span className="font-semibold text-sm tabular-nums text-[#1A1818]">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 py-2.5 text-xs text-[#5C5551] hover:text-[#1A1818]"
              >
                Return to Bag
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors flex items-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            {/* Delivery Address Summary */}
            <div className="p-3 bg-[#F7F3EB] rounded border border-[#EAE3D9] flex justify-between items-center text-xs">
              <div>
                <span className="font-semibold text-[#1A1818]">Delivering to: </span>
                <span className="text-[#5C5551]">{address.fullName}, {address.city}, {address.state} ({address.pincode})</span>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-[#8C1D40] hover:underline font-medium text-xs ml-2 shrink-0"
              >
                Change
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1818]">
                Select Payment Mode:
              </label>

              {/* UPI Option */}
              <div
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-[#8C1D40] bg-white ring-1 ring-[#8C1D40]'
                    : 'border-[#DDD5C7] bg-[#F7F3EB] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#8C1D40]" />
                    <div>
                      <h4 className="font-semibold text-xs text-[#1A1818]">Instant UPI / QR</h4>
                      <p className="text-[11px] text-[#7A736E]">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800">Fastest</span>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="mt-3 pt-3 border-t border-[#F0EAE1] space-y-2">
                    <label className="block text-[11px] text-[#5C5551]">Enter UPI ID / VPA</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okhdfcbank"
                      className="w-full p-2 text-xs bg-[#FDFBF7] border border-[#DDD5C7] rounded"
                    />
                    <p className="text-[10px] text-[#8C827A]">
                      You will receive a payment request notification on your linked UPI app.
                    </p>
                  </div>
                )}
              </div>

              {/* Credit/Debit Cards */}
              <div
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-[#8C1D40] bg-white ring-1 ring-[#8C1D40]'
                    : 'border-[#DDD5C7] bg-[#F7F3EB] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#8C1D40]" />
                    <div>
                      <h4 className="font-semibold text-xs text-[#1A1818]">Credit or Debit Card</h4>
                      <p className="text-[11px] text-[#7A736E]">RuPay, Visa, MasterCard, Maestro</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                </div>

                {paymentMethod === 'Card' && (
                  <div className="mt-3 pt-3 border-t border-[#F0EAE1] space-y-3">
                    <div>
                      <label className="block text-[11px] text-[#5C5551] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full p-2 text-xs bg-[#FDFBF7] border border-[#DDD5C7] rounded"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#5C5551] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full p-2 text-xs bg-[#FDFBF7] border border-[#DDD5C7] rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#5C5551] mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full p-2 text-xs bg-[#FDFBF7] border border-[#DDD5C7] rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-[#8C1D40] bg-white ring-1 ring-[#8C1D40]'
                    : 'border-[#DDD5C7] bg-[#F7F3EB] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-[#8C1D40]" />
                    <div>
                      <h4 className="font-semibold text-xs text-[#1A1818]">Cash on Delivery (COD)</h4>
                      <p className="text-[11px] text-[#7A736E]">Pay cash or scan QR at doorstep upon courier arrival</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#5C5551]">Available</span>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 bg-[#F2EDE4] rounded border border-[#DDD5C7] space-y-1.5 text-xs text-[#4A4543]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Privilege Coupon Savings:</span>
                  <span className="tabular-nums">- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Express Handling:</span>
                <span className="tabular-nums">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-[#DDD5C7] flex justify-between font-bold text-sm text-[#1A1818]">
                <span>Payable Amount:</span>
                <span className="font-serif text-base tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[#5C5551] hover:text-[#1A1818] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping</span>
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-7 py-3 bg-[#8C1D40] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#68142E] transition-colors shadow-md disabled:opacity-70 flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order · ₹{cartTotal.toLocaleString('en-IN')}</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
