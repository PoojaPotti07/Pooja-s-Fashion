import React, { useState } from 'react';
import { X, User, Mail, Phone, Package, LogOut, CheckCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    user,
    login,
    logout,
    orders,
    setIsOrderTrackingOpen
  } = useStore();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedName = name.trim() || 'Pooja Pottipati';
    const resolvedEmail = email.trim() || 'pottipooja000@gmail.com';
    const resolvedPhone = phone.trim() || '+91 98888 77665';
    login(resolvedName, resolvedEmail, resolvedPhone);
  };

  const handleQuickDemoLogin = () => {
    login('Pooja Pottipati', 'pottipooja000@gmail.com', '+91 98888 77665');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
      <div className="bg-[#FDFBF7] rounded-lg max-w-xl w-full border border-[#DDD5C7] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#8C1D40]" />
            <h2 className="font-serif text-2xl text-[#1A1818]">
              {user ? 'My Patron Account' : isRegister ? 'Create Account' : 'Patron Sign In'}
            </h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-[#5C5551] hover:text-[#1A1818] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {user ? (
          /* Profile & Order History View */
          <div className="p-6 space-y-6">
            {/* User Info Card */}
            <div className="p-4 bg-[#F7F3EB] rounded border border-[#EAE3D9] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-[#1A1818]">{user.name}</h3>
                <div className="text-xs text-[#5C5551] mt-0.5 space-y-0.5">
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="px-3 py-1.5 border border-[#DDD5C7] bg-white text-xs text-rose-700 hover:bg-rose-50 rounded flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Order History */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif text-base text-[#1A1818]">Order History & Dispatches</h4>
                <span className="text-xs text-[#7A736E]">{orders.length} Total Orders</span>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 bg-white rounded border border-[#EAE3D9] text-xs space-y-2 hover:border-[#8C1D40] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#1A1818]">#{order.id}</span>
                        <span className="px-2 py-0.5 bg-stone-100 text-[#1A1818] rounded font-medium text-[11px]">
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.items.map((it, idx) => (
                          <img
                            key={idx}
                            src={it.image}
                            alt=""
                            className="w-10 h-12 object-cover rounded border border-[#EAE3D9]"
                          />
                        ))}
                        <div className="flex-1 text-[11px] text-[#5C5551]">
                          <p className="font-medium text-[#1A1818] truncate">
                            {order.items[0]?.productName} {order.items.length > 1 && `+ ${order.items.length - 1} more`}
                          </p>
                          <p>Total: ₹{order.total.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#F0EAE1] flex justify-between items-center text-[11px]">
                        <span className="text-[#8C827A]">
                          Estimated: {order.estimatedDelivery}
                        </span>
                        <button
                          onClick={() => {
                            setIsAuthModalOpen(false);
                            setIsOrderTrackingOpen(true);
                          }}
                          className="text-[#8C1D40] font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>Track Package</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#7A736E] py-4">No recent orders yet.</p>
              )}
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div className="p-6 space-y-5">
            {/* Quick 1-Click Demo Button for User convenience */}
            <div className="p-3.5 bg-[#F2EDE4] rounded border border-[#DDD5C7] text-xs flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#1A1818] block">Instant Demo Sign-In:</span>
                <span className="text-[#5C5551]">Sign in as patron Pooja Pottipati with pre-loaded addresses</span>
              </div>
              <button
                onClick={handleQuickDemoLogin}
                className="px-3 py-1.5 bg-[#8C1D40] text-white text-xs font-semibold rounded hover:bg-[#68142E] transition-colors shrink-0 ml-2"
              >
                1-Click Login
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-medium text-[#4A4543] mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Pooja Pottipati"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. pottipooja000@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98888 77665"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors shadow-md"
              >
                {isRegister ? 'Register & Continue' : 'Sign In to Account'}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-[#8C1D40] hover:underline font-medium"
              >
                {isRegister ? 'Already have an account? Sign In' : 'New to Pooja Fashion? Create an Account'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
