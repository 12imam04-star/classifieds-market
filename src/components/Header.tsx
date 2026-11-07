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
  BarChart3, 
  User as UserIcon,
  X,
  Layers
} from 'lucide-react';
import { CITIES, CATEGORIES } from '../data/mockData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenCreate: () => void;
  onOpenAnalysis: () => void;
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
  onOpenAnalysis,
  onOpenProfile,
  onOpenChat,
  onSelectCategory,
  isDark,
  onToggleTheme,
}) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top micro-bar */}
      <div className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{selectedCity}</span>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 font-semibold text-slate-400 text-[10px] uppercase tracking-wider">
                    Выберите регион
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onCityChange(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/60 transition ${
                        selectedCity === city ? 'text-blue-600 font-bold dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {city}
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Безопасная сделка (Escrow 100%)
              </span>
              <span>•</span>
              <span className="text-slate-500">Доставка по всей РФ</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAnalysis}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Анализ Avito, Playerok & GGsel
            </button>
            <button
              onClick={onToggleTheme}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
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
          {/* Logo with Avito & Playerok inspiration */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                {/* 4 dots symbol resembling modern Russian classifieds brand identity */}
                <div className="grid grid-cols-2 gap-1 p-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-300" />
                  <span className="w-2 h-2 rounded-full bg-emerald-300" />
                  <span className="w-2 h-2 rounded-full bg-amber-300" />
                  <span className="w-2 h-2 rounded-full bg-rose-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
                  Avito<span className="text-blue-500">X</span>
                  <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">PRO</span>
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-400 -mt-1 font-medium">
                  Доска объявлений & Маркетплейс
                </span>
              </div>
            </a>

            {/* All Categories Dropdown Button */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm"
              >
                <Layers className="w-4 h-4" />
                Все категории
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
                      className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between text-slate-700 dark:text-slate-200 transition"
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
                placeholder="Поиск по объявлениям (например: iPhone 15, Steam, Квартира...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-11 pr-24 py-2.5 sm:py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-inner"
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
                className="absolute right-1.5 px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition"
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
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
              </div>
            </button>

            {/* Place Listing Button (Avito primary CTA) */}
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition transform active:scale-95"
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
