import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Plus, Check } from 'lucide-react';
import { CustomerReview } from '../types';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  onAddReview,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [childAge, setChildAge] = useState('Mother of 5-Year-Old Boy');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [productPurchased, setProductPurchased] = useState('Kids Denim Cargo Shorts with Elastic Waistband');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      childAge: childAge.trim(),
      rating: rating,
      date: 'Just now',
      title: title.trim() || 'Great comfortable fit for everyday adventures!',
      comment: comment.trim(),
      verified: true,
      productPurchased: productPurchased
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setAuthor('');
      setTitle('');
      setComment('');
    }, 1200);
  };

  return (
    <section className="py-14 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Loved by Parents Everywhere
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-2">
              Real Customer Stories & Reviews
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">4.9 out of 5</span>
              <span className="text-xs text-slate-500">• Based on 1,200+ verified parent ratings</span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Parent Review</span>
          </button>
        </div>

        {/* Submit Review Form Dropdown */}
        {showReviewForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md mb-8 max-w-2xl mx-auto space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-blue-950 font-display">
              Share Your Experience with Mani Minars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Jessica Miller"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Child's Age</label>
                <input
                  type="text"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="e.g. Mother of 4-Year-Old Boy"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                  <option value={3}>⭐⭐⭐ 3 Stars - Average</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Purchased</label>
                <select
                  value={productPurchased}
                  onChange={(e) => setProductPurchased(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                >
                  <option value="Kids Denim Cargo Shorts with Elastic Waistband">Kids Denim Cargo Shorts with Elastic Waistband</option>
                  <option value="Breezy Kids Casual Cotton Shirt">Breezy Kids Casual Cotton Shirt</option>
                  <option value="Boys Urban Chino & Pique Polo Fashion Set">Boys Urban Chino & Pique Polo Fashion Set</option>
                  <option value="Trendy Children Safari Adventure Outfit">Trendy Children Safari Adventure Outfit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Incredibly soft fabric and the waistband stretches comfortably!"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Detailed Feedback</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the fabric quality, stitching, elastic waistband, and how it holds up after washing..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                {submitted ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{submitted ? 'Review Posted!' : 'Submit Review'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating and date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-blue-950 font-display mt-2">
                  "{rev.title}"
                </h4>

                {/* Comment */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Parent
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{rev.childAge}</div>
                </div>

                <span className="text-[10px] text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md font-semibold truncate max-w-[140px]">
                  {rev.productPurchased}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
