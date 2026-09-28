import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquareQuote, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, products } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'pf-01');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      productId: selectedProductId,
      userName: name.trim(),
      userCity: city.trim() || 'India',
      rating,
      comment: comment.trim(),
      verifiedBuyer: true
    });

    setName('');
    setCity('');
    setComment('');
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F7F3EB] border-y border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C1D40] font-semibold">
              Patron Words
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1818] mt-1 font-normal">
              Loved by Discerning Women
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#5C5551]">
              <div className="flex text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#1A1818]">4.8 / 5 Overall Satisfaction</span>
              <span>·</span>
              <span>Based on 350+ Verified Orders</span>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="mt-4 sm:mt-0 px-4 py-2 border border-[#8C1D40] text-[#8C1D40] hover:bg-[#8C1D40] hover:text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Form Modal / Drawer */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-10 p-6 bg-[#FDFBF7] border border-[#DDD5C7] rounded shadow-sm max-w-xl space-y-4 animate-in fade-in"
          >
            <h4 className="font-serif text-lg text-[#1A1818]">Share Your Experience</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shalini Roy"
                  className="w-full p-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A4543] mb-1">City / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full p-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4543] mb-1">Product Purchased</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4543] mb-1">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'fill-[#C5A059] text-[#C5A059]' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4543] mb-1">Your Review</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe fabric softness, fall, packaging, and styling fit..."
                className="w-full p-2 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#8C1D40]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-xs text-[#7A736E] hover:text-[#1A1818]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#8C1D40] text-white text-xs font-medium rounded hover:bg-[#68142E] transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((rev) => {
            const product = products.find((p) => p.id === rev.productId);
            return (
              <div
                key={rev.id}
                className="bg-[#FDFBF7] p-6 rounded border border-[#E8E1D5] flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Rating Stars & Verified tag */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#C5A059]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    {rev.verifiedBuyer && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#383432] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EAE1]">
                  <div className="flex items-baseline justify-between text-xs">
                    <strong className="font-semibold text-[#1A1818]">{rev.userName}</strong>
                    <span className="text-[#8C827A]">{rev.userCity} · {rev.date}</span>
                  </div>
                  {product && (
                    <div className="mt-1 text-[11px] text-[#8C1D40] truncate font-medium">
                      Purchased: {product.name}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
