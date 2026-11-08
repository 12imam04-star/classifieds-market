import React from 'react';
import { 
  Layers, 
  Smartphone, 
  Gamepad2, 
  Home, 
  Car, 
  Wrench, 
  Shirt,
  Zap,
  Sparkles,
  Coins,
  Key,
  ShoppingBag
} from 'lucide-react';
import { Category, StorefrontMode } from '../types';

interface CategoriesBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  storefrontMode: StorefrontMode;
  onModeChange: (mode: StorefrontMode) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Coins: <Coins className="w-4 h-4" />,
  Key: <Key className="w-4 h-4" />
};

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  storefrontMode,
  onModeChange,
}) => {
  return (
    <div className="bg-[#0a0f1d] border-b border-[#1b263b] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 space-y-2.5">
        {/* Top Mini Switcher for Storefront Modes */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0c1220] border border-[#1f2d47]">
            <button
              onClick={() => onModeChange('classic')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                storefrontMode === 'classic'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>🏬 Городская витрина (Вещи & Авто)</span>
            </button>

            <button
              onClick={() => onModeChange('digital')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                storefrontMode === 'digital'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              <span>⚡ ПОЛКА Digital (Игры & Подписки)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/30 text-cyan-300 border border-purple-400/40 font-black hidden sm:inline">
                NEW
              </span>
            </button>

            <button
              onClick={() => onModeChange('all')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                storefrontMode === 'all'
                  ? 'bg-[#162035] text-white border border-blue-500/50'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span>Все лоты</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center text-xs text-slate-400">
            {storefrontMode === 'digital' ? (
              <span className="text-cyan-300 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Мгновенная выдача ключей и доната в чат за 0 сек
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1">
                <span>📦</span> Безопасная доставка по РФ с осмотром в ПВЗ
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Categories List */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max pb-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap active:scale-95 ${
                    isActive
                      ? storefrontMode === 'digital'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                        : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-[#101726] hover:bg-[#162035] text-slate-300 border border-[#1f2d47]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {ICON_MAP[cat.icon] || <Layers className="w-4 h-4" />}
                  </span>
                  <span>{cat.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive 
                      ? storefrontMode === 'digital' ? 'bg-purple-800/60 text-white' : 'bg-blue-700/60 text-white' 
                      : 'bg-[#162035] text-slate-400 border border-[#22324e]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
