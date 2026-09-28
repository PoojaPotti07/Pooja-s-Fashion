import React, { useState } from 'react';
import { X, Search, CheckCircle, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, trackOrderById, orders } = useStore();
  const [searchInput, setSearchInput] = useState('PF-89241');
  const [foundOrder, setFoundOrder] = useState<Order | null>(orders[0] || null);
  const [searched, setSearched] = useState(true);

  if (!isOrderTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const res = trackOrderById(searchInput.trim());
    setFoundOrder(res || null);
    setSearched(true);
  };

  const milestones: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'Order Confirmed', label: 'Order Confirmed', desc: 'Garment reserved & payment verified' },
    { status: 'Tailoring & Quality Check', label: 'Artisan Inspection', desc: 'Zari integrity & fall quality approved' },
    { status: 'Dispatched', label: 'Dispatched via Air', desc: 'Handed over to Bluedart logistics hub' },
    { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'Courier agent en-route to doorstep' },
    { status: 'Delivered', label: 'Delivered', desc: 'Received & signed at address' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    const idx = milestones.findIndex((m) => m.status === status);
    return idx === -1 ? 2 : idx; // default to 2 if unknown or cancelled
  };

  const currentStepIdx = foundOrder ? getStepIndex(foundOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
      <div className="bg-[#FDFBF7] rounded-lg max-w-2xl w-full border border-[#DDD5C7] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FDFBF7]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#8C1D40] font-semibold">
              Live Logistics
            </span>
            <h2 className="font-serif text-2xl text-[#1A1818] mt-0.5">
              Track Your Shipment
            </h2>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 text-[#5C5551] hover:text-[#1A1818] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-[#EAE3D9] bg-[#F7F3EB]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. PF-89241) or Mobile Number"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors"
            >
              Track
            </button>
          </form>

          {/* Sample quick order clickers */}
          <div className="mt-3 flex items-center gap-2 text-xs text-[#5C5551]">
            <span className="text-[11px]">Recent Orders:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchInput(o.id);
                  setFoundOrder(o);
                }}
                className="font-mono text-xs text-[#8C1D40] hover:underline bg-white px-2 py-0.5 rounded border border-[#DDD5C7]"
              >
                {o.id}
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details */}
        <div className="p-6 space-y-6">
          {foundOrder ? (
            <div className="space-y-6">
              {/* Order Status Ribbon */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F2EDE4] rounded border border-[#DDD5C7]">
                <div>
                  <span className="text-[11px] text-[#7A736E] uppercase tracking-wider">Order #{foundOrder.id}</span>
                  <div className="font-serif text-lg text-[#1A1818] font-normal">
                    Status: <strong className="text-[#8C1D40]">{foundOrder.status}</strong>
                  </div>
                  <div className="text-xs text-[#5C5551] mt-0.5">
                    Courier: Bluedart Express (AWB: <strong className="font-mono">{foundOrder.trackingNumber}</strong>)
                  </div>
                </div>

                <div className="text-right sm:text-right text-xs">
                  <span className="text-[#7A736E] block">Expected Delivery:</span>
                  <strong className="text-sm text-[#1A1818]">{foundOrder.estimatedDelivery}</strong>
                </div>
              </div>

              {/* Step Timeline */}
              <div className="py-2 space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#DDD5C7]">
                {milestones.map((m, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={m.status} className="flex items-start gap-4 relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          isDone
                            ? 'bg-[#8C1D40] text-white shadow-sm'
                            : 'bg-white border-2 border-[#DDD5C7] text-[#9E958E]'
                        }`}
                      >
                        {isDone ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 pt-0.5">
                        <div className="flex items-baseline justify-between">
                          <h4
                            className={`text-xs font-semibold ${
                              isCurrent ? 'text-[#8C1D40]' : isDone ? 'text-[#1A1818]' : 'text-[#7A736E]'
                            }`}
                          >
                            {m.label}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold text-[#8C1D40] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Active Stage
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5C5551] mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Address */}
              <div className="p-3 bg-[#F7F3EB] rounded border border-[#EAE3D9] text-xs flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#8C1D40] shrink-0" />
                <span className="text-[#4A4543]">
                  Destination: <strong>{foundOrder.shippingAddress.fullName}</strong>, {foundOrder.shippingAddress.city}, {foundOrder.shippingAddress.state} ({foundOrder.shippingAddress.pincode})
                </span>
              </div>
            </div>
          ) : searched ? (
            <div className="text-center py-10 text-xs text-[#7A736E]">
              <Package className="w-10 h-10 mx-auto text-[#C5A059] mb-2 stroke-[1.5]" />
              <p className="font-semibold text-sm text-[#1A1818]">No order found for "{searchInput}"</p>
              <p className="mt-1">
                Please double-check your Order Reference ID (e.g. PF-89241) or phone number.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
