export type AgeSize = 
  | '1-2 Years'
  | '2-3 Years'
  | '3-4 Years'
  | '4-5 Years'
  | '5-6 Years'
  | '6-7 Years'
  | '7-8 Years'
  | '8-9 Years'
  | '9-10 Years'
  | '11-12 Years';

export const ALL_SIZES: AgeSize[] = [
  '1-2 Years',
  '2-3 Years',
  '3-4 Years',
  '4-5 Years',
  '5-6 Years',
  '6-7 Years',
  '7-8 Years',
  '8-9 Years',
  '9-10 Years',
  '11-12 Years',
];

export const WHATSAPP_NUMBER = '923046466815';
export const WHATSAPP_DISPLAY = '+92 304 6466815';
export const STORE_EMAIL = 'maniminarskids@gmail.com';

export type ProductCategory = 
  | 'all'
  | 'denim-cargo'
  | 'cotton-shirts'
  | 'boys-fashion'
  | 'trendy-outfits';

export interface Product {
  id: string;
  name: string;
  category: 'denim-cargo' | 'cotton-shirts' | 'boys-fashion' | 'trendy-outfits';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  highlights: string[];
  fabric: string;
  careInstructions: string;
  availableSizes: AgeSize[];
  colors: { name: string; hex: string }[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  elasticWaistband?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: AgeSize;
  selectedColor: string;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: AgeSize;
  color: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'cod' | 'card' | 'wallet';
  status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  childAge: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productPurchased: string;
}
