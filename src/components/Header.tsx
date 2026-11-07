import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  MessageSquare, 
  PlusCircle, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Bell, 
  User as UserIcon,
  X,
  Layers,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { CITIES, CATEGORIES, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { NotificationItem } from '../types';

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
}

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
  isDark,
  onToggleTheme,
}) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top micro-bar */}
      <div className="bg-[#f7f5f0] dark:bg-slate-900/90 text-xs text-slate-500 dark:text-slate-400 py-1.5 px-4 sm:px-6 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedCity}</span>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 font-semibold text-slate-400 text-[10px] uppercase tracking-wider">
                    Выберите город
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onCityChange(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50/60 dark:hover:bg-slate-700/60 transition ${
                        selectedCity === city ? 'text-amber-600 font-bold dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {city}
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onOpenHowItWorks}
                className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Полка Защита: Гарантия Escrow 100%
              </button>
              <span>•</span>
              <span className="text-slate-500">Доставка по всей России</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenHowItWorks}
              className="text-amber-600 dark:text-amber-400 hover:underline font-bold text-xs flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Как работает Полка
            </button>

            <button
              onClick={onToggleTheme}
              className="p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
              title="Переключить тему"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo «ПОЛКА» */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              {/* Custom Polka Icon: stylized shelf with golden gem */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform border border-amber-500/30">
                <div className="flex flex-col items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 transform rotate-45 mb-0.5 shadow-sm" />
                  <span className="w-5 h-1 rounded-full bg-white dark:bg-slate-900" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
                  ПОЛКА
                  <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    МАРКЕТ
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-400 -mt-1 font-semibold tracking-wide">
                  всё по полочкам
                </span>
              </div>
            </a>

            {/* Catalog Button */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-bold text-sm transition shadow-sm"
              >
                <Layers className="w-4 h-4" />
                Все полки
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-in fade-in">
                  <div className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase">Каталог товаров и услуг</div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsCategoryMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-amber-50/60 dark:hover:bg-slate-700 flex items-center justify-between text-slate-700 dark:text-slate-200 transition"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Искать на Полке (например: iPhone 15, Steam, Квартира...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-11 pr-24 py-2.5 sm:py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-20 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => {}}
                className="absolute right-1.5 px-4 py-1.5 sm:py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition"
              >
                Найти
              </button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
              title="Избранное"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown (Bell) */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                title="Уведомления"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Уведомления</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                      >
                        Прочитать все
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div 
                        key={n.id}
                        className={`p-2.5 rounded-xl border transition text-xs space-y-1 ${
                          !n.read 
                            ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/30' 
                            : 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white text-[11px]">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <button
              onClick={onOpenChat}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
              title="Сообщения"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </button>

            {/* Profile */}
            <button
              onClick={onOpenProfile}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition hidden sm:flex items-center gap-2"
              title="Личный кабинет"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                <UserIcon className="w-4 h-4" />
              </div>
            </button>

            {/* Place Listing Button */}
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 transition transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4 sm:w-5 h-5" />
              <span className="hidden sm:inline">Поставить на Полку</span>
              <span className="sm:hidden">Подать</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
