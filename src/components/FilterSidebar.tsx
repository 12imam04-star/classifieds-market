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
    <div className="bg-[#101726] rounded-2xl border border-[#1f2d47] p-4 sm:p-5 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#1f2d47]">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Фильтры</span>
          <span className="text-xs font-normal text-slate-400 bg-[#162035] px-2 py-0.5 rounded-full border border-[#22324e]">
            {totalFound}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          Сбросить
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <ArrowUpDown className="w-3 h-3 text-blue-400" />
          Сортировка
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as any })}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-[#0c1220] border border-[#1f2d47] rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="date_desc">По дате (свежие первые)</option>
          <option value="price_asc">Сначала дешевле</option>
          <option value="price_desc">Сначала дороже</option>
          <option value="rating_desc">По рейтингу продавца</option>
        </select>
      </div>

      {/* City */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Город / локация
        </label>
        <select
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-[#0c1220] border border-[#1f2d47] rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Цена, ₽
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="От"
            value={filters.minPrice ?? ''}
            onChange={(e) => onChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-1/2 px-3 py-2 text-xs sm:text-sm bg-[#0c1220] border border-[#1f2d47] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
          <span className="text-slate-500 text-xs">—</span>
          <input
            type="number"
            placeholder="До"
            value={filters.maxPrice ?? ''}
            onChange={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-1/2 px-3 py-2 text-xs sm:text-sm bg-[#0c1220] border border-[#1f2d47] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Состояние
        </label>
        <div className="space-y-1 text-xs">
          {[
            { id: 'all', label: 'Любое состояние' },
            { id: 'new', label: 'Новое (в упаковке)' },
            { id: 'perfect', label: 'Идеальное / Близко к новому' },
            { id: 'used', label: 'Б/У' },
            { id: 'digital', label: 'Цифровой товар / Ключ' },
          ].map((cond) => (
            <label
              key={cond.id}
              className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition ${
                filters.condition === cond.id 
                  ? 'bg-blue-600/15 text-blue-400 font-semibold' 
                  : 'text-slate-300 hover:bg-[#162035]'
              }`}
            >
              <input
                type="radio"
                name="condition"
                checked={filters.condition === cond.id}
                onChange={() => onChange({ condition: cond.id })}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-[#0c1220] border-[#1f2d47]"
              />
              <span>{cond.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Safe Deal Toggle Card */}
      <div className="pt-2 border-t border-[#1f2d47]">
        <label className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 cursor-pointer transition hover:bg-emerald-950/60">
          <input
            type="checkbox"
            checked={filters.onlySafeDeal}
            onChange={(e) => onChange({ onlySafeDeal: e.target.checked })}
            className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 mt-0.5 bg-[#0c1220] border-emerald-600"
          />
          <div>
            <div className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Безопасная сделка
            </div>
            <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
              100% Escrow Гарант: заморозка средств до проверки и подтверждения товара
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};
