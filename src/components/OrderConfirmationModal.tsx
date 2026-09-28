import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationModal: React.FC = () => {
  const { confirmedOrder, setConfirmedOrder, setIsOrderTrackingOpen } = useStore();

  if (!confirmedOrder) return null;

  const handleTrack = () => {
    setIsOrderTrackingOpen(true);
    setConfirmedOrder(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
      <div className="bg-[#FDFBF7] rounded-lg max-w-2xl w-full border border-[#DDD5C7] shadow-2xl overflow-hidden my-6">
        {/* Celebration Header */}
        <div className="bg-[#1A1818] text-[#FDFBF7] p-8 text-center relative">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#E8C5C8] font-medium">
            Gratitude & Welcome
          </span>
          <h2 className="font-serif text-3xl font-normal mt-1">
            Order Confirmed #{confirmedOrder.id}
          </h2>
          <p className="text-xs text-[#EDE5DC]/80 mt-1 max-w-sm mx-auto">
            Your handcrafted weaves are reserved and entering artisan inspection at our studio.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-6 space-y-6">
          {/* Tracking Callout */}
          <div className="p-4 bg-[#F7F3EB] rounded border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-[#1A1818] font-semibold">
                <Truck className="w-4 h-4 text-[#8C1D40]" />
                <span>Estimated Arrival: {confirmedOrder.estimatedDelivery}</span>
              </div>
              <p className="text-[11px] text-[#7A736E] mt-0.5">
                Courier Partner: <strong className="text-[#383432]">Bluedart Express</strong> · AWB: {confirmedOrder.trackingNumber}
              </p>
            </div>

            <button
              onClick={handleTrack}
              className="px-3.5 py-1.5 bg-[#8C1D40] text-white rounded text-xs font-medium hover:bg-[#68142E] transition-colors self-start sm:self-auto"
            >
              Track Live Shipment
            </button>
          </div>

          {/* Ordered Items */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1818] mb-3">
              Garments in Shipment ({confirmedOrder.items.length})
            </h4>
            <div className="divide-y divide-[#EAE3D9] border-t border-b border-[#EAE3D9]">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-14 rounded object-cover border border-[#EAE3D9]"
                  />
                  <div className="flex-1 text-xs">
                    <h5 className="font-serif text-sm text-[#1A1818]">{item.productName}</h5>
                    <p className="text-[11px] text-[#7A736E]">
                      Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-[#1A1818]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F7F3EB] p-4 rounded border border-[#EAE3D9]">
            <div>
              <span className="font-semibold text-[#1A1818] block mb-1">Delivering To:</span>
              <p className="text-[#5C5551]">
                {confirmedOrder.shippingAddress.fullName}<br />
                {confirmedOrder.shippingAddress.streetAddress}<br />
                {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}<br />
                Phone: {confirmedOrder.shippingAddress.phone}
              </p>
            </div>

            <div>
              <span className="font-semibold text-[#1A1818] block mb-1">Payment Summary:</span>
              <div className="space-y-1 text-[#5C5551]">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-medium text-[#1A1818]">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="tabular-nums">₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount:</span>
                    <span className="tabular-nums">- ₹{confirmedOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{confirmedOrder.shippingFee === 0 ? 'FREE' : `₹${confirmedOrder.shippingFee}`}</span>
                </div>
                <div className="pt-1 border-t border-[#DDD5C7] flex justify-between font-bold text-[#1A1818]">
                  <span>Total Paid / Payable:</span>
                  <span className="tabular-nums">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="text-xs text-[#5C5551] hover:text-[#1A1818] flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>

            <button
              onClick={() => setConfirmedOrder(null)}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
