import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../assets/images';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const categories = [
    {
      title: 'Handloom Sarees',
      subtitle: 'Banarasi, Katan & Kanjeevaram',
      category: 'Sarees',
      image: IMAGES.saree,
      itemCount: '40+ Styles'
    },
    {
      title: 'Chikankari Kurtis',
      subtitle: 'Georgette & Mulmul Silhouettes',
      category: 'Kurtis',
      image: IMAGES.kurti,
      itemCount: '35+ Styles'
    },
    {
      title: 'Dress Materials',
      subtitle: 'Chanderi & Handblock Suits',
      category: 'Dress Materials',
      image: IMAGES.dressMaterial,
      itemCount: '28+ Sets'
    },
    {
      title: 'Festive Ethnic Wear',
      subtitle: 'Royal Lehengas & Shararas',
      category: 'Ethnic Wear',
      image: IMAGES.lehenga,
      itemCount: '22+ Ensembles'
    }
  ];

  const handleSelect = (catName: string) => {
    setSelectedCategory(catName);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE3D9]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C1D40] font-semibold">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1818] mt-1 font-normal">
              Signature Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#736B66] mt-2 sm:mt-0 max-w-sm">
            Each creation is an ode to ancient Indian handloom traditions, reimagined for the contemporary woman.
          </p>
        </div>

        {/* 4-Column Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() => handleSelect(cat.category)}
              className="group relative cursor-pointer overflow-hidden rounded bg-[#F7F3EB] border border-[#EBE4D8] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="aspect-[3/4] overflow-hidden bg-[#ECE6DB] relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              </div>

              {/* Category Info Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-[#FDFBF7]">
                <div className="flex items-center justify-between text-xs text-[#E8C5C8] font-medium tracking-wide mb-1">
                  <span>{cat.itemCount}</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#8C1D40] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#E8C5C8] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/80 mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
