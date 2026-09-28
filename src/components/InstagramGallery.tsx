import React from 'react';
import { Instagram, ShoppingBag, Heart } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/storeData';
import { useStore } from '../context/StoreContext';

export const InstagramGallery: React.FC = () => {
  const { products, openProductModal } = useStore();

  const handleShopLook = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      openProductModal(product);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#8C1D40] font-semibold mb-1">
            <Instagram className="w-3.5 h-3.5" />
            <span>#PoojaFashionDiaries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1818] font-normal">
            As Styled By You
          </h2>
          <p className="text-xs sm:text-sm text-[#736B66] mt-2">
            Tag @PoojaFashion on Instagram to be featured on our digital salon gallery. Click any look to shop the exact garment.
          </p>
        </div>

        {/* 4-Item Lookbook Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => handleShopLook(post.productId)}
              className="group relative aspect-[3/4] overflow-hidden rounded bg-[#F7F3EB] border border-[#EAE3D9] cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Scrim Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between text-xs text-white/90">
                  <span className="font-medium tracking-wide">{post.handle}</span>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                    <span className="text-[11px] tabular-nums">{post.likes}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/90 line-clamp-2 leading-relaxed mb-3">
                    {post.caption}
                  </p>

                  <button className="w-full py-2 bg-[#E8C5C8] text-[#1A1818] text-xs font-semibold rounded flex items-center justify-center gap-1.5 hover:bg-white transition-colors">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shop This Look</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
