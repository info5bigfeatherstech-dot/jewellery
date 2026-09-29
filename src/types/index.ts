export type CategorySlug = 
  | 'rings' 
  | 'necklaces' 
  | 'earrings' 
  | 'bracelets' 
  | 'bangles' 
  | 'pendants' 
  | 'bridal' 
  | 'mens';

export type MaterialType = 
  | '18k-yellow-gold' 
  | '18k-white-gold' 
  | '18k-rose-gold' 
  | 'platinum' 
  | 'diamond' 
  | 'pearl' 
  | 'emerald' 
  | 'sapphire'
  | 'silk'
  | 'gemstone';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: CategorySlug;
  categoryName: string;
  material: string;
  materialCode: MaterialType;
  karat?: string;
  gemstone?: string;
  description: string;
  story: string;
  details: string[];
  careInstructions: string[];
  shippingInfo: string;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  availableSizes?: string[];
  inStock: boolean;
}

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export interface Occasion {
  id: string;
  name: string;
  description: string;
  image: string;
  curatedCount: number;
  tagline: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  colorHex: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  piecePurchased: string;
  rating: number;
  date: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  size: 'tall' | 'wide' | 'standard';
  hotspot?: {
    x: number; // percentage
    y: number; // percentage
    productId: string;
    productName: string;
    productPrice: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface FilterState {
  category: string;
  materials: MaterialType[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest';
  inStockOnly: boolean;
}
