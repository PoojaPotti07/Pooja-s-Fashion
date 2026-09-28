import React from 'react';
import { Mail, Phone, MapPin, Instagram, MessageCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsAdminDashboardOpen, setIsOrderTrackingOpen } = useStore();

  const handleNavCategory = (cat: string) => {
    setSelectedCategory(cat);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#141212] text-[#EDE5DC] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-medium tracking-tight text-white block">
              Pooja Fashion
            </span>
            <p className="text-xs sm:text-sm text-[#EDE5DC]/70 leading-relaxed max-w-sm font-light">
              Rooted in the timeless textile traditions of India, Pooja Fashion curates heirloom Banarasi silks, delicate Awadhi Chikankari, and contemporary festive ensembles for the modern patron.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#8C1D40] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919888877665?text=Hello%20Pooja%20Fashion,%20I%20would%20like%20styling%20assistance"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-700 hover:text-white transition-colors"
                aria-label="WhatsApp Styling Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E8C5C8]">
              The Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE5DC]/80 font-light">
              <li>
                <button onClick={() => handleNavCategory('Sarees')} className="hover:text-white transition-colors">
                  Banarasi & Silk Sarees
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Kurtis')} className="hover:text-white transition-colors">
                  Chikankari & Daily Kurtis
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Dress Materials')} className="hover:text-white transition-colors">
                  Chanderi Dress Materials
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Ethnic Wear')} className="hover:text-white transition-colors">
                  Festive Lehengas & Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Offers')} className="hover:text-white transition-colors">
                  Festive Privileges & Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Patron Support */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E8C5C8]">
              Customer Patronage
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE5DC]/80 font-light">
              <li>
                <button onClick={() => setIsOrderTrackingOpen(true)} className="hover:text-white transition-colors">
                  Track Your Shipment
                </button>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Size & Fitting Guide
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  7-Day Seamless Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Pure Silk Care Instructions
                </span>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminDashboardOpen(true)}
                  className="text-[#E8C5C8] hover:underline transition-colors"
                >
                  Admin Operations Console
                </button>
              </li>
            </ul>
          </div>

          {/* Boutiques & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E8C5C8]">
              Studio & Boutiques
            </h4>
            <div className="space-y-2.5 text-xs text-[#EDE5DC]/80 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E8C5C8] shrink-0 mt-0.5" />
                <span>Flagship: 42 MG Road, Indiranagar, Bangalore 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E8C5C8] shrink-0" />
                <a href="tel:+919888877665" className="hover:text-white transition-colors">
                  +91 98888 77665
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E8C5C8] shrink-0" />
                <a href="mailto:care@poojafashion.com" className="hover:text-white transition-colors">
                  care@poojafashion.com
                </a>
              </div>
              <p className="text-[11px] text-[#EDE5DC]/60 pt-1">
                Atelier Hours: Mon–Sat, 10:00 AM – 8:00 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Payment Gateways & Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EDE5DC]/60 font-light">
          <div className="flex items-center gap-2">
            <span>© 2026 Pooja Fashion Private Limited. All rights reserved.</span>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="text-[#EDE5DC]/40 uppercase tracking-widest text-[10px]">100% Secure Payments:</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">UPI</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">RuPay</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">Visa</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">MasterCard</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">Cash On Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
