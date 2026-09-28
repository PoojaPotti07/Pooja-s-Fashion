import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, Share2, Ruler, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    closeProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openSizeGuide,
    setIsCheckoutOpen,
    products,
    reviews,
    showToast
  } = useStore();

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Original');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'craft' | 'reviews'>('desc');

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Filter product-specific reviews
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products from same category or random
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || Math.random() > 0.5))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    closeProductModal();
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this beautiful ${product.name} at Pooja Fashion!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-lg max-w-5xl w-full border border-[#DDD5C7] shadow-2xl overflow-hidden my-6 relative flex flex-col max-h-[92vh]">
        {/* Sticky Close Header */}
        <div className="px-6 py-3 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FDFBF7] shrink-0">
          <div className="text-xs text-[#7A736E] uppercase tracking-wider">
            <span>{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-[#1A1818] font-medium truncate max-w-xs">{product.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#5C5551] hover:text-[#8C1D40] transition-colors"
              title="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeProductModal}
              className="p-1.5 text-[#5C5551] hover:text-[#1A1818] rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-10">
          {/* Main 2-Column Product Detail Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded overflow-hidden bg-[#F7F3EB] border border-[#EAE3D9] relative">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-[#8C1D40] text-white text-xs font-semibold px-2.5 py-1 rounded">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-20 rounded overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-[#8C1D40]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Purchase Module Column */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C1D40] font-semibold">
                  Handcrafted Pure Weave
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1818] font-normal mt-1 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex text-[#C5A059]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-[#1A1818] tabular-nums">{product.rating}</span>
                  <span className="text-[#7A736E]">({product.reviewCount} customer reviews)</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-emerald-700 font-medium">In Stock ({product.stockCount} left)</span>
                </div>

                {/* Price Display */}
                <div className="mt-4 pt-3 border-t border-[#EAE3D9] flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-medium text-[#1A1818] tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#8C827A] line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-[#7A736E]">(Inclusive of all taxes & duties)</span>
                </div>

                {/* Fabric Callout */}
                <div className="mt-4 p-3 bg-[#F7F3EB] rounded border border-[#EAE3D9] text-xs">
                  <strong className="text-[#1A1818] font-medium">Fabric & Weave: </strong>
                  <span className="text-[#5C5551]">{product.fabric}</span>
                </div>

                {/* Color Selection */}
                <div className="mt-6">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1818] mb-2">
                    Color: <span className="font-normal text-[#5C5551] normal-case">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs rounded border transition-all ${
                          selectedColor === color
                            ? 'border-[#8C1D40] bg-[#FDFBF7] text-[#8C1D40] font-semibold ring-1 ring-[#8C1D40]'
                            : 'border-[#DDD5C7] bg-[#F7F3EB] text-[#4A4543] hover:border-[#1A1818]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection & Size Guide */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1818]">
                      Size: <span className="font-normal text-[#5C5551] normal-case">{selectedSize}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => openSizeGuide(product.category)}
                      className="text-xs text-[#8C1D40] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 text-xs rounded border transition-all ${
                          selectedSize === size
                            ? 'border-[#1A1818] bg-[#1A1818] text-white font-medium'
                            : 'border-[#DDD5C7] bg-white text-[#4A4543] hover:border-[#8C1D40]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1818]">Quantity:</span>
                  <div className="flex items-center border border-[#DDD5C7] rounded bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-sm text-[#4A4543] hover:bg-[#F2EDE4]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-semibold tabular-nums text-[#1A1818]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-1 text-sm text-[#4A4543] hover:bg-[#F2EDE4]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-[#EAE3D9]">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-[#1A1818] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#8C1D40] transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 border rounded transition-colors flex items-center justify-center ${
                      isFavorited
                        ? 'border-[#8C1D40] text-[#8C1D40] bg-rose-50'
                        : 'border-[#DDD5C7] text-[#4A4543] hover:text-[#8C1D40] bg-white'
                    }`}
                    title={isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-[#8C1D40] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#6b1430] transition-colors shadow-md"
                >
                  Buy It Now
                </button>
              </div>

              {/* Assurances */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-[#5C5551]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8C1D40] shrink-0" />
                  <span>Free Express Delivery 1499+</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#8C1D40] shrink-0" />
                  <span>7-Day Return / Exchange</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Info Section: Description, Craftsmanship, Reviews */}
          <div className="pt-8 border-t border-[#EAE3D9]">
            <div className="flex border-b border-[#EAE3D9] gap-8">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'desc'
                    ? 'text-[#8C1D40] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8C1D40]'
                    : 'text-[#5C5551] hover:text-[#1A1818]'
                }`}
              >
                Description & Styling
              </button>
              <button
                onClick={() => setActiveTab('craft')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'craft'
                    ? 'text-[#8C1D40] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8C1D40]'
                    : 'text-[#5C5551] hover:text-[#1A1818]'
                }`}
              >
                Artisan Heritage & Care
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'text-[#8C1D40] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8C1D40]'
                    : 'text-[#5C5551] hover:text-[#1A1818]'
                }`}
              >
                Customer Reviews ({productReviews.length})
              </button>
            </div>

            <div className="py-6 text-sm text-[#4A4543] leading-relaxed">
              {activeTab === 'desc' && (
                <div className="space-y-4 max-w-3xl">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F7F3EB] p-4 rounded border border-[#EAE3D9]">
                    <div>
                      <strong className="text-[#1A1818]">Category: </strong> {product.category}
                    </div>
                    <div>
                      <strong className="text-[#1A1818]">Available Colors: </strong> {product.colors.join(', ')}
                    </div>
                    <div>
                      <strong className="text-[#1A1818]">Material: </strong> {product.fabric}
                    </div>
                    <div>
                      <strong className="text-[#1A1818]">Dispatch: </strong> Within 24-48 Hours
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'craft' && (
                <div className="space-y-4 max-w-3xl">
                  <div>
                    <h4 className="font-semibold text-[#1A1818] mb-1">Artisan Collective:</h4>
                    <p className="text-xs text-[#5C5551]">{product.craftsmanship || 'Handcrafted by accredited master weavers of Varanasi and Lucknow.'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A1818] mb-1">Washing & Preservation Guide:</h4>
                    <p className="text-xs text-[#5C5551]">{product.careInstructions || 'Dry clean recommended to preserve pure zari luster. Avoid direct sun exposure.'}</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4 max-w-3xl">
                  {productReviews.length > 0 ? (
                    productReviews.map((r) => (
                      <div key={r.id} className="p-4 bg-[#F7F3EB] rounded border border-[#EAE3D9]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex text-[#C5A059]">
                            {[...Array(r.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-[#7A736E]">{r.date}</span>
                        </div>
                        <p className="text-xs italic text-[#2D2A29]">"{r.comment}"</p>
                        <div className="mt-2 text-xs font-semibold text-[#1A1818]">
                          {r.userName} <span className="text-[#7A736E] font-normal">({r.userCity})</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#7A736E]">
                      Be the first to review this handcrafted silhouette. Share your thoughts in the reviews section below!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-[#EAE3D9]">
              <h3 className="font-serif text-xl text-[#1A1818] mb-6">
                You May Also Admire
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
