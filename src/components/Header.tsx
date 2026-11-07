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
  LayoutGrid,
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
    <header className="sticky top-0 z-40 bg-[#0a0f1d]/95 dark:bg-[#0a0f1d]/95 backdrop-blur-xl border-b border-[#1b263b] shadow-2xl transition-colors">
      {/* Top micro-bar with utility links */}
      <div className="bg-[#070b16] text-xs text-slate-400 py-1.5 px-4 sm:px-6 border-b border-[#162033]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 font-medium text-slate-300 hover:text-blue-400 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedCity}</span>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-[#101726] rounded-2xl shadow-2xl border border-[#1f2d47] py-2 z-50 animate-in fade-in zoom-in-95">
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
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-600/10 transition ${
                        selectedCity === city ? 'text-blue-400 font-bold bg-blue-600/15' : 'text-slate-300'
                      }`}
                    >
                      {city}
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3 text-slate-400 text-xs">
              <button
                onClick={onOpenHowItWorks}
                className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Безопасная сделка (Escrow 100%)</span>
              </button>
              <span>•</span>
              <span className="text-slate-400">Доставка по всей РФ & Автовыдача</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenHowItWorks}
              className="text-blue-400 hover:text-blue-300 font-semibold text-xs flex items-center gap-1 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Полка Защита: Гарантии</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
              title="Переключить тему"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo «ПОЛКА PRO» */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              {/* Modern Cyber Showcase Emblem */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300 border border-blue-400/30">
                <div className="grid grid-cols-2 gap-1 p-1">
                  <span className="w-2 h-2 rounded-xs bg-white shadow-sm" />
                  <span className="w-2 h-2 rounded-xs bg-cyan-300 shadow-sm" />
                  <span className="w-2 h-2 rounded-xs bg-indigo-200 shadow-sm" />
                  <span className="w-2 h-2 rounded-xs bg-purple-300 shadow-sm" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    ПОЛКА
                  </span>
                  <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-wide">
                  Витрина объявлений & Маркетплейс
                </span>
              </div>
            </a>

            {/* «Все категории» Blue Button */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/25 active:scale-95"
              >
                <LayoutGrid className="w-4 h-4" />
                Все категории
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[#101726] rounded-2xl shadow-2xl border border-[#1f2d47] p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Каталог товаров и услуг</div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsCategoryMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-blue-600/10 flex items-center justify-between text-slate-200 transition"
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

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Поиск по объявлениям (например: iPhone 15 Pro, Квартира...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-11 pr-24 py-2.5 sm:py-3 rounded-2xl bg-[#0f172a] border border-[#1f2d47] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-24 text-slate-400 hover:text-slate-200 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => {}}
                className="absolute right-1.5 px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-md shadow-blue-600/20"
              >
                Найти
              </button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-rose-400 transition"
              title="Избранные лоты"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-rose-500/30">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown (Bell) */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-blue-400 transition"
                title="Уведомления"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-black flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#101726] rounded-2xl shadow-2xl border border-[#1f2d47] p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1f2d47]">
                    <span className="font-bold text-xs text-white">Уведомления</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-[11px] text-blue-400 font-semibold hover:underline"
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
                            ? 'bg-blue-600/10 border-blue-500/30' 
                            : 'bg-[#141e30] border-[#1f2d47]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-tight">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <button
              onClick={onOpenChat}
              className="relative p-2.5 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-blue-400 transition"
              title="Сообщения"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0f1d]" />
            </button>

            {/* Profile */}
            <button
              onClick={onOpenProfile}
              className="p-2.5 rounded-xl hover:bg-[#162035] text-slate-300 hover:text-white transition hidden sm:flex items-center gap-2"
              title="Личный кабинет"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                <UserIcon className="w-4 h-4" />
              </div>
            </button>

            {/* Place Listing Button (Gradient CTA) */}
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4 sm:w-5 h-5" />
              <span className="hidden sm:inline">Разместить объявление</span>
              <span className="sm:hidden">Подать</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
