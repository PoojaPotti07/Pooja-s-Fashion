import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleShopNow = () => {
    setSelectedCategory('All');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreSarees = () => {
    setSelectedCategory('Sarees');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#1A1818] text-[#FDFBF7]">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_pooja_fashion_editorial_1790578107709.jpg"
          alt="Pooja Fashion Luxury Indian Festive Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.88] scale-[1.01] transition-transform duration-1000 ease-out"
        />
        {/* Measured dark gradient scrim for 4.5:1 WCAG text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141212]/90 via-[#1A1818]/65 to-transparent sm:w-3/4 md:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141212] via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 flex flex-col justify-center min-h-[580px] lg:min-h-[680px]">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E8C5C8] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E8C5C8]" />
            <span>The Festive & Wedding Heritage Edit 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FDFBF7] font-normal leading-[1.12] tracking-tight text-balance">
            Style That Feels Like You
          </h1>

          <p className="text-base sm:text-lg text-[#EDE5DC]/90 leading-relaxed font-light font-sans max-w-lg">
            Discover quintessential Banarasi silks, hand-embroidered Lucknowi Chikankari kurtis, and ethereal festive ensembles crafted with mindful Indian artistry.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleShopNow}
              className="px-8 py-3.5 bg-[#FDFBF7] text-[#1A1818] font-medium text-sm rounded hover:bg-[#E8C5C8] hover:text-[#1A1818] transition-all duration-200 flex items-center gap-2 group shadow-lg"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleExploreSarees}
              className="px-7 py-3.5 border border-white/40 text-white font-medium text-sm rounded hover:bg-white/10 transition-colors"
            >
              Explore Pure Sarees
            </button>
          </div>
        </div>
      </div>

      {/* Trust Markers Bar */}
      <div className="relative z-10 border-t border-white/15 bg-[#141212]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#EDE5DC]">
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#E8C5C8] shrink-0" />
            <span>Free Express Shipping ₹1499+</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#E8C5C8] shrink-0" />
            <span>100% Authentic Handcrafted Weaves</span>
          </div>
          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-4 h-4 text-[#E8C5C8] shrink-0" />
            <span>Hassle-Free 7-Day Exchange</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[#E8C5C8] font-bold text-sm shrink-0">₹</span>
            <span>Cash on Delivery Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
