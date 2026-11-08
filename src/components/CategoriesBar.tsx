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
  ShieldCheck,
  Package
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
}) => {
  return (
    <div className="bg-[#090d18] border-b border-[#182338] transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Scrollable Categories List */}
          <div className="overflow-x-auto no-scrollbar flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max py-0.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap active:scale-95 ${
                      isActive
                        ? storefrontMode === 'digital'
                          ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30'
                          : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-[#0f1627] hover:bg-[#151f35] text-slate-300 border border-[#1e2a42]'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>
                      {ICON_MAP[cat.icon] || <Layers className="w-3.5 h-3.5" />}
                    </span>
                    <span>{cat.name}</span>
                    <span className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-medium ${
                      isActive 
                        ? storefrontMode === 'digital' ? 'bg-purple-900/80 text-cyan-200' : 'bg-blue-800 text-white' 
                        : 'bg-[#151f33] text-slate-400 border border-[#22334e]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Trust Mini-Badge */}
          <div className="hidden xl:flex items-center shrink-0 text-xs pl-3 border-l border-[#1f2d47]">
            {storefrontMode === 'digital' ? (
              <span className="text-cyan-300 font-medium flex items-center gap-1.5 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Автовыдача 0 сек • Гарантия 100%</span>
              </span>
            ) : (
              <span className="text-emerald-300 font-medium flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Escrow защита • Осмотр в ПВЗ</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
