export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number; // e.g. 4.95
  reviewsCount: number; // e.g. 142
  dealsCount: number; // e.g. 210
  isVerified: boolean; // паспорт / госуслуги
  responseTime: string; // 'около 5 минут'
  registeredYear: number; // e.g. 2021
  onlineStatus: 'online' | 'offline';
}

export type StorefrontMode = 'classic' | 'digital' | 'all';

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
  isSafeDeal: boolean; // Полка Защита (Escrow)
  deliveryType: 'delivery' | 'pickup' | 'instant_digital';
  isVip?: boolean;
  isUrgent?: boolean;
  seller: Seller;
  specs: Record<string, string>;
  // Digital specific attributes
  isDigital?: boolean;
  platform?: string; // 'Steam' | 'Telegram' | 'Roblox' | 'PlayStation' | 'Xbox' | 'AI / Сервисы' | 'Windows'
  region?: string; // 'Global' | 'RU/СНГ' | 'Турция (TR)' | 'Казахстан (KZ)' | 'США (US)'
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories: string[];
  isDigitalOnly?: boolean;
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
  quickFilter?: string; // 'safe_deal' | 'instant' | 'free' | 'vip' | 'top_rated'
  // Hybrid Storefront Mode
  storefrontMode: StorefrontMode;
  digitalPlatform?: string;
  digitalRegion?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'seller' | 'system';
  text: string;
  timestamp: string;
  isDealEvent?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'deal' | 'message' | 'system';
  read: boolean;
}
