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
    <div className="bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                  {ICON_MAP[cat.icon] || <Layers className="w-4 h-4" />}
                </span>
                <span>{cat.name}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-normal ${
                  isActive 
                    ? 'bg-blue-700 text-blue-100' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
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
