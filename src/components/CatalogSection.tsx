import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const CatalogSection: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories = ['All', 'Sarees', 'Kurtis', 'Dress Materials', 'Ethnic Wear', 'Casual Wear', 'Accessories'];

  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'Unstitched'];

  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹2,000', value: '0-2000' },
    { label: '₹2,000 - ₹4,000', value: '2000-4000' },
    { label: '₹4,000 - ₹7,000', value: '4000-7000' },
    { label: 'Above ₹7,000', value: '7000-99999' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category / Tab filter
      if (selectedCategory === 'New Arrivals') {
        if (!prod.isNew) return false;
      } else if (selectedCategory === 'Offers') {
        if (!prod.originalPrice || prod.originalPrice <= prod.price) return false;
      } else if (selectedCategory !== 'All') {
        if (prod.category !== selectedCategory) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesCategory = prod.category.toLowerCase().includes(query);
        const matchesFabric = prod.fabric.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesFabric && !matchesDesc) return false;
      }

      // Size Filter
      if (selectedSize !== 'All') {
        const hasSize = prod.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase()));
        if (!hasSize) return false;
      }

      // Price Range Filter
      if (selectedPriceRange !== 'All') {
        const [min, max] = selectedPriceRange.split('-').map(Number);
        if (prod.price < min || prod.price > max) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, selectedSize, selectedPriceRange, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedPriceRange !== 'All' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedPriceRange('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className="py-16 sm:py-20 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C1D40] font-semibold">
              The Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1818] mt-1 font-normal">
              {selectedCategory === 'All'
                ? 'All Handcrafted Creations'
                : selectedCategory === 'New Arrivals'
                ? 'New Season Arrivals'
                : selectedCategory === 'Offers'
                ? 'Exclusive Festive Offers'
                : selectedCategory}
            </h2>
          </div>

          {/* Quick Category Segmented Tabs (Anti-slop clean buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1A1818] text-[#FDFBF7]'
                    : 'bg-[#F2ECE1] text-[#4A4543] hover:bg-[#EBE2D4] hover:text-[#1A1818]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="p-4 bg-[#F7F3EB] border border-[#EAE3D9] rounded mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DDD5C7] rounded font-medium text-[#1A1818]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Desktop Filters: Size dropdown */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[#7A736E] uppercase tracking-wider font-semibold text-[10px]">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                aria-label="Filter by size"
                className="bg-white border border-[#DDD5C7] rounded px-2.5 py-1.5 text-xs text-[#1A1818] focus:outline-none focus:border-[#8C1D40]"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Sizes' : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Filters: Price dropdown */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[#7A736E] uppercase tracking-wider font-semibold text-[10px]">Price:</span>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                aria-label="Filter by price"
                className="bg-white border border-[#DDD5C7] rounded px-2.5 py-1.5 text-xs text-[#1A1818] focus:outline-none focus:border-[#8C1D40]"
              >
                {priceRanges.map((pr) => (
                  <option key={pr.value} value={pr.value}>
                    {pr.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active search tag */}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-white border border-[#DDD5C7] px-2.5 py-1 rounded text-[#1A1818]">
                <span>Search: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-[#8C1D40]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-[#8C1D40] underline hover:text-[#5B1028] ml-2 font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Sort Controls & Count */}
          <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-2 md:pt-0 border-[#EAE3D9]">
            <span className="text-[#7A736E] tabular-nums">
              Showing <strong className="text-[#1A1818] font-semibold">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#7A736E]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-white border border-[#DDD5C7] rounded px-2.5 py-1.5 text-xs text-[#1A1818] focus:outline-none focus:border-[#8C1D40]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filters Drawer if expanded */}
        {isMobileFilterOpen && (
          <div className="md:hidden p-4 mb-6 bg-[#F2EDE4] rounded border border-[#DDD5C7] space-y-4">
            <div>
              <span className="font-semibold text-xs text-[#1A1818] block mb-2">Select Size:</span>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-2.5 py-1 text-xs rounded ${
                      selectedSize === s ? 'bg-[#1A1818] text-white' : 'bg-white text-[#4A4543]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-xs text-[#1A1818] block mb-2">Price Budget:</span>
              <div className="grid grid-cols-2 gap-2">
                {priceRanges.map((pr) => (
                  <button
                    key={pr.value}
                    onClick={() => setSelectedPriceRange(pr.value)}
                    className={`px-2.5 py-1 text-xs rounded text-left ${
                      selectedPriceRange === pr.value ? 'bg-[#1A1818] text-white' : 'bg-white text-[#4A4543]'
                    }`}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#F7F3EB] rounded border border-dashed border-[#DDD5C7] p-8">
            <h3 className="font-serif text-xl text-[#1A1818]">No clothing items matched your filter</h3>
            <p className="text-xs text-[#7A736E] mt-2 max-w-sm mx-auto">
              Try adjusting your size, category, or search term to discover our handcrafted collection.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 px-5 py-2 bg-[#1A1818] text-white text-xs font-medium rounded hover:bg-[#8C1D40] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
