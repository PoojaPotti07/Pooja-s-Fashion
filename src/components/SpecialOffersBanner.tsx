import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SpecialOffersBanner: React.FC = () => {
  const { setSelectedCategory, showToast } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offers = [
    {
      code: 'POOJA15',
      badge: 'Patron Welcome',
      title: 'Flat 15% Off First Order',
      description: 'Applicable on sarees, kurtis & dress materials above ₹999.'
    },
    {
      code: 'UTSAV500',
      badge: 'Festive Season',
      title: 'Flat ₹500 Off On Orders ₹2,999+',
      description: 'Ideal for Chanderi suit sets, organza sarees & co-ords.'
    },
    {
      code: 'ROYAL1000',
      badge: 'Bridal Heritage',
      title: 'Flat ₹1,000 Off On Orders ₹5,999+',
      description: 'Exclusive for pure Banarasi Katan & bridal lehenga edits.'
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code "${code}" copied to clipboard! Paste at checkout.`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleShopOffers = () => {
    setSelectedCategory('Offers');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#1A1818] text-[#FDFBF7] relative overflow-hidden">
      {/* Decorative subtle ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C1D40]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b border-white/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C5C8] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C5C8]" />
              <span>Limited Festive Window</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FDFBF7] mt-2 font-normal">
              Special Festive Privileges
            </h2>
            <p className="text-xs sm:text-sm text-[#EDE5DC]/80 mt-1 max-w-lg">
              Enjoy handcrafted elegance with bespoke seasonal promotions. Click any coupon code to copy directly for your shopping cart.
            </p>
          </div>

          <button
            onClick={handleShopOffers}
            className="self-start lg:self-center px-6 py-3 bg-[#E8C5C8] text-[#1A1818] text-xs font-semibold uppercase tracking-wider rounded hover:bg-white transition-colors flex items-center gap-2 group"
          >
            <span>View All Sale Edit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Voucher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.code}
              className="bg-white/5 border border-white/10 rounded-lg p-6 relative hover:border-[#E8C5C8]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E8C5C8] font-semibold block mb-2">
                  {offer.badge}
                </span>
                <h3 className="font-serif text-xl font-normal text-white">
                  {offer.title}
                </h3>
                <p className="text-xs text-[#EDE5DC]/70 mt-2 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Code Box */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#E8C5C8]" />
                  <span className="font-mono text-sm tracking-wider font-bold text-white">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-all ${
                    copiedCode === offer.code
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white/15 text-white hover:bg-white hover:text-[#1A1818]'
                  }`}
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
