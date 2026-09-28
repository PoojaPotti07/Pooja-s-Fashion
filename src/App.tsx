/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CatalogSection } from './components/CatalogSection';
import { SpecialOffersBanner } from './components/SpecialOffersBanner';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramGallery } from './components/InstagramGallery';
import { NewsletterSignup } from './components/NewsletterSignup';
import { Footer } from './components/Footer';

// Modals, Drawers & Utilities
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SizeGuideModal } from './components/SizeGuideModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ChatbotWidget } from './components/ChatbotWidget';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#FDFBF7] text-[#1A1818] flex flex-col font-sans selection:bg-[#E8C5C8] selection:text-[#1A1818]">
        {/* Navigation & Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Banner with "Style That Feels Like You" */}
          <HeroBanner />

          {/* Curated Categories */}
          <CategoryShowcase />

          {/* Main Product Catalog with Category, Size & Price Filters */}
          <CatalogSection />

          {/* Festive Special Offers & Privilege Codes */}
          <SpecialOffersBanner />

          {/* Verified Customer Reviews & Testimonials */}
          <ReviewsSection />

          {/* Community Instagram Styling Gallery */}
          <InstagramGallery />

          {/* Patron Salon Newsletter */}
          <NewsletterSignup />
        </main>

        {/* Footer with Boutiques, Policies, Contact & Accepted Payments */}
        <Footer />

        {/* Interactive Modals & Slide-overs */}
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <OrderTrackingModal />
        <AuthModal />
        <AdminDashboard />
        <SizeGuideModal />

        {/* Float Affordances */}
        <WhatsAppButton />
        <ChatbotWidget />
        <ToastContainer />
      </div>
    </StoreProvider>
  );
}
