import React, { useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { Category, StorefrontMode } from '../types';
import { DIGITAL_PLATFORMS } from '../data/mockData';

interface CategoriesBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  storefrontMode: StorefrontMode;
  onModeChange: (mode: StorefrontMode) => void;
  selectedPlatform?: string;
  onSelectPlatform?: (platform: string | undefined) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-3.5 h-3.5" />,
  Smartphone: <Smartphone className="w-3.5 h-3.5" />,
  Gamepad2: <Gamepad2 className="w-3.5 h-3.5" />,
  Home: <Home className="w-3.5 h-3.5" />,
  Car: <Car className="w-3.5 h-3.5" />,
  Wrench: <Wrench className="w-3.5 h-3.5" />,
  Shirt: <Shirt className="w-3.5 h-3.5" />,
  Zap: <Zap className="w-3.5 h-3.5" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Coins: <Coins className="w-3.5 h-3.5" />,
  Key: <Key className="w-3.5 h-3.5" />
};

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  storefrontMode,
  selectedPlatform,
  onSelectPlatform,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#080d1a] border-b border-[#182338] transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 space-y-1.5">
        {/* Row 1: Categories with smooth scroll buttons */}
        <div className="flex items-center justify-between gap-2 relative group">
          {/* Left scroll arrow */}
          <button
            onClick={scrollLeft}
            className="hidden sm:flex w-7 h-7 rounded-lg bg-[#0e1627] hover:bg-blue-600/30 text-slate-400 hover:text-white border border-[#1f2d47] items-center justify-center transition shrink-0"
            title="Прокрутить влево"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Categories List */}
          <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar flex-1 scroll-smooth">
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
                          ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                          : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                        : 'bg-[#0e1526] hover:bg-[#141f35] text-slate-300 border border-[#1e2a42]'
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

          {/* Right scroll arrow */}
          <button
            onClick={scrollRight}
            className="hidden sm:flex w-7 h-7 rounded-lg bg-[#0e1627] hover:bg-blue-600/30 text-slate-400 hover:text-white border border-[#1f2d47] items-center justify-center transition shrink-0"
            title="Прокрутить вправо"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Right Trust Mini-Badge (visible on wide screens) */}
          <div className="hidden 2xl:flex items-center shrink-0 text-xs pl-3 border-l border-[#1f2d47]">
            {storefrontMode === 'digital' ? (
              <span className="text-cyan-300 font-medium flex items-center gap-1.5 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Автовыдача 0 сек • Гарантия</span>
              </span>
            ) : (
              <span className="text-emerald-300 font-medium flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Escrow защита • Осмотр в ПВЗ</span>
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Specialized Quick Platform Chips (Digital Mode only) */}
        {storefrontMode === 'digital' && onSelectPlatform && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Monitor className="w-3 h-3 text-cyan-400" />
              Платформы:
            </span>
            {DIGITAL_PLATFORMS.map((plat) => {
              const isSelected = selectedPlatform === plat || (!selectedPlatform && plat === 'Все платформы');
              return (
                <button
                  key={plat}
                  onClick={() => onSelectPlatform(plat === 'Все платформы' ? undefined : plat)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition shrink-0 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-purple-600/90 text-white border border-purple-400/50 shadow-sm'
                      : 'bg-[#0a0f1d] hover:bg-[#131b2e] text-slate-400 hover:text-slate-200 border border-[#1b263b]'
                  }`}
                >
                  {plat}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
