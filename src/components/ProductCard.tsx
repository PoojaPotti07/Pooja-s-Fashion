import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, openProductModal, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0] || 'Original';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-[#FDFBF7] transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-[#F7F3EB] border border-[#EAE3D9]">
        {!imageError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F2EDE4] p-4 text-center">
            <span className="font-serif text-lg text-[#8C1D40]">{product.category}</span>
            <span className="text-xs text-[#7A736E] mt-1">{product.fabric}</span>
          </div>
        )}

        {/* Clean subtle badges: Limited run or Discount tag (Not a pill, quiet label) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isNew && (
            <span className="text-[11px] tracking-wider uppercase font-semibold text-[#1A1818] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-sm">
              New Edit
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[11px] font-semibold tracking-wider text-[#8C1D40] bg-[#FDFBF7]/95 px-2 py-0.5 rounded-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-[#8C1D40] text-white shadow-md'
              : 'bg-white/85 text-[#1A1818] hover:bg-white hover:text-[#8C1D40] shadow-sm'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions Drawer on Hover (Desktop) */}
        <div
          className={`absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-[#1A1818] text-[#FDFBF7] text-xs font-medium rounded hover:bg-[#8C1D40] transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="p-2 bg-white/95 text-[#1A1818] hover:text-[#8C1D40] rounded shadow-md transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="pt-3.5 pb-2 flex flex-col flex-1">
        {/* Unboxed Metadata: Category & Fabric */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#7A736E] uppercase tracking-wider mb-1">
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate max-w-[130px]">{product.fabric.split(' ')[0]}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-base text-[#1A1818] font-normal leading-snug line-clamp-2 group-hover:text-[#8C1D40] transition-colors">
          {product.name}
        </h3>

        {/* Ratings & Price */}
        <div className="mt-2 pt-2 border-t border-[#F0EAE1] flex items-center justify-between">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-base font-semibold text-[#1A1818]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E958E] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-[#5C5551]">
            <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
            <span className="font-medium text-[#1A1818] tabular-nums">{product.rating}</span>
            <span className="text-[#9E958E]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="mt-2 sm:hidden w-full py-2 bg-[#F7F3EB] border border-[#E5DDD0] text-[#1A1818] text-xs font-medium rounded flex items-center justify-center gap-1.5 active:bg-[#1A1818] active:text-white transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
