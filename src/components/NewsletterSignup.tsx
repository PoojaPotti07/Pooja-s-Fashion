import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const NewsletterSignup: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    showToast('Welcome to Pooja Fashion Privileges! Your 15% voucher is ready.');
  };

  return (
    <section className="py-16 bg-[#F2EDE4] border-t border-[#E5DDD0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#8C1D40] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Guild of Weaves</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1818] font-normal">
          First Access to Festive Drops & Artisan Curations
        </h2>

        <p className="text-xs sm:text-sm text-[#635B56] mt-2 max-w-md mx-auto">
          Subscribe to receive seasonal lookbooks, bridal trunk show invitations, and an immediate 15% welcome privilege voucher.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:w-auto flex-1 px-4 py-3 text-xs sm:text-sm bg-white border border-[#D5CCC0] rounded text-[#1A1818] placeholder-[#9E958E] focus:outline-none focus:border-[#8C1D40]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Join Salon</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded max-w-md mx-auto text-center animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-medium text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You're warmly welcomed, Patron!</span>
            </div>
            <p className="text-xs text-emerald-700 mt-1">
              Use code <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">POOJA15</strong> at checkout for 15% off your order.
            </p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#7A736E]">
          <span>No Spam, Only Artistry</span>
          <span>·</span>
          <span>Unsubscribe Anytime</span>
          <span>·</span>
          <span>7-Day Return Guarantee</span>
        </div>
      </div>
    </section>
  );
};
