export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number; // e.g. 4.9
  reviewsCount: number; // e.g. 142
  dealsCount: number; // e.g. 210
  isVerified: boolean; // паспорт / госуслуги / верификация
  responseTime: string; // 'около 5 минут'
  registeredYear: number; // e.g. 2021
  onlineStatus: 'online' | 'offline';
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  subcategory?: string;
  city: string;
  metro?: string;
  date: string;
  views: number;
  description: string;
  images: string[];
  condition: 'new' | 'perfect' | 'used' | 'digital';
  isSafeDeal: boolean; // Безопасная сделка / Escrow
  deliveryType: 'delivery' | 'pickup' | 'instant_digital';
  isVip?: boolean;
  isUrgent?: boolean;
  seller: Seller;
  specs: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  city: string;
  minPrice?: number;
  maxPrice?: number;
  onlySafeDeal: boolean;
  condition: string;
  sortBy: 'date_desc' | 'price_asc' | 'price_desc' | 'rating_desc';
}

export interface Message {
  id: string;
  sender: 'user' | 'seller' | 'system';
  text: string;
  timestamp: string;
  isDealEvent?: boolean;
}
