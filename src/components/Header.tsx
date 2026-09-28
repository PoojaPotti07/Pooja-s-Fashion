import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Shield, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthModalOpen,
    setIsAdminDashboardOpen,
    setIsOrderTrackingOpen,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    user
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navCategories = [
    { label: 'Home', value: 'All' },
    { label: 'Sarees', value: 'Sarees' },
    { label: 'Kurtis', value: 'Kurtis' },
    { label: 'Dress Materials', value: 'Dress Materials' },
    { label: 'Ethnic Wear', value: 'Ethnic Wear' },
    { label: 'New Arrivals', value: 'New Arrivals' },
    { label: 'Offers', value: 'Offers' }
  ];

  const handleNavClick = (value: string) => {
    setSelectedCategory(value);
    setIsMobileMenuOpen(false);
    // Smooth scroll to catalog section
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#1A1818] text-[#FDFBF7] py-2 px-4 text-xs tracking-wider text-center flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C5C8]" />
          Festive Preview: Enjoy 15% Off Your First Order with Code <strong className="text-[#E8C5C8] font-semibold tracking-widest">POOJA15</strong>
        </span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="hidden sm:inline text-white/80">Complimentary Express Shipping on Orders Above ₹1,499</span>
      </div>

      {/* Main Top Bar - strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Mobile Menu Toggle + Brand Zone */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1818] hover:text-[#8C1D40] transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col items-start leading-none"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-tight font-medium text-[#1A1818] group-hover:text-[#8C1D40] transition-colors">
              Pooja Fashion
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8C1D40] uppercase font-sans mt-0.5 font-medium">
              Haute Indian Weaves
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A4543]">
          {navCategories.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.value)}
              className={`transition-colors relative py-1 text-sm ${
                selectedCategory === item.value
                  ? 'text-[#8C1D40] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#8C1D40]'
                  : 'hover:text-[#1A1818]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="#contact"
            className="hover:text-[#1A1818] transition-colors py-1"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Actions & Search */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Search Input or Toggle */}
          <div className="relative hidden md:block w-52 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sarees, kurtis..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F3EB] border border-[#E5DDD0] rounded text-[#1A1818] placeholder-[#9E958E] focus:outline-none focus:border-[#8C1D40] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="md:hidden p-2 text-[#4A4543] hover:text-[#1A1818] transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Order Tracking */}
          <button
            onClick={() => setIsOrderTrackingOpen(true)}
            className="hidden sm:flex items-center text-xs text-[#5C5551] hover:text-[#8C1D40] transition-colors px-2 py-1"
            title="Track Your Order"
          >
            <span>Track Order</span>
          </button>

          {/* User Account */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="p-2 text-[#4A4543] hover:text-[#8C1D40] transition-colors relative"
            aria-label="User Account"
            title={user ? `Signed in as ${user.name}` : 'Sign In'}
          >
            <User className="w-5 h-5" />
            {user && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8C1D40]" />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-[#4A4543] hover:text-[#8C1D40] transition-colors relative"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8C1D40] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-[#4A4543] hover:text-[#8C1D40] transition-colors relative"
            aria-label="Shopping Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1A1818] text-[#FDFBF7] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard Entry */}
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs border border-[#DCD5C9] rounded text-[#4A4543] hover:bg-[#F2ECE1] hover:text-[#1A1818] transition-colors"
            title="Store Admin Console"
          >
            <Shield className="w-3.5 h-3.5 text-[#8C1D40]" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchVisible && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-[#EAE3D9] bg-[#FDFBF7]">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sarees, kurtis, lehengas..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#F7F3EB] border border-[#E5DDD0] rounded text-[#1A1818] placeholder-[#9E958E] focus:outline-none focus:border-[#8C1D40]"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D9] bg-[#FDFBF7] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 text-base font-medium">
            {navCategories.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.value)}
                className={`text-left py-2 border-b border-[#F0EAE1] ${
                  selectedCategory === item.value ? 'text-[#8C1D40] font-semibold' : 'text-[#2D2A29]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 border-b border-[#F0EAE1] text-[#2D2A29]"
            >
              Contact Us & Boutiques
            </a>

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOrderTrackingOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm text-[#5C5551] flex items-center justify-between"
              >
                <span>Track My Order</span>
                <span className="text-xs text-[#8C1D40]">→</span>
              </button>
              <button
                onClick={() => {
                  setIsAdminDashboardOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm text-[#8C1D40] font-medium flex items-center gap-1.5"
              >
                <Shield className="w-4 h-4" />
                <span>Store Owner Admin Panel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
