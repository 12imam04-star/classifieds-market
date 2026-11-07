import React from 'react';
import { 
  Layers, 
  Smartphone, 
  Gamepad2, 
  Home, 
  Car, 
  Wrench, 
  Shirt 
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface CategoriesBarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />
};

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-[#0a0f1d] border-b border-[#1b263b] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-[#101726] hover:bg-[#162035] text-slate-300 border border-[#1f2d47]'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {ICON_MAP[cat.icon] || <Layers className="w-4 h-4" />}
                </span>
                <span>{cat.name}</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-blue-700/60 text-white' 
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
  );
};
