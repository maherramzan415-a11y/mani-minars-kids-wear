import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Plus, Check, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Form state
  const [author, setAuthor] = useState('');
  const [childAge, setChildAge] = useState('Mother of 5-Year-Old Boy');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [productPurchased, setProductPurchased] = useState('Kids Denim Cargo Shorts with Elastic Waistband');
  const [submitted, setSubmitted] = useState(false);

  // Carousel navigation: 1 on mobile, 2 on tablet, 3 on desktop
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, reviews.length - 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= reviews.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto-slide carousel
  useEffect(() => {
    if (!isAutoPlaying || showReviewForm || reviews.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, showReviewForm, reviews.length]);

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

  // Visible items in the carousel loop
  const getVisibleReviews = () => {
    const list: CustomerReview[] = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const idx = (currentIndex + i) % reviews.length;
      if (reviews[idx]) {
        list.push(reviews[idx]);
      }
    }
    return list;
  };

  return (
    <section 
      id="reviews-section"
      className="py-16 bg-slate-50 border-t border-b border-slate-200/80 overflow-hidden relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Star Rating & Carousel Nav */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full mb-2">
              <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Verified Parent Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-display tracking-tight">
              Customer Reviews & Star Ratings
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-extrabold text-slate-900">4.9 out of 5.0</span>
              <span className="text-xs text-slate-500 font-medium">• Based on 1,400+ verified Pakistani parents</span>
            </div>
          </div>

          {/* Action Buttons & Carousel Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>

            {/* Carousel Previous / Next Controls */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
              <button
                onClick={prevSlide}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Previous review slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-[11px] font-bold text-slate-500 px-1">
                {currentIndex + 1} / {reviews.length}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Next review slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Review Form */}
        {showReviewForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl mb-10 max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-blue-950 font-display">
              Share Your Experience with Mani Minars Kids Wear
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Child's Age / Relation</label>
                <input
                  type="text"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="e.g. Mother of 4-Year-Old Boy"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:bg-white"
                >
                  <option value="Kids Denim Cargo Shorts with Elastic Waistband">Kids Denim Cargo Shorts with Elastic Waistband</option>
                  <option value="Breezy Kids Casual Cotton Shirt">Breezy Kids Casual Cotton Shirt</option>
                  <option value="Boys Urban Chino & Pique Polo Fashion Set">Boys Urban Chino & Pique Polo Fashion Set</option>
                  <option value="Little Princess Floral Summer Dress & Bloomers Set">Little Princess Floral Summer Dress</option>
                  <option value="Junior Dapper Blazer & Tailored Trouser Party Set">Junior Dapper Blazer Set</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Incredibly soft fabric and the elastic waistband fits perfectly!"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Detailed Feedback</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the fabric quality, stitching, elastic waistband, and how it holds up in the wash..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:bg-white"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {submitted ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{submitted ? 'Review Posted!' : 'Submit Review'}</span>
              </button>
            </div>
          </form>
        )}

        {/* The Review Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {getVisibleReviews().map((rev, i) => (
            <div
              key={`${rev.id}-${i}`}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-100 group-hover:text-red-50 transition-colors pointer-events-none" />

              <div>
                {/* Rating and date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">{rev.date}</span>
                </div>

                {/* Title */}
                <h4 className="text-sm sm:text-base font-bold text-blue-950 font-display mt-3 leading-snug">
                  "{rev.title}"
                </h4>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Reviewer info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{rev.childAge}</div>
                </div>

                <span className="text-[10px] text-blue-900 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md font-semibold truncate max-w-[130px]" title={rev.productPurchased}>
                  {rev.productPurchased}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'bg-red-600 w-7' : 'bg-slate-300 w-2 hover:bg-slate-400'
              }`}
              aria-label={`Jump to review slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
