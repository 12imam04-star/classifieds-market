import React from 'react';
import { Filter, RotateCcw, ShieldCheck, ArrowUpDown } from 'lucide-react';
import { CITIES } from '../data/mockData';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  totalFound: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalFound,
}) => {
  return (
    <div className="bg-white dark:bg-[#151d2e] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Фильтры Полки</span>
          <span className="text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {totalFound}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-amber-500 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          Сбросить
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
          Сортировка лотов
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as any })}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="date_desc">По дате (свежие на Полке)</option>
          <option value="price_asc">По возрастанию цены</option>
          <option value="price_desc">По убыванию цены</option>
          <option value="rating_desc">По рейтингу продавца</option>
        </select>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Город / Локация
        </label>
        <select
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Цена лота, ₽
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="От"
            value={filters.minPrice ?? ''}
            onChange={(e) => onChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-1/2 px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span className="text-slate-400 text-xs">—</span>
          <input
            type="number"
            placeholder="До"
            value={filters.maxPrice ?? ''}
            onChange={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-1/2 px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Состояние
        </label>
        <div className="space-y-1.5 text-xs sm:text-sm">
          {[
            { id: 'all', label: 'Любое состояние' },
            { id: 'new', label: 'Новое (в упаковке)' },
            { id: 'perfect', label: 'Идеальное' },
            { id: 'used', label: 'Б/У' },
            { id: 'digital', label: 'Цифровой товар / Ключ' },
          ].map((cond) => (
            <label
              key={cond.id}
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <input
                type="radio"
                name="condition"
                checked={filters.condition === cond.id}
                onChange={() => onChange({ condition: cond.id })}
                className="w-4 h-4 text-amber-500 focus:ring-amber-500 dark:bg-slate-900"
              />
              <span>{cond.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Safe Deal Toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
        <label className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 cursor-pointer transition hover:bg-emerald-50 dark:hover:bg-emerald-950/50">
          <input
            type="checkbox"
            checked={filters.onlySafeDeal}
            onChange={(e) => onChange({ onlySafeDeal: e.target.checked })}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 mt-0.5"
          />
          <div>
            <div className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Полка Защита
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
              С резервированием средств (Escrow 100%) и личной проверкой
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};
