export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string | string[];
  category: string;
  tag?: string;
  description?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  // FIX: Add missing 'icon' property to the Category interface.
  icon: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  image: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface Benefit {
    icon: string;
    title: string;
    subtitle: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

export interface User {
  name: string;
  email: string;
}

export interface UserEvent {
  type: 'VIEW_PRODUCT' | 'ADD_TO_CART' | 'ADD_FAVORITE' | 'VIEW_CATEGORY';
  payload: {
    id: number | string;
    name: string;
  };
  timestamp: string;
}

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  date: string;
}

export interface AdConfig {
  id: string;
  type: 'brand' | 'product';
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  link: string;
  themeColor: 'yellow-orange'; // Can be expanded later
  logo: {
    TYPE: 'icon' | 'image';
    IMAGE_URL?: string;
    ICON?: string;
    SHAPE?: 'circle' | 'square';
    BACKGROUND_COLOR?: string;
    TEXT_COLOR?: string;
  };
  productImage?: string;
}