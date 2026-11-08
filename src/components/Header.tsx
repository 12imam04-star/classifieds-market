import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  MessageSquare, 
  PlusCircle, 
  ShieldCheck, 
  Bell, 
  User as UserIcon,
  X,
  LayoutGrid,
  Zap,
  ShoppingBag,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { CITIES, INITIAL_NOTIFICATIONS, CLASSIC_CATEGORIES, DIGITAL_CATEGORIES } from '../data/mockData';
import { NotificationItem, StorefrontMode } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenCreate: () => void;
  onOpenHowItWorks: () => void;
  onOpenProfile: () => void;
  onOpenChat: () => void;
  onSelectCategory: (catId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  // Hybrid Storefront Mode
  storefrontMode: StorefrontMode;
  onModeChange: (mode: StorefrontMode) => void;
  onOpenMobileFilters: () => void;
}

const POPULAR_SEARCHES_CLASSIC = [
  'iPhone 15 Pro Max',
  'Студия в центре',
  'Sony PlayStation 5',
  'BMW M4',
  'MacBook Pro M3 Max',
  'Ремонт квартир'
];

const POPULAR_SEARCHES_DIGITAL = [
  'Telegram Premium 12 месяцев',
  'ChatGPT Plus GPT-4o',
  'Steam CS2 Prime',
  'Roblox 2000 R$',
  'Spotify Premium',
  'Windows 11 Pro'
];

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  favoritesCount,
  onOpenFavorites,
  onOpenCreate,
  onOpenHowItWorks,
  onOpenProfile,
  onOpenChat,
  onSelectCategory,
  storefrontMode,
  onModeChange,
  onOpenMobileFilters,
}) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentCategories = storefrontMode === 'digital' ? DIGITAL_CATEGORIES : CLASSIC_CATEGORIES;
  const popularSearches = storefrontMode === 'digital' ? POPULAR_SEARCHES_DIGITAL : POPULAR_SEARCHES_CLASSIC;

  return (
    <header className="sticky top-0 z-40 bg-[#070b16]/95 backdrop-blur-xl border-b border-[#182338] shadow-2xl transition-colors">
      {/* 1. TOP UTILITY BAR (Desktop only) */}
      <div className="hidden md:block bg-[#050811] text-[11px] text-slate-400 py-1 px-4 sm:px-6 border-b border-[#141d2e]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* City Selector */}
            {storefrontMode === 'classic' ? (
              <div className="relative">
                <button
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-1 font-semibold text-slate-300 hover:text-blue-400 transition"
                >
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span>{selectedCity}</span>
                </button>

                {isCityDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-52 bg-[#0e1526] rounded-xl shadow-2xl border border-[#1f2d47] py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1 font-bold text-slate-400 text-[10px] uppercase tracking-wider">
                      Выберите город
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          onCityChange(city);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-600/15 transition ${
                          selectedCity === city ? 'text-blue-400 font-bold bg-blue-600/10' : 'text-slate-300'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <span className="text-blue-400">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>Режим Digital: Доступно по всему миру (Автовыдача 0 сек)</span>
              </div>
            )}

            <button 
              onClick={onOpenHowItWorks}
              className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Полка Защита (Escrow 100%)</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            {storefrontMode === 'digital' ? (
              <span className="text-purple-300 font-medium">
                ⚡ Мгновенная передача данных в защищенный чат
              </span>
            ) : (
              <span>
                📦 Доставка по всей РФ (СДЭК / Boxberry) с примеркой
              </span>
            )}
            <button 
              onClick={onOpenHowItWorks}
              className="text-slate-400 hover:text-slate-200 transition font-medium"
            >
              Гарантии безопасности
            </button>
          </div>
        </div>
      </div>

      {/* 2. DESKTOP MAIN BAR (md and up) */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 py-2.5 items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand + Segmented Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
              storefrontMode === 'digital'
                ? 'bg-gradient-to-tr from-purple-600 to-cyan-500 shadow-purple-600/30'
                : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 shadow-blue-600/30'
            }`}>
              {storefrontMode === 'digital' ? (
                <Zap className="w-5 h-5 text-white" />
              ) : (
                <ShoppingBag className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  ПОЛКА
                </span>
                <span className={`ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-md border shadow-sm ${
                  storefrontMode === 'digital'
                    ? 'bg-purple-500/10 text-cyan-400 border-purple-500/30'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                }`}>
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-wide">
                {storefrontMode === 'digital' ? 'Цифровой хаб' : 'Городская витрина'}
              </span>
            </div>
          </a>

          {/* HIGH-END SEGMENTED STOREFRONT SWITCHER */}
          <div className="flex items-center p-1 rounded-xl bg-[#0c1220] border border-[#1f2d47] shadow-inner">
            <button
              onClick={() => onModeChange('classic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                storefrontMode === 'classic'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Городская витрина: вещи, техника, авто, квартиры"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Вещи & Авто</span>
            </button>

            <button
              onClick={() => onModeChange('digital')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                storefrontMode === 'digital'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
              title="Цифровой каталог: подписки, аккаунты, игры, ключи"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              <span>ПОЛКА Digital</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/30 text-cyan-300 font-extrabold border border-purple-400/40">
                HOT
              </span>
            </button>
          </div>

          {/* Catalog Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition shadow-md active:scale-95 ${
                storefrontMode === 'digital'
                  ? 'bg-[#181329] border border-purple-500/40 text-cyan-300 hover:bg-purple-900/30'
                  : 'bg-[#121c2f] border border-blue-500/40 text-blue-300 hover:bg-blue-900/30'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Каталог</span>
            </button>

            {isCategoryMenuOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-[#0e1526] rounded-2xl shadow-2xl border border-[#1f2d47] p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                  {storefrontMode === 'digital' ? 'Каталог подписок и игр' : 'Каталог товаров и услуг'}
                </div>
                {currentCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsCategoryMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-blue-600/15 flex items-center justify-between text-slate-200 transition"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400 bg-[#162035] px-2 py-0.5 rounded-full border border-[#22324e]">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: EXPANSIVE SEARCH BAR */}
        <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={
                storefrontMode === 'digital'
                  ? "Поиск подписок, ключей, игр (Telegram, Steam, AI)..."
                  : "Поиск по объявлениям (iPhone, авто, жилье)..."
              }
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-24 py-2 sm:py-2.5 rounded-xl bg-[#0c1220] border text-sm text-white placeholder-slate-400 focus:outline-none transition shadow-inner ${
                storefrontMode === 'digital'
                  ? 'border-purple-500/40 focus:border-cyan-400 focus:ring-2 focus:ring-purple-500/20'
                  : 'border-[#1f2d47] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-20 text-slate-400 hover:text-slate-200 p-1"
                title="Очистить"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button 
              className={`absolute right-1 px-3.5 sm:px-4 py-1.5 text-white text-xs sm:text-sm font-bold rounded-lg transition shadow-md ${
                storefrontMode === 'digital'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 shadow-purple-600/30'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
              }`}
            >
              Найти
            </button>
          </div>

          {/* Interactive Search Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="absolute left-0 right-0 mt-2 bg-[#0e1526] rounded-2xl shadow-2xl border border-[#1f2d47] p-3.5 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  Популярно сейчас
                </span>
                <span className="text-[10px] text-slate-500">Нажмите для поиска</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    onMouseDown={() => {
                      onSearchChange(item);
                      setIsSearchFocused(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#141d30] hover:bg-blue-600/20 text-slate-300 hover:text-white border border-[#22334e] text-xs transition flex items-center gap-1"
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#1b263b] flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  {storefrontMode === 'digital' ? '⚡ Поиск по 80+ цифровым сервисам' : '🏙️ Поиск среди 140+ проверенных лотов'}
                </span>
                <span className="text-emerald-400 font-semibold">100% безопасная сделка</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions + CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Favorites */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-rose-400 transition"
            title="Избранные лоты"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-rose-500/30">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown (Bell) */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-blue-400 transition"
              title="Уведомления"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0e1526] rounded-2xl shadow-2xl border border-[#1f2d47] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-[#1b263b]">
                  <span className="font-bold text-sm text-white">Уведомления</span>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Прочитать все
                    </button>
                  )}
                </div>

                <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-2.5 rounded-xl border text-xs transition ${
                        item.read 
                          ? 'bg-[#101726]/40 border-transparent text-slate-400' 
                          : 'bg-blue-600/10 border-blue-500/30 text-slate-200'
                      }`}
                    >
                      <div className="font-semibold text-slate-200 mb-0.5">{item.title}</div>
                      <div className="text-slate-400 text-[11px]">{item.message}</div>
                      <div className="text-[9px] text-slate-500 mt-1">{item.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <button
            onClick={onOpenChat}
            className="relative p-2 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-blue-400 transition"
            title="Сообщения"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[#070b16]" />
          </button>

          {/* Profile */}
          <button
            onClick={onOpenProfile}
            className="p-1.5 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-white transition flex items-center"
            title="Личный кабинет"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              <UserIcon className="w-4 h-4" />
            </div>
          </button>

          {/* Place Listing Button */}
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/25 transition transform active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Разместить лот</span>
          </button>
        </div>
      </div>

      {/* 3. DEDICATED MOBILE HEADER (md:hidden - 2 clean rows) */}
      <div className="md:hidden px-3 pt-2 pb-2.5 space-y-2">
        {/* Row 1: Logo + City + Chat + Favorites */}
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-1.5">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-md ${
              storefrontMode === 'digital'
                ? 'bg-gradient-to-tr from-purple-600 to-cyan-500'
                : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
            }`}>
              {storefrontMode === 'digital' ? (
                <Zap className="w-4 h-4 text-white" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-black tracking-tight text-white">ПОЛКА</span>
              <span className={`ml-1 text-[8px] font-black px-1 py-0.2 rounded border ${
                storefrontMode === 'digital'
                  ? 'bg-purple-500/20 text-cyan-300 border-purple-500/40'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
              }`}>
                PRO
              </span>
            </div>
          </a>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-2">
            {/* City button (in classic mode) */}
            {storefrontMode === 'classic' && (
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-[#0e1627] px-2 py-1 rounded-lg border border-[#1e2a42]"
              >
                <MapPin className="w-3 h-3 text-blue-400" />
                <span className="max-w-[80px] truncate">{selectedCity}</span>
              </button>
            )}

            {/* Chat */}
            <button
              onClick={onOpenChat}
              className="relative p-1.5 rounded-lg bg-[#0e1627] text-slate-300 border border-[#1e2a42]"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </button>

            {/* Favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-1.5 rounded-lg bg-[#0e1627] text-slate-300 border border-[#1e2a42]"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile City Dropdown Sheet */}
        {isCityDropdownOpen && (
          <div className="bg-[#0e1526] rounded-xl border border-[#1f2d47] p-2 space-y-1 animate-in fade-in duration-150">
            <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
              Выберите город
            </div>
            <div className="grid grid-cols-2 gap-1 max-h-36 overflow-y-auto">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onCityChange(city);
                    setIsCityDropdownOpen(false);
                  }}
                  className={`text-left px-2 py-1 text-xs rounded-lg transition ${
                    selectedCity === city ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-[#162035]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Row 2: Full-Width Search Input with Mobile Filter Button */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1 min-w-0 flex items-center">
            <input
              type="text"
              placeholder={
                storefrontMode === 'digital'
                  ? "Поиск подписок, игр..."
                  : "Поиск по объявлениям..."
              }
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-7 pr-7 py-1.5 rounded-xl bg-[#0c1220] border text-xs text-white placeholder-slate-400 focus:outline-none transition ${
                storefrontMode === 'digital'
                  ? 'border-purple-500/40 focus:border-cyan-400'
                  : 'border-[#1f2d47] focus:border-blue-500'
              }`}
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />

            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-1.5 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Dedicated Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition shrink-0 active:scale-95 ${
              storefrontMode === 'digital'
                ? 'bg-[#181329] border border-purple-500/40 text-cyan-300 hover:bg-purple-900/40'
                : 'bg-[#101726] border border-[#1f2d47] text-slate-200 hover:border-blue-500'
            }`}
            title="Открыть фильтры"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="text-[11px]">Фильтры</span>
          </button>
        </div>
      </div>
    </header>
  );
};
