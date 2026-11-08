import React, { useState, useEffect, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  CategoriesBar 
} from './components/CategoriesBar';
import { 
  FilterSidebar 
} from './components/FilterSidebar';
import { 
  ListingCard 
} from './components/ListingCard';
import { 
  ListingModal 
} from './components/ListingModal';
import { 
  CreateListingModal 
} from './components/CreateListingModal';
import { 
  SafeDealModal 
} from './components/SafeDealModal';
import { 
  ChatModal 
} from './components/ChatModal';
import { 
  HowItWorksModal 
} from './components/HowItWorksModal';
import { 
  UserProfileModal 
} from './components/UserProfileModal';
import {
  MobileFilterDrawer
} from './components/MobileFilterDrawer';

import { INITIAL_LISTINGS, CLASSIC_CATEGORIES, DIGITAL_CATEGORIES } from './data/mockData';
import { Listing, FilterState, StorefrontMode } from './types';
import { 
  Sparkles, 
  Layers, 
  Heart, 
  PlusCircle, 
  User, 
  Home, 
  ShieldCheck, 
  SearchX,
  Bell,
  LayoutGrid,
  List,
  Zap,
  Gift,
  Star,
  ShoppingBag,
  Gamepad2,
  Key,
  Coins,
  ArrowUp
} from 'lucide-react';

export const App: React.FC = () => {
  // Clear any legacy storage
  useEffect(() => {
    try {
      localStorage.removeItem('legacy_listings');
      localStorage.removeItem('legacy_favorites');
    } catch (e) {}
  }, []);

  // Theme state: default true (Dark luxury theme)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Listings state (stored in localStorage under polka brand)
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('polka_listings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_LISTINGS;
  });

  useEffect(() => {
    localStorage.setItem('polka_listings', JSON.stringify(listings));
  }, [listings]);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('polka_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return ['item-digital-1', 'item-1'];
  });

  useEffect(() => {
    localStorage.setItem('polka_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    city: 'Все города',
    minPrice: undefined,
    maxPrice: undefined,
    onlySafeDeal: false,
    condition: 'all',
    sortBy: 'date_desc',
    quickFilter: undefined,
    storefrontMode: 'classic', // 'classic' | 'digital'
    digitalPlatform: undefined,
    digitalRegion: undefined
  });

  // View mode: grid vs list
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Views & Modals
  const [viewOnlyFavorites, setViewOnlyFavorites] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatListing, setChatListing] = useState<Listing | null>(null);
  const [isSafeDealOpen, setIsSafeDealOpen] = useState(false);
  const [safeDealListing, setSafeDealListing] = useState<Listing | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Убрано из избранного');
        return prev.filter(item => item !== id);
      } else {
        showToast('Добавлено в избранное ❤️');
        return [...prev, id];
      }
    });
  };

  const handleCreateListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    showToast('Лот успешно выставлен на Полку! 🎉');
  };

  const handleStartSafeDeal = (listing: Listing) => {
    setSafeDealListing(listing);
    setIsSafeDealOpen(true);
  };

  const handleOpenChat = (listing?: Listing) => {
    setChatListing(listing || listings[0]);
    setIsChatOpen(true);
  };

  const handleCompleteDeal = (listing: Listing) => {
    showToast(`Безопасная сделка по «${listing.title}» успешно завершена! 🛡️`);
  };

  const handleModeChange = (mode: StorefrontMode) => {
    setFilters(prev => ({
      ...prev,
      storefrontMode: mode,
      category: mode === 'digital' ? 'digital_all' : 'all',
      digitalPlatform: undefined,
      digitalRegion: undefined,
      quickFilter: undefined
    }));
    setViewOnlyFavorites(false);

    if (mode === 'digital') {
      showToast('Открыт каталог «ПОЛКА Digital»: Игры, подписки и софт ⚡');
    } else if (mode === 'classic') {
      showToast('Открыта Городская витрина: Вещи, авто и недвижимость 🏬');
    } else {
      showToast('Отображаются все лоты маркетплейса 🌐');
    }
  };

  const handleResetFilters = () => {
    setFilters(prev => ({
      searchQuery: '',
      category: prev.storefrontMode === 'digital' ? 'digital_all' : 'all',
      city: 'Все города',
      minPrice: undefined,
      maxPrice: undefined,
      onlySafeDeal: false,
      condition: 'all',
      sortBy: 'date_desc',
      quickFilter: undefined,
      storefrontMode: prev.storefrontMode,
      digitalPlatform: undefined,
      digitalRegion: undefined
    }));
    setViewOnlyFavorites(false);
  };

  const handleQuickFilterToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      quickFilter: prev.quickFilter === tag ? undefined : tag
    }));
  };

  // Filter and sort listings with HYBRID separation
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      const isItemDigital = item.isDigital || item.category.startsWith('digital_');

      // 1. Separate based on storefrontMode:
      if (filters.storefrontMode === 'classic' && isItemDigital) {
        return false;
      }
      if (filters.storefrontMode === 'digital' && !isItemDigital) {
        return false;
      }

      // 2. Favorites filter
      if (viewOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }

      // 3. Category filter
      if (filters.category !== 'all' && filters.category !== 'digital_all') {
        if (item.category !== filters.category) {
          return false;
        }
      }

      // 4. Digital specific filters (Platform & Region)
      if (filters.storefrontMode === 'digital') {
        if (filters.digitalPlatform && item.platform !== filters.digitalPlatform) {
          return false;
        }
        if (filters.digitalRegion && item.region !== filters.digitalRegion) {
          return false;
        }
      }

      // 5. City filter (only for classic physical goods)
      if (filters.storefrontMode !== 'digital') {
        if (filters.city !== 'Все города' && item.city !== 'Все города' && item.city !== filters.city) {
          return false;
        }
      }

      // 6. Safe Deal filter
      if (filters.onlySafeDeal && !item.isSafeDeal) {
        return false;
      }

      // 7. Condition filter (only for classic physical goods)
      if (filters.storefrontMode !== 'digital' && filters.condition !== 'all' && item.condition !== filters.condition) {
        return false;
      }

      // 8. Price range
      if (filters.minPrice !== undefined && item.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && item.price > filters.maxPrice) {
        return false;
      }

      // 9. Quick filter chips
      if (filters.quickFilter === 'safe_deal' && !item.isSafeDeal) {
        return false;
      }
      if (filters.quickFilter === 'instant' && item.deliveryType !== 'instant_digital') {
        return false;
      }
      if (filters.quickFilter === 'free' && item.price > 0) {
        return false;
      }
      if (filters.quickFilter === 'vip' && !item.isVip && !item.isUrgent) {
        return false;
      }
      if (filters.quickFilter === 'top_rated' && item.seller.rating < 4.95) {
        return false;
      }
      if (filters.quickFilter === 'subs' && item.category !== 'digital_subs') {
        return false;
      }
      if (filters.quickFilter === 'accounts' && item.category !== 'digital_accounts') {
        return false;
      }
      if (filters.quickFilter === 'currency' && item.category !== 'digital_currency') {
        return false;
      }

      // 10. Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchPlatform = (item.platform || '').toLowerCase().includes(query);
        const matchSubcat = (item.subcategory || '').toLowerCase().includes(query);
        const matchCity = item.city.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchPlatform && !matchSubcat && !matchCity) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price_desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating_desc') {
        return b.seller.rating - a.seller.rating;
      }
      return 0;
    });
  }, [listings, filters, favorites, viewOnlyFavorites]);

  const myListings = useMemo(() => {
    return listings.filter(item => item.seller.id === 'current-user');
  }, [listings]);

  const currentCategories = filters.storefrontMode === 'digital' ? DIGITAL_CATEGORIES : CLASSIC_CATEGORIES;

  return (
    <div className="min-h-screen flex flex-col bg-[#070a13] text-slate-100 transition-colors pb-16 md:pb-0 relative overflow-x-hidden">
      {/* Ambient Atmospheric Luxury Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-32 left-1/4 w-[550px] h-[350px] rounded-full blur-[140px] opacity-20 transition-all duration-700 ${
          filters.storefrontMode === 'digital' ? 'bg-purple-600' : 'bg-blue-600'
        }`} />
        <div className={`absolute top-24 right-5 w-[450px] h-[300px] rounded-full blur-[160px] opacity-20 transition-all duration-700 ${
          filters.storefrontMode === 'digital' ? 'bg-cyan-500' : 'bg-indigo-600'
        }`} />
      </div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 px-4 py-3 rounded-2xl bg-[#101726] text-white border border-[#1f2d47] shadow-2xl shadow-blue-500/20 flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-in slide-in-from-bottom-5">
          <Bell className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Hybrid Mode Switcher */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
        selectedCity={filters.city}
        onCityChange={(city) => setFilters(prev => ({ ...prev, city }))}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setViewOnlyFavorites(!viewOnlyFavorites)}
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenChat={() => handleOpenChat(listings[0])}
        onSelectCategory={(catId) => setFilters(prev => ({ ...prev, category: catId }))}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        storefrontMode={filters.storefrontMode}
        onModeChange={handleModeChange}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
      />

      {/* Categories Bar with Storefront Mode Switcher */}
      <CategoriesBar
        categories={currentCategories}
        selectedCategory={filters.category}
        onSelectCategory={(id) => {
          setViewOnlyFavorites(false);
          setFilters(prev => ({ ...prev, category: id }));
        }}
        storefrontMode={filters.storefrontMode}
        onModeChange={handleModeChange}
        selectedPlatform={filters.digitalPlatform}
        onSelectPlatform={(plat) => setFilters(prev => ({ ...prev, digitalPlatform: plat }))}
      />

      {/* Hero Banner: Full for Desktop, Slim Ticker for Mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2.5 sm:pt-3 w-full">
        {/* Mobile Slim Ticker (sm:hidden) */}
        <div className="sm:hidden">
          {filters.storefrontMode === 'digital' ? (
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-[#0e1628] border border-purple-500/30 flex items-center justify-between text-xs shadow-md">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Автовыдача 0 сек • Гарант 100%</span>
              </span>
              <button
                onClick={() => setIsHowItWorksOpen(true)}
                className="text-[10px] text-purple-300 underline font-medium"
              >
                Гарантии
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-950/90 via-indigo-950/90 to-[#0e1628] border border-blue-500/30 flex items-center justify-between text-xs shadow-md">
              <span className="flex items-center gap-1.5 text-blue-300 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Escrow защита • Осмотр в ПВЗ</span>
              </span>
              <button
                onClick={() => setIsHowItWorksOpen(true)}
                className="text-[10px] text-blue-300 underline font-medium"
              >
                Как работает
              </button>
            </div>
          )}
        </div>

        {/* Desktop Full Hero Banner (hidden sm:block) */}
        <div className="hidden sm:block">
          {filters.storefrontMode === 'digital' ? (
            /* DIGITAL COMPACT HERO BANNER */
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#170e2b] via-[#21123d] to-[#0c1829] border border-purple-500/30 text-white shadow-xl shadow-purple-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
              <div className="space-y-1 z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 text-cyan-300 text-[10px] font-black border border-purple-400/40 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-cyan-300 animate-pulse" />
                    ПОЛКА Digital • Автовыдача 0 сек
                  </span>
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    100% Escrow Гарант • Комиссия всего 3%
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-black tracking-tight text-white">
                  Маркетплейс цифровых услуг, игр, подписок и аккаунтов
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-normal">
                  Telegram Premium, ChatGPT Plus, Steam CS2, Робуксы и ключи с моментальной выдачей в защищенный чат.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 z-10">
                <button
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 backdrop-blur-md"
                >
                  🛡️ Как работает гарант
                </button>
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-black transition shadow-lg active:scale-95"
                >
                  + Продать в Digital
                </button>
              </div>
            </div>
          ) : (
            /* CLASSIC GOODS COMPACT HERO BANNER */
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d172e] via-[#131f3d] to-[#1a1233] border border-blue-500/30 text-white shadow-xl shadow-blue-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
              <div className="space-y-1 z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 text-[10px] font-black border border-blue-400/40 flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3 text-blue-400" />
                    Городская витрина объявлений
                  </span>
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    100% Escrow Гарант • Осмотр в ПВЗ перед выплатой
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-black tracking-tight text-white">
                  Безопасная витрина товаров, авто и услуг вашего города
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-normal">
                  Покупайте технику и авто с примеркой в ПВЗ. Деньги замораживаются банком и переводятся продавцу только после вашего подтверждения.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 z-10">
                <button
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 backdrop-blur-md"
                >
                  🛡️ Полка Защита
                </button>
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition shadow-lg active:scale-95"
                >
                  + Разместить лот
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 space-y-4">
        
        {/* Section Header: Title & Quick Filter Chips & View Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1f2d47]">
          {/* Quick interactive chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {filters.storefrontMode === 'digital' ? (
              /* DIGITAL QUICK CHIPS */
              <>
                <button
                  onClick={() => handleQuickFilterToggle('instant')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'instant'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-purple-500/50'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-300" />
                  <span>⚡ Автовыдача 0 сек</span>
                </button>

                <button
                  onClick={() => handleQuickFilterToggle('subs')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'subs'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-blue-500/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Подписки (TG / ИИ / Spotify)</span>
                </button>

                <button
                  onClick={() => handleQuickFilterToggle('accounts')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'accounts'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-indigo-500/50'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Игровые аккаунты</span>
                </button>

                <button
                  onClick={() => handleQuickFilterToggle('currency')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'currency'
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>Донат & Валюта</span>
                </button>

                <button
                  onClick={() => handleQuickFilterToggle('vip')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'vip'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>VIP селлеры</span>
                </button>
              </>
            ) : (
              /* CLASSIC QUICK CHIPS */
              <>
                <button
                  onClick={() => handleQuickFilterToggle('safe_deal')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'safe_deal'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Полка Защита (Escrow)</span>
                </button>

                <button
                  onClick={() => handleQuickFilterToggle('vip')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'vip'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>VIP лоты</span>
                </button>

                <button
                  onClick={() => handleQuickFilterToggle('free')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'free'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-blue-500/50'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-blue-400" />
                  <span>Даром (0 ₽)</span>
                </button>

                <button
                  onClick={() => handleQuickFilterToggle('top_rated')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    filters.quickFilter === 'top_rated'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30'
                      : 'bg-[#101726] border border-[#1f2d47] text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Рейтинг 4.95+</span>
                </button>
              </>
            )}
          </div>

          {/* View mode switcher */}
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <span className="text-xs text-slate-400 mr-1.5">
              {filteredListings.length} {filteredListings.length === 1 ? 'лот' : filteredListings.length < 5 ? 'лота' : 'лотов'}
            </span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-[#162035]'
              }`}
              title="Сетка"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-[#162035]'
              }`}
              title="Список"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar + Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterSidebar
              filters={filters}
              onChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
              onReset={handleResetFilters}
              totalFound={filteredListings.length}
            />
          </div>

          {/* Listings Feed */}
          <div className="lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                {filters.storefrontMode === 'digital' ? (
                  <>
                    <Zap className="w-5 h-5 text-cyan-300" />
                    <span>Витрина ПОЛКА Digital: Подписки, аккаунты и софт</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-blue-400" />
                    <span>Городская витрина объявлений: Вещи и услуги</span>
                  </>
                )}
                <span className="text-xs font-normal text-slate-400">({filteredListings.length} лотов)</span>
              </h2>
            </div>

            {filteredListings.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#101726] border border-[#1f2d47] text-center space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-[#162035] text-slate-400 flex items-center justify-center mx-auto border border-[#22324e]">
                  <SearchX className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    На этой полке пока ничего не найдено
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Попробуйте сбросить фильтры или переключить режим витрины.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5'
                  : 'space-y-3'
              }>
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isFavorite={favorites.includes(listing.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onClick={(item) => setSelectedListing(item)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1b263b] bg-[#0a0f1d] text-xs text-slate-400 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-md">
              П
            </div>
            <span className="font-extrabold text-white">ПОЛКА PRO</span>
            <span className="text-slate-500">• Гибридный маркетплейс (Вещи & Digital)</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <button onClick={() => setIsHowItWorksOpen(true)} className="hover:text-blue-400 font-semibold transition">
              Полка Защита (Escrow)
            </button>
            <button onClick={() => handleModeChange('digital')} className="hover:text-cyan-400 transition">
              Каталог подписок и игр
            </button>
            <button onClick={() => handleModeChange('classic')} className="hover:text-blue-400 transition">
              Городская витрина
            </button>
            <a href="#" className="hover:text-blue-400 transition">Служба арбитража</a>
          </div>
          <div className="text-[11px] text-slate-500">
            © 2026 ПОЛКА PRO. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f1d]/95 backdrop-blur-xl border-t border-[#1b263b] py-2 px-3 flex items-center justify-around text-[10px] font-semibold text-slate-400">
        <button
          onClick={() => handleModeChange('classic')}
          className={`flex flex-col items-center gap-1 ${filters.storefrontMode === 'classic' ? 'text-blue-400 font-bold' : 'hover:text-blue-400'}`}
        >
          <Home className="w-5 h-5" />
          <span>Вещи</span>
        </button>

        <button
          onClick={() => handleModeChange('digital')}
          className={`flex flex-col items-center gap-1 ${filters.storefrontMode === 'digital' ? 'text-cyan-300 font-bold' : 'hover:text-cyan-400'}`}
        >
          <Zap className="w-5 h-5 text-cyan-300" />
          <span>Digital</span>
        </button>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex flex-col items-center gap-1 text-blue-400 font-bold"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center -mt-3 shadow-lg shadow-blue-500/30 font-black">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span>Подать</span>
        </button>

        <button
          onClick={() => setViewOnlyFavorites(true)}
          className={`flex flex-col items-center gap-1 relative ${viewOnlyFavorites ? 'text-rose-400' : ''}`}
        >
          <Heart className="w-5 h-5" />
          <span>Избранное</span>
          {favorites.length > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-blue-400"
        >
          <User className="w-5 h-5" />
          <span>Профиль</span>
        </button>
      </div>

      {/* MODALS */}
      <ListingModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        isFavorite={selectedListing ? favorites.includes(selectedListing.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onStartSafeDeal={(listing) => {
          setSelectedListing(null);
          handleStartSafeDeal(listing);
        }}
        onOpenChatWithSeller={(listing) => {
          setSelectedListing(null);
          handleOpenChat(listing);
        }}
      />

      <CreateListingModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreateListing}
      />

      <SafeDealModal
        listing={safeDealListing}
        isOpen={isSafeDealOpen}
        onClose={() => {
          setIsSafeDealOpen(false);
          setSafeDealListing(null);
        }}
        onCompleteDeal={handleCompleteDeal}
      />

      <ChatModal
        listing={chatListing}
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatListing(null);
        }}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        myListings={myListings}
        favoritesCount={favorites.length}
        onOpenListing={(listing) => setSelectedListing(listing)}
      />

      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
        onReset={handleResetFilters}
        totalFound={filteredListings.length}
      />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 md:bottom-8 right-5 z-40 p-3 rounded-full bg-[#0e1628]/90 border border-blue-500/40 text-blue-400 hover:text-white hover:bg-blue-600 shadow-2xl shadow-blue-500/20 backdrop-blur-md transition-all duration-200 transform active:scale-90"
          title="Наверх"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default App;
