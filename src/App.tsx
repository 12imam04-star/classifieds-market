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
  AnalysisModal 
} from './components/AnalysisModal';
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
  BarChart3, 
  Home, 
  ShieldCheck, 
  SearchX,
  Bell
} from 'lucide-react';

export const App: React.FC = () => {
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

  // Listings state (stored in localStorage)
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('avitox_listings');
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
    localStorage.setItem('avitox_listings', JSON.stringify(listings));
  }, [listings]);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('avitox_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return ['item-1', 'item-5'];
  });

  useEffect(() => {
    localStorage.setItem('avitox_favorites', JSON.stringify(favorites));
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
    sortBy: 'date_desc'
  });

  // Views & Modals
  const [viewOnlyFavorites, setViewOnlyFavorites] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
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
        showToast('Удалено из избранного');
        return prev.filter(item => item !== id);
      } else {
        showToast('Добавлено в избранное ❤️');
        return [...prev, id];
      }
    });
  };

  const handleCreateListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    showToast('Объявление успешно опубликовано бесплатно! 🎉');
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
      sortBy: 'date_desc'
    });
    setViewOnlyFavorites(false);
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
      // date_desc default
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
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom-5">
          <Bell className="w-4 h-4 text-emerald-400" />
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
        onOpenAnalysis={() => setIsAnalysisOpen(true)}
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

      {/* Hero Announcement Banner (Highlights synthesis of Avito + Playerok + GGsel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 w-full">
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                Новое поколение классифайдов
              </span>
              <span className="text-amber-300 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Стиль Avito + Playerok + GGsel
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black">
              Доска бесплатных объявлений с 100% безопасной сделкой (Escrow)
            </h2>
            <p className="text-xs text-blue-100 max-w-2xl">
              Публикуйте объявления бесплатно в пару кликов. Покупайте с доставкой по всей России или мгновенной автовыдачей цифровых товаров.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAnalysisOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-sm transition border border-white/20"
            >
              Смотреть анализ 3-х сайтов
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-black transition shadow-md"
            >
              + Разместить бесплатно
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Breadcrumb / Active filters indication */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2 text-sm">
            <h1 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl">
              {viewOnlyFavorites ? 'Избранные объявления' : 'Рекомендации для вас'}
            </h1>
            <span className="text-xs text-slate-400 font-medium">
              ({filteredListings.length} {filteredListings.length === 1 ? 'объявление' : 'объявлений'})
            </span>
          </div>

          {viewOnlyFavorites && (
            <button
              onClick={() => setViewOnlyFavorites(false)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Показать все объявления
            </button>
          )}
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

          {/* Listings Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
          <div className="lg:col-span-3">
            {filteredListings.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Ничего не найдено
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Попробуйте изменить поисковый запрос, сбросить фильтры или выбрать другой город.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isFavorite={favorites.includes(listing.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onClick={(item) => setSelectedListing(item)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-xs text-slate-500 dark:text-slate-400 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">
              A
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">AvitoX Classifieds</span>
            <span>• Доска объявлений нового поколения</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <button onClick={() => setIsAnalysisOpen(true)} className="hover:text-blue-500">
              Анализ Avito, Playerok и GGsel
            </button>
            <a href="#" className="hover:text-blue-500">Безопасная сделка (Escrow)</a>
            <a href="#" className="hover:text-blue-500">Правила публикации</a>
            <a href="#" className="hover:text-blue-500">Помощь и арбитраж</a>
          </div>
          <div className="text-[11px] text-slate-400">
            © 2026 AvitoX. Бесплатные объявления по всей России.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Avito / Playerok app pattern) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-3 flex items-center justify-around text-[10px] font-semibold text-slate-600 dark:text-slate-400">
        <button
          onClick={() => {
            setViewOnlyFavorites(false);
            setFilters(prev => ({ ...prev, category: 'all' }));
          }}
          className="flex flex-col items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <Home className="w-5 h-5" />
          <span>Главная</span>
        </button>

        <button
          onClick={() => setViewOnlyFavorites(true)}
          className={`flex flex-col items-center gap-1 relative ${viewOnlyFavorites ? 'text-blue-600 dark:text-blue-400' : ''}`}
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
          className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400 font-bold"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -mt-3 shadow-md shadow-blue-500/30">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span>Подать</span>
        </button>

        <button
          onClick={() => handleOpenChat(listings[0])}
          className="flex flex-col items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Сделки</span>
        </button>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
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

      <AnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
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
