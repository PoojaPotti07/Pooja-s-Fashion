import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    openProductModal,
    setSelectedCategory
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: any) => {
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0] || 'Original';
    addToCart(product, defaultSize, defaultColor, 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#EAE3D9]">
          {/* Header */}
          <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FDFBF7]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8C1D40] fill-current" />
              <h2 className="font-serif text-xl text-[#1A1818]">Your Wishlist</h2>
              <span className="text-xs text-[#7A736E] font-medium">
                ({wishlistProducts.length} items)
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#5C5551] hover:text-[#1A1818] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EAE3D9]">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((prod) => (
                <div key={prod.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductModal(prod);
                    }}
                    className="w-20 h-24 rounded overflow-hidden bg-[#F7F3EB] border border-[#EAE3D9] shrink-0 cursor-pointer"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openProductModal(prod);
                          }}
                          className="font-serif text-sm font-normal text-[#1A1818] line-clamp-1 cursor-pointer hover:text-[#8C1D40]"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="text-[#9E958E] hover:text-[#8C1D40] p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7A736E] mt-0.5">
                        {prod.category} · {prod.fabric.split(' ')[0]}
                      </div>

                      <div className="mt-1 font-semibold text-xs tabular-nums text-[#1A1818]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => handleMoveToBag(prod)}
                      className="mt-2 w-full py-1.5 px-3 bg-[#1A1818] text-white text-xs font-medium rounded hover:bg-[#8C1D40] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <Heart className="w-12 h-12 text-[#E8C5C8] mb-3 stroke-[1.5]" />
                <h3 className="font-serif text-lg text-[#1A1818]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#7A736E] mt-1 max-w-xs">
                  Save pieces you love by tapping the heart icon on any saree, kurti, or lehenga.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedCategory('All');
                  }}
                  className="mt-5 px-6 py-2.5 bg-[#1A1818] text-white text-xs font-medium rounded hover:bg-[#8C1D40] transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
