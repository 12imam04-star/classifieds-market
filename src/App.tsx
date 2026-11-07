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

import { INITIAL_LISTINGS } from './data/mockData';
import { Listing, FilterState } from './types';
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
  Star
} from 'lucide-react';

export const App: React.FC = () => {
  // Clear any legacy storage from previous builds
  useEffect(() => {
    try {
      localStorage.removeItem('avitox_listings');
      localStorage.removeItem('avitox_favorites');
    } catch (e) {}
  }, []);

  // Theme state
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
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
    return ['item-1', 'item-5'];
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
    quickFilter: undefined
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        showToast('Убрано с избранной полки');
        return prev.filter(item => item !== id);
      } else {
        showToast('Добавлено на избранную полку ❤️');
        return [...prev, id];
      }
    });
  };

  const handleCreateListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    showToast('Лот успешно поставлен на Полку! 🎉');
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

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      city: 'Все города',
      minPrice: undefined,
      maxPrice: undefined,
      onlySafeDeal: false,
      condition: 'all',
      sortBy: 'date_desc',
      quickFilter: undefined
    });
    setViewOnlyFavorites(false);
  };

  const handleQuickFilterToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      quickFilter: prev.quickFilter === tag ? undefined : tag
    }));
  };

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (viewOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      if (filters.city !== 'Все города' && item.city !== 'Все города' && item.city !== filters.city) {
        return false;
      }
      if (filters.onlySafeDeal && !item.isSafeDeal) {
        return false;
      }
      if (filters.condition !== 'all' && item.condition !== filters.condition) {
        return false;
      }
      if (filters.minPrice !== undefined && item.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && item.price > filters.maxPrice) {
        return false;
      }

      // Quick filter chips
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

      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCity = item.city.toLowerCase().includes(query);
        const matchCat = (item.subcategory || '').toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchCity && !matchCat) {
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

  return (
    <div className="min-h-screen flex flex-col transition-colors pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-in slide-in-from-bottom-5">
          <Bell className="w-4 h-4 text-amber-400 dark:text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
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
      />

      {/* Horizontal Category Bar */}
      <CategoriesBar
        selectedCategory={filters.category}
        onSelectCategory={(id) => {
          setViewOnlyFavorites(false);
          setFilters(prev => ({ ...prev, category: id }));
        }}
      />

      {/* Hero Welcome Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 w-full">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 text-white shadow-xl shadow-amber-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-black border border-amber-500/30">
                ПОЛКА • всё по полочкам
              </span>
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Полка Защита (Escrow 100%)
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight">
              Доска честных бесплатных объявлений
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Выставляйте вещи на Полку бесплатно за минуту. Покупайте надежно с защитой платежа и доставкой по всей России или мгновенной автовыдачей.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/15"
            >
              Как работает гарант
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition shadow-md"
            >
              + Поставить на Полку
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 space-y-4">
        
        {/* Quick Filter Chips & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/70 dark:border-slate-800">
          {/* Quick interactive chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => handleQuickFilterToggle('safe_deal')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                filters.quickFilter === 'safe_deal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Полка Защита</span>
            </button>

            <button
              onClick={() => handleQuickFilterToggle('instant')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                filters.quickFilter === 'instant'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-purple-500" />
              <span>Автовыдача</span>
            </button>

            <button
              onClick={() => handleQuickFilterToggle('vip')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                filters.quickFilter === 'vip'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>VIP лоты</span>
            </button>

            <button
              onClick={() => handleQuickFilterToggle('free')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                filters.quickFilter === 'free'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-blue-500" />
              <span>Даром (0 ₽)</span>
            </button>

            <button
              onClick={() => handleQuickFilterToggle('top_rated')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                filters.quickFilter === 'top_rated'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Рейтинг 4.95+</span>
            </button>
          </div>

          {/* View mode buttons: Grid vs List */}
          <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
            <span className="text-xs text-slate-400 mr-2">
              {filteredListings.length} {filteredListings.length === 1 ? 'лот' : 'лотов'}
            </span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950'
                  : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Сетка"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950'
                  : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
            {filteredListings.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white dark:bg-[#151d2e] border border-slate-200/80 dark:border-slate-800 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    На этой полке пока пусто
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Попробуйте сбросить фильтры или выберите другой город или категорию.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5'
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
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-xs text-slate-500 dark:text-slate-400 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 text-xs font-black">
              П
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white">ПОЛКА</span>
            <span>• всё по полочкам</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <button onClick={() => setIsHowItWorksOpen(true)} className="hover:text-amber-500 font-semibold">
              Полка Защита (Escrow)
            </button>
            <a href="#" className="hover:text-amber-500">Правила размещения лотов</a>
            <a href="#" className="hover:text-amber-500">Доставка по России</a>
            <a href="#" className="hover:text-amber-500">Служба арбитража</a>
          </div>
          <div className="text-[11px] text-slate-400">
            © 2026 ПОЛКА МАРКЕТ. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-3 flex items-center justify-around text-[10px] font-semibold text-slate-600 dark:text-slate-400">
        <button
          onClick={() => {
            setViewOnlyFavorites(false);
            setFilters(prev => ({ ...prev, category: 'all' }));
          }}
          className="flex flex-col items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
        >
          <Home className="w-5 h-5" />
          <span>Полка</span>
        </button>

        <button
          onClick={() => setViewOnlyFavorites(true)}
          className={`flex flex-col items-center gap-1 relative ${viewOnlyFavorites ? 'text-amber-600 dark:text-amber-400' : ''}`}
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
          onClick={() => setIsCreateOpen(true)}
          className="flex flex-col items-center gap-1 text-amber-600 dark:text-amber-400 font-bold"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center -mt-3 shadow-md shadow-amber-500/30 font-black">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span>Подать</span>
        </button>

        <button
          onClick={() => setIsHowItWorksOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Защита</span>
        </button>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
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
    </div>
  );
};

export default App;
