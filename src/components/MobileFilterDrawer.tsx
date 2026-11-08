import React from 'react';
import { 
  X, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  ArrowUpDown, 
  MapPin, 
  SlidersHorizontal,
  Monitor,
  Globe,
  Tag
} from 'lucide-react';
import { FilterState, StorefrontMode } from '../types';
import { CITIES, DIGITAL_PLATFORMS, DIGITAL_REGIONS } from '../data/mockData';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  totalFound: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  totalFound,
}) => {
  if (!isOpen) return null;

  const isDigital = filters.storefrontMode === 'digital';

  const CONDITIONS = [
    { id: 'all', label: 'Любое состояние' },
    { id: 'new', label: 'Новое (в упаковке)' },
    { id: 'perfect', label: 'Идеальное / Близко к новому' },
    { id: 'used', label: 'Б/У' }
  ];

  const SORT_OPTIONS = [
    { id: 'date_desc', label: 'По дате (свежие первые)' },
    { id: 'price_asc', label: 'Сначала дешевле' },
    { id: 'price_desc', label: 'Сначала дороже' },
    { id: 'rating_desc', label: 'По рейтингу продавца' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
      {/* Dark overlay backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Slide-up bottom sheet */}
      <div className="relative z-10 bg-[#0c1220] rounded-t-3xl border-t border-[#1f2d47] max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Pull bar */}
        <div className="w-12 h-1.5 rounded-full bg-slate-700/60 mx-auto my-3 shrink-0" />

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[#1b263b] shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className={`w-5 h-5 ${isDigital ? 'text-purple-400' : 'text-blue-400'}`} />
            <span className="font-black text-base text-white">
              {isDigital ? 'Фильтры Digital' : 'Фильтры лотов'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сбросить</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#162035] flex items-center justify-center text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Filters Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 1. Сортировка */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
              <span>Сортировка</span>
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f172a] border border-[#1f2d47] text-sm text-slate-200 focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[#0f172a] text-slate-200">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Диапазон цен */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Цена, ₽</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="number"
                placeholder="От"
                value={filters.minPrice ?? ''}
                onChange={(e) => onChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f172a] border border-[#1f2d47] text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="До"
                value={filters.maxPrice ?? ''}
                onChange={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f172a] border border-[#1f2d47] text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
              />
            </div>
            {/* Quick Price Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: 'до 1 500 ₽', max: 1500 },
                { label: 'до 5 000 ₽', max: 5000 },
                { label: 'до 20 000 ₽', max: 20000 },
                { label: 'до 100 000 ₽', max: 100000 }
              ].map(preset => (
                <button
                  key={preset.max}
                  type="button"
                  onClick={() => onChange({ minPrice: undefined, maxPrice: preset.max })}
                  className="px-2.5 py-1 rounded-lg bg-[#141d30] border border-[#22334e] text-[11px] text-slate-300 hover:text-white"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Город (Только для Classic) */}
          {!isDigital && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Город</span>
              </label>
              <select
                value={filters.city}
                onChange={(e) => onChange({ city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f172a] border border-[#1f2d47] text-sm text-slate-200 focus:outline-none"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city} className="bg-[#0f172a] text-slate-200">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 4. Digital Платформа (Только для Digital) */}
          {isDigital && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Платформа</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {DIGITAL_PLATFORMS.map((platform) => {
                  const isSelected = filters.digitalPlatform === platform || (!filters.digitalPlatform && platform === 'Все платформы');
                  return (
                    <button
                      key={platform}
                      onClick={() => onChange({ digitalPlatform: platform === 'Все платформы' ? undefined : platform })}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition ${
                        isSelected 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'bg-[#0f172a] text-slate-300 border border-[#1f2d47]'
                      }`}
                    >
                      {platform}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. Digital Регион (Только для Digital) */}
          {isDigital && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>Регион активации</span>
              </label>
              <select
                value={filters.digitalRegion || 'Все регионы'}
                onChange={(e) => onChange({ digitalRegion: e.target.value === 'Все регионы' ? undefined : e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f172a] border border-[#1f2d47] text-sm text-slate-200 focus:outline-none"
              >
                {DIGITAL_REGIONS.map((region) => (
                  <option key={region} value={region} className="bg-[#0f172a] text-slate-200">
                    {region}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 6. Состояние (Только для Classic) */}
          {!isDigital && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Состояние
              </label>
              <div className="space-y-1.5">
                {CONDITIONS.map((cond) => (
                  <label
                    key={cond.id}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#131c30] cursor-pointer text-xs text-slate-300 transition"
                  >
                    <input
                      type="radio"
                      name="mobile_condition"
                      checked={filters.condition === cond.id}
                      onChange={() => onChange({ condition: cond.id })}
                      className="w-4 h-4 text-blue-600 bg-[#0f172a] border-[#1f2d47] focus:ring-0"
                    />
                    <span>{cond.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 7. Безопасная сделка Toggle */}
          <div className="pt-2 border-t border-[#1b263b]">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 cursor-pointer">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-emerald-300">Полка Защита (Escrow)</div>
                  <div className="text-[10px] text-emerald-400/80">Только безопасные сделки с холдом</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={filters.onlySafeDeal}
                onChange={(e) => onChange({ onlySafeDeal: e.target.checked })}
                className="w-5 h-5 rounded text-emerald-500 bg-[#0f172a] border-emerald-500/50"
              />
            </label>
          </div>
        </div>

        {/* Drawer Sticky Footer with CTA */}
        <div className="p-4 border-t border-[#1b263b] bg-[#090d18] shrink-0">
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl text-white font-black text-sm shadow-xl transition active:scale-95 ${
              isDigital
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-purple-900/30'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
            }`}
          >
            Показать {totalFound} объявлений
          </button>
        </div>
      </div>
    </div>
  );
};
