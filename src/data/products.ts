import { Product, ALL_SIZES } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mm-01',
    name: 'Kids Denim Cargo Shorts with Elastic Waistband',
    category: 'denim-collection',
    categoryLabel: 'Denim Collection',
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviewCount: 148,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Engineered for playground agility and weekend adventures! Features super-soft stretch-infused denim fabric with a soft ribbed elastic waistband and functional drawstrings that easily adapt to your growing child.',
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
      { name: 'Faded Slate', hex: '#374151' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    inStock: true,
    stockQuantity: 45,
    elasticWaistband: true,
    gender: 'unisex'
  },
  {
    id: 'mm-02',
    name: 'Breezy Kids Casual Cotton Shirt',
    category: 'casual-wear',
    categoryLabel: 'Casual Wear',
    price: 21.99,
    originalPrice: 28.00,
    rating: 4.8,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Lightweight, ultra-breathable casual cotton shirt tailored with playful detailing. Ideal for warm sunny days, school outings, or family celebrations. Pre-shrunk pure cotton ensures zero skin itching.',
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
      { name: 'Crisp White', hex: '#F9FAFB' },
      { name: 'Sunset Coral', hex: '#F87171' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    isCasualShirt: true,
    inStock: true,
    stockQuantity: 32,
    elasticWaistband: false,
    gender: 'boys'
  },
  {
    id: 'mm-03',
    name: 'Boys Urban Chino & Pique Polo Fashion Set',
    category: 'boys-collection',
    categoryLabel: 'Boys Collection',
    price: 34.99,
    originalPrice: 45.00,
    rating: 4.9,
    reviewCount: 116,
    images: [
      'https://images.unsplash.com/photo-1560506840-ec148e82a604?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Sharp, versatile 2-piece coordination set for smart boys. Combines a breathable honeycomb cotton pique polo shirt with tailored stretch chinos equipped with an internal adjustable waistband.',
    highlights: [
      'Hidden interior elastic button-hole waist adjuster',
      'Reinforced bar-tack pocket corners for heavy play',
      'Breathable pique knit retains vibrant color after 50+ washes',
      'Double-ply reinforced knee panels'
    ],
    fabric: 'Polo: 100% Pique Cotton | Chinos: 97% Cotton Twill, 3% Elastane',
    careInstructions: 'Machine wash warm, tumble dry medium.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Navy & Khaki', hex: '#1E3A8A' },
      { name: 'Burgundy & Olive', hex: '#831843' },
      { name: 'Royal Blue & Stone', hex: '#1D4ED8' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockQuantity: 18,
    elasticWaistband: true,
    gender: 'boys'
  },
  {
    id: 'mm-04',
    name: 'Girls Floral Meadow Tiered Cotton Dress',
    category: 'girls-collection',
    categoryLabel: 'Girls Collection',
    price: 28.99,
    originalPrice: 38.00,
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A charming, twirl-ready tiered cotton dress adorned with gentle hand-drawn botanical blossoms. Crafted from gossamer-soft pure cotton with an elasticated smocked bodice for effortless all-day comfort.',
    highlights: [
      'Ultra-soft smocked elastic chest that grows with your girl',
      'Lined with 100% skin-safe breathable voile',
      'Delicate flutter cap sleeves with zero tight armholes',
      'Fade-resistant hypoallergenic organic dyes'
    ],
    fabric: '100% Premium Cotton Voile with Soft Cotton Lining',
    careInstructions: 'Machine wash delicate cycle in cold water. Hang to dry.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Blush Rose', hex: '#FB7185' },
      { name: 'Buttercup Yellow', hex: '#FDE047' },
      { name: 'Mint Meadow', hex: '#6EE7B7' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    inStock: true,
    stockQuantity: 24,
    elasticWaistband: true,
    gender: 'girls'
  },
  {
    id: 'mm-05',
    name: 'Summer Safari Camp Collar 2-Piece Set',
    category: 'new-arrivals',
    categoryLabel: 'New Arrivals',
    price: 29.99,
    originalPrice: 39.00,
    rating: 4.8,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Fresh for the 2026 season! Cuban camp-collar safari shirt matched with elastic drawcord adventure shorts. Effortless summer dressing made from natural cotton linen weave.',
    highlights: [
      'Relaxed vacation fit keeps active kids cool in heat',
      '360° elastic comfort waistband with woven drawstring',
      'Deep side pockets for playground discoveries',
      'Lightweight, crease-friendly relaxed texture'
    ],
    fabric: '65% Organic Cotton, 35% Pure Linen',
    careInstructions: 'Machine wash cold on gentle cycle, warm iron.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Safari Beige', hex: '#D1D5DB' },
      { name: 'Terracotta Rust', hex: '#B91C1C' },
      { name: 'Ocean Navy', hex: '#1E3A8A' }
    ],
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    inStock: true,
    stockQuantity: 35,
    elasticWaistband: true,
    gender: 'unisex'
  },
  {
    id: 'mm-06',
    name: 'Junior Dapper Blazer & Tailored Trouser Party Set',
    category: 'party-wear',
    categoryLabel: 'Party Wear',
    price: 44.99,
    originalPrice: 58.00,
    rating: 5.0,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519764622345-23439dd774f7?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Exceptional celebration attire for weddings, Eid, and birthday banquets. A softly structured lightweight blazer accompanied by smart stretch trousers with an elastic back panel for dinner comfort.',
    highlights: [
      'Concealed elastic waist panel prevents tight belly pinching',
      'Breathable satin-smooth inner lining for smooth layering',
      'Includes detachable silk-touch pocket square',
      'Crease-resistant luxury cotton blend'
    ],
    fabric: '80% Combed Cotton, 20% Polyester Luxury Weave',
    careInstructions: 'Dry clean recommended or gentle hand wash cold.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Midnight Navy', hex: '#0F172A' },
      { name: 'Charcoal Grey', hex: '#334155' },
      { name: 'Royal Crimson', hex: '#991B1B' }
    ],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockQuantity: 4, // Low stock for alerts
    elasticWaistband: true,
    gender: 'boys'
  },
  {
    id: 'mm-07',
    name: 'Girls Starlight Shimmer Party Dress',
    category: 'party-wear',
    categoryLabel: 'Party Wear',
    price: 36.99,
    originalPrice: 48.00,
    rating: 4.9,
    reviewCount: 75,
    images: [
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Festive dreams come true! Multi-layered soft tulle skirt over 100% skin-safe cotton lining with delicate shimmer detailing. No itchy metallic threads touch your child’s body.',
    highlights: [
      'Zero-itch guarantee with 100% pure cotton body lining',
      'Flexible elasticated back waist for all-day party play',
      'Hidden smooth back zipper with protective fabric flap',
      'High-density sparkle that will not shed in the wash'
    ],
    fabric: 'Shell: Fine Sparkle Tulle | Lining: 100% Breathable Cotton',
    careInstructions: 'Hand wash cold inside out, hang to dry.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Starlight Silver', hex: '#E2E8F0' },
      { name: 'Princess Ruby', hex: '#E11D48' },
      { name: 'Sapphire Navy', hex: '#1E3A8A' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockQuantity: 15,
    elasticWaistband: true,
    gender: 'girls'
  },
  {
    id: 'mm-08',
    name: 'Boys Varsity Bomber & Jogger Fashion Set',
    category: 'boys-collection',
    categoryLabel: 'Boys Collection',
    price: 39.99,
    originalPrice: 52.00,
    rating: 4.9,
    reviewCount: 103,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'High-energy streetwear look for active young boys. Includes an easy snap-button varsity jacket paired with tapered French terry joggers featuring flexible ribbed elastic cuffs.',
    highlights: [
      'Soft brushed French terry cotton interior for cozy warmth',
      'Snap front closure engineered easy for small hands',
      'Deep zipper side pockets to keep treasures safe',
      'Reinforced knee panels prevent playground holes'
    ],
    fabric: '85% Cotton, 15% Poly Fleece',
    careInstructions: 'Machine wash cold with like colors.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Navy & Crimson', hex: '#1E3A8A' },
      { name: 'Heather Grey & Black', hex: '#64748B' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockQuantity: 3, // Low stock alert!
    elasticWaistband: true,
    gender: 'boys'
  },
  {
    id: 'mm-09',
    name: 'Kids Washed Denim Adventure Jacket',
    category: 'denim-collection',
    categoryLabel: 'Denim Collection',
    price: 32.99,
    originalPrice: 42.00,
    rating: 4.9,
    reviewCount: 68,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The iconic childhood jacket reimagined for supreme comfort. Made from vintage stonewashed flexible denim with soft stretch knit side inserts for full playground mobility.',
    highlights: [
      'Pre-softened washed cotton denim with zero stiffness',
      'Signature Mani Minars brass-tone snap buttons',
      'Inner chest patch pocket for personal belongings',
      'Double-stitched durable stress points'
    ],
    fabric: '99% Combed Cotton, 1% Spandex Denim',
    careInstructions: 'Machine wash cold with similar dark colors.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Classic Blue Wash', hex: '#2563EB' },
      { name: 'Deep Indigo', hex: '#1E3A8A' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockQuantity: 22,
    elasticWaistband: false,
    gender: 'unisex'
  },
  {
    id: 'mm-10',
    name: 'Girls Pastel Ribbed Top & Culottes Play Set',
    category: 'girls-collection',
    categoryLabel: 'Girls Collection',
    price: 26.99,
    originalPrice: 35.00,
    rating: 4.8,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A stylish 2-piece everyday set. Featuring a lettuce-edge ribbed baby-tee and wide-leg airy culottes with an expandable elastic waistband and matching cloth belt.',
    highlights: [
      'Super-stretchy cloud-soft ribbed modal cotton blend',
      'Extra-wide gentle waistband leaves no red marks',
      'Wide-leg silhouette allows free running and jumping',
      'Resistant to pilling even after frequent cycles'
    ],
    fabric: '95% Organic Cotton, 5% Elastane Ribbed Knit',
    careInstructions: 'Machine wash cold delicate, line dry.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Lilac Mist', hex: '#C084FC' },
      { name: 'Sage Green', hex: '#86EFAC' },
      { name: 'Warm Peach', hex: '#FDBA74' }
    ],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockQuantity: 29,
    elasticWaistband: true,
    gender: 'girls'
  },
  {
    id: 'mm-11',
    name: 'Everyday Organic Cotton Striped Play Tee & Shorts',
    category: 'casual-wear',
    categoryLabel: 'Casual Wear',
    price: 19.99,
    originalPrice: 26.00,
    rating: 4.8,
    reviewCount: 134,
    images: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The definitive daily wardrobe staple for nursery, school, and park play. Yarn-dyed Breton stripes paired with French terry athletic shorts with drawstring waist.',
    highlights: [
      'Pure organic long-staple cotton jersey',
      'Soft ribbed neckband retains shape without stretching out',
      'Tagless neck label prevents itchy complaints',
      'Bar-tacked deep pocket pockets'
    ],
    fabric: '100% GOTS Certified Organic Cotton',
    careInstructions: 'Machine wash warm, tumble dry low.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Nautical Navy Stripe', hex: '#1E3A8A' },
      { name: 'Crimson Red Stripe', hex: '#DC2626' },
      { name: 'Forest Green Stripe', hex: '#166534' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockQuantity: 50,
    elasticWaistband: true,
    gender: 'unisex'
  },
  {
    id: 'mm-12',
    name: 'Comfort Stretch Denim Joggers with Ribbed Waistband',
    category: 'denim-collection',
    categoryLabel: 'Denim Collection',
    price: 27.99,
    originalPrice: 36.00,
    rating: 4.9,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The cool look of real denim combined with the flexibility and ease of sweatpants. Features thick ribbed elastic waistband with drawstrings and tapered ankle cuffs.',
    highlights: [
      'Internal cotton jersey waistband lining for cloud-like comfort',
      '4-way flex denim enables easy climbing and running',
      'Room-to-grow expandable elastic fits across growth spurts',
      'Double reinforced knee darts for high durability'
    ],
    fabric: '92% Cotton, 6% Polyester, 2% Spandex Knit Denim',
    careInstructions: 'Machine wash cold inside out, tumble dry low.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Medium Indigo', hex: '#2563EB' },
      { name: 'Washed Charcoal', hex: '#1F2937' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockQuantity: 2, // Low stock alert!
    elasticWaistband: true,
    gender: 'unisex'
  },
  {
    id: 'mm-13',
    name: 'Boys Classic Oxford Cotton Button-Down Casual Shirt',
    category: 'casual-wear',
    categoryLabel: 'Casual Wear',
    price: 23.99,
    originalPrice: 30.00,
    rating: 4.9,
    reviewCount: 84,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1560506840-ec148e82a604?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Crisp, timeless Oxford weave cotton shirt tailored for active young boys. Features a flexible button-down collar, breathable weave, and rollable sleeves with neat button tabs. A staple for boys fashion in Pakistan.',
    highlights: [
      '100% Combed Oxford Cotton weave',
      'Anti-chafe collar with tag-free neckline',
      'Reinforced button stitching designed for active boys',
      'Roll-up sleeve button tabs for easy casual styling'
    ],
    fabric: '100% Premium Long-Staple Oxford Cotton',
    careInstructions: 'Machine wash warm, tumble dry gentle. Warm iron if required.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Classic Sky', hex: '#60A5FA' },
      { name: 'Pure White', hex: '#F9FAFB' },
      { name: 'Soft Navy', hex: '#1E3A8A' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    isCasualShirt: true,
    inStock: true,
    stockQuantity: 28,
    elasticWaistband: false,
    gender: 'boys'
  },
  {
    id: 'mm-14',
    name: 'Kids Vacation Resort Camp-Collar Casual Shirt',
    category: 'casual-wear',
    categoryLabel: 'Casual Wear',
    price: 22.99,
    originalPrice: 29.00,
    rating: 4.8,
    reviewCount: 61,
    images: [
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Breezy and relaxed Cuban collar casual shirt crafted in lightweight natural cotton-linen blend. Ideal for summer play, family dinners, and weekend trips.',
    highlights: [
      'Relaxed vacation fit keeps kids cool in high temperatures',
      'Open camp collar eliminates tight neck pressure',
      'Smooth coconut-look buttons with durable fastening',
      'Hypoallergenic wash with zero harsh chemical softeners'
    ],
    fabric: '70% Combed Cotton, 30% Linen',
    careInstructions: 'Machine wash cold gentle, hang dry.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Desert Sand', hex: '#D1D5DB' },
      { name: 'Tropical Navy', hex: '#1E3A8A' },
      { name: 'Sage Leaf', hex: '#86EFAC' }
    ],
    isNewArrival: true,
    isBestSeller: false,
    isCasualShirt: true,
    inStock: true,
    stockQuantity: 34,
    elasticWaistband: false,
    gender: 'unisex'
  },
  {
    id: 'mm-15',
    name: 'Kids Ripstop Denim Shorts with Ribbon Elastic Waist',
    category: 'denim-collection',
    categoryLabel: 'Denim Collection',
    price: 25.99,
    originalPrice: 34.00,
    rating: 4.9,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Designed for playground agility! High-flex washed denim cargo shorts fitted with a wide ribbed elastic waistband and drawstring that adapt seamlessly to growing kids from 1 to 12 Years.',
    highlights: [
      'Wide ribbed elastic waistband with soft interior lining',
      'Dual utility cargo flap pockets with secure closures',
      'Reinforced seat & knee stitching prevents tears',
      'Pre-washed flexible denim with zero stiff feeling'
    ],
    fabric: '98% Cotton, 2% Spandex Flex Denim',
    careInstructions: 'Machine wash cold inside out, tumble dry low.',
    availableSizes: [...ALL_SIZES],
    colors: [
      { name: 'Vintage Stone', hex: '#3B82F6' },
      { name: 'Deep Indigo', hex: '#1E3A8A' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockQuantity: 40,
    elasticWaistband: true,
    gender: 'unisex'
  }
];
