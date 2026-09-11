import { Product, ALL_SIZES } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mm-01',
    name: 'Kids Denim Cargo Shorts with Elastic Waistband',
    category: 'denim-cargo',
    categoryLabel: 'Denim Cargo Shorts',
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviewCount: 148,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for playground agility and weekend outings! Features a super soft, stretch-infused denim fabric with a ribbed elastic waistband and functional drawstrings that easily adapt to your growing child.',
    highlights: [
      'Comfort-stretch elastic waistband with soft interior lining',
      'Dual utility cargo flap pockets with secure closures',
      'Durable reinforced seat & knee stitching',
      'Skin-friendly washed denim—no stiff or scratchy feel'
    ],
    fabric: '98% Combed Cotton, 2% Spandex Stretch Denim',
    careInstructions: 'Machine wash cold inside out, tumble dry low. Non-chlorine bleach only.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Vintage Blue', hex: '#3B82F6' },
      { name: 'Washed Navy', hex: '#1E3A8A' },
      { name: 'Faded Black', hex: '#374151' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    elasticWaistband: true
  },
  {
    id: 'mm-02',
    name: 'Breezy Kids Casual Cotton Shirt',
    category: 'cotton-shirts',
    categoryLabel: 'Casual Cotton Shirts',
    price: 21.99,
    originalPrice: 28.00,
    rating: 4.8,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1503944547468-b65924483ce8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Lightweight, ultra-breathable casual cotton shirt tailored with playful detailing. Ideal for warm sunny days, school events, or birthday parties. Pre-shrunk pure cotton ensures zero itching.',
    highlights: [
      '100% Breathable Combed Cotton',
      'Smooth pearlized buttons with pinch-safe button placket',
      'Relaxed comfort collar that never irritates the neck',
      'Roll-up sleeve tabs with button secures'
    ],
    fabric: '100% Pure Organic Combed Cotton',
    careInstructions: 'Machine wash gentle with similar colors. Warm iron if desired.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Sky Blue', hex: '#60A5FA' },
      { name: 'Crisp White', hex: '#F3F4F6' },
      { name: 'Coral Red', hex: '#EF4444' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    elasticWaistband: false
  },
  {
    id: 'mm-03',
    name: 'Boys Urban Chino & Pique Polo Fashion Set',
    category: 'boys-fashion',
    categoryLabel: 'Boys Fashion Wear',
    price: 36.99,
    originalPrice: 48.00,
    rating: 5.0,
    reviewCount: 114,
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A sharp, stylish 2-piece modern ensemble featuring a tipped pique polo and stretch-cotton twill chinos. Designed with an adjustable inner button waistband so your boy can stay comfortable all day.',
    highlights: [
      'Pre-matched coordinated look for effortless morning dressing',
      'Internal button-hole elastic waistband adjusts up to 2 inches',
      'High-density embroidery crest on chest',
      'Twill chinos with deep side pockets'
    ],
    fabric: 'Top: 100% Pique Cotton | Bottom: 97% Cotton, 3% Elastane',
    careInstructions: 'Wash before wear. Cold water wash, gentle cycle.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Navy & Khaki', hex: '#1E3A8A' },
      { name: 'Crimson & Olive', hex: '#DC2626' }
    ],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    elasticWaistband: true
  },
  {
    id: 'mm-04',
    name: 'Trendy Children Safari Adventure Outfit',
    category: 'trendy-outfits',
    categoryLabel: "Trendy Children's Outfits",
    price: 34.50,
    originalPrice: 45.00,
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Get ready for unforgettable play dates! This trendy coordinate set features a camp collar safari shirt and matching drawstring shorts crafted from soft woven cotton that holds up through every outdoor exploration.',
    highlights: [
      'Matching two-piece explorer set with contrast buttons',
      'Elasticized waistband with functional braided drawcord',
      'Twin front chest utility pockets',
      'Vibrant colorfast dyes that never fade in the wash'
    ],
    fabric: '100% Soft Touch Washed Cotton',
    careInstructions: 'Machine wash warm, tumble dry medium.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Sand Khaki', hex: '#D97706' },
      { name: 'Sage Green', hex: '#059669' },
      { name: 'Ocean Navy', hex: '#1D4ED8' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    elasticWaistband: true
  },
  {
    id: 'mm-05',
    name: 'Rugged Ripstop Kids Cargo Shorts with Stretch Waist',
    category: 'denim-cargo',
    categoryLabel: 'Denim Cargo Shorts',
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Built for tree climbing, running, and spontaneous weekend adventures. Fitted with a soft ribbed waistband that prevents digging or red marks on sensitive skin.',
    highlights: [
      'Reinforced bar-tack stitching on all 6 pockets',
      'Full elastic waistband with inner stretch panel',
      'Easy pull-on design for independent toddler & child dressing',
      'Fade-resistant color finish'
    ],
    fabric: '98% Cotton Canvas, 2% Elastane',
    careInstructions: 'Machine wash cold, do not dry clean.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Desert Camel', hex: '#B45309' },
      { name: 'Classic Indigo', hex: '#1E40AF' },
      { name: 'Charcoal', hex: '#4B5563' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    elasticWaistband: true
  },
  {
    id: 'mm-06',
    name: 'Boys Oxford Button-Down Casual Shirt',
    category: 'cotton-shirts',
    categoryLabel: 'Casual Cotton Shirts',
    price: 23.50,
    originalPrice: 30.00,
    rating: 4.7,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503944547468-b65924483ce8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A timeless wardrobe essential with a relaxed fit. Soft-washed Oxford cotton feels smooth right out of the box, perfect for family dinners or smart casual days.',
    highlights: [
      'Garment-washed for ultra-soft hand feel',
      'Button-down collar stays neat all day',
      'Chest patch pocket with Mani Minars signature embroidered tab',
      'Shirttail hem looks great tucked or untucked'
    ],
    fabric: '100% Premium Long-Staple Cotton',
    careInstructions: 'Machine wash warm, tumble dry low.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Nautical Navy', hex: '#1E3A8A' },
      { name: 'Candy Pink', hex: '#F43F5E' },
      { name: 'Classic Blue Stripe', hex: '#3B82F6' }
    ],
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
    elasticWaistband: false
  },
  {
    id: 'mm-07',
    name: 'Boys Varsity Bomber & Jogger Fashion Set',
    category: 'boys-fashion',
    categoryLabel: 'Boys Fashion Wear',
    price: 39.99,
    originalPrice: 52.00,
    rating: 4.9,
    reviewCount: 103,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-energy streetwear look for cool kids. Includes a snap-button varsity lightweight bomber jacket paired with tapered French terry joggers with flexible ribbed cuffs.',
    highlights: [
      'Soft brushed French terry cotton interior',
      'Snap front closure made easy for little hands',
      'Deep zipper side pockets to keep treasures safe',
      'Reinforced knee panels prevent worn-out holes'
    ],
    fabric: '85% Cotton, 15% Polyester Poly-Cotton Fleece',
    careInstructions: 'Machine wash cold with like colors. Do not iron prints.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Navy & Crimson', hex: '#1E3A8A' },
      { name: 'Heather Grey', hex: '#9CA3AF' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    elasticWaistband: true
  },
  {
    id: 'mm-08',
    name: 'Trendy Sunny Day Linen-Blend Playwear Outfit',
    category: 'trendy-outfits',
    categoryLabel: "Trendy Children's Outfits",
    price: 29.99,
    originalPrice: 38.00,
    rating: 4.8,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503944547468-b65924483ce8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Breathable, relaxed summer coordination set with a Cuban camp collar shirt and matching tailored shorts with an expandable waistband.',
    highlights: [
      'Linen-cotton blend keeps kids cool in hot weather',
      'Full elastic back waistband ensures custom flexible fit',
      'Coconut wood buttons add premium boutique charm',
      'Machine washable and becomes softer after every wash'
    ],
    fabric: '60% Organic Cotton, 40% Natural Linen',
    careInstructions: 'Machine wash cold on gentle cycle, line dry in shade.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Natural Sand', hex: '#E5E7EB' },
      { name: 'Terracotta Red', hex: '#B91C1C' },
      { name: 'Coastal Blue', hex: '#2563EB' }
    ],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    elasticWaistband: true
  }
];
