import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Zap, 
  Sparkles,
  Package
} from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (listing: Listing) => void;
  viewMode?: 'grid' | 'list';
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  isFavorite,
  onToggleFavorite,
  onClick,
  viewMode = 'grid',
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formatPrice = (num: number, currency: string) => {
    return `${num.toLocaleString('ru-RU')} ${currency}`;
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onClick(listing)}
        className="group relative bg-white dark:bg-[#151d2e] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-amber-400 dark:hover:border-amber-500/50 transition-all p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
            <img src={listing.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {formatPrice(listing.price, listing.currency)}
              </span>
              {listing.isSafeDeal && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  Полка Защита
                </span>
              )}
            </div>

            <h3 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mt-0.5">
              {listing.title}
            </h3>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5">
              <span>{listing.city} {listing.metro ? `• ${listing.metro}` : ''}</span>
              <span>•</span>
              <span>{listing.date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <img src={listing.seller.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
            <span className="font-medium truncate max-w-[100px]">{listing.seller.name}</span>
            <div className="flex items-center text-amber-500 font-bold ml-1">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[11px] ml-0.5">{listing.seller.rating}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(listing.id);
            }}
            className={`p-2 rounded-xl transition ${
              isFavorite
                ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/40'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(listing)}
      className="group relative bg-white dark:bg-[#151d2e] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500/50 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Photo carousel area with hover segments */}
      <div 
        className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden"
        onMouseLeave={() => setActiveImageIndex(0)}
      >
        <img
          src={listing.images[activeImageIndex] || listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover image segmentation zones if multiple images */}
        {listing.images.length > 1 && (
          <div className="absolute inset-0 flex z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {listing.images.map((_, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveImageIndex(idx)}
                className="flex-1 h-full"
              />
            ))}
          </div>
        )}

        {/* Image pagination dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-20 pointer-events-none">
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeImageIndex
                    ? 'w-4 bg-white shadow-sm'
                    : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges on top of image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-20 pointer-events-none">
          {listing.isVip && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-black shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              VIP Полка
            </span>
          )}
          {listing.isUrgent && (
            <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Срочно
            </span>
          )}
          {listing.deliveryType === 'instant_digital' && (
            <span className="px-2 py-0.5 rounded-lg bg-purple-600/95 backdrop-blur-sm text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300" />
              Автовыдача
            </span>
          )}
        </div>

        {/* Favorite Heart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-xl backdrop-blur-md transition shadow-sm ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-black/30 hover:bg-black/50 text-white hover:text-rose-400'
          }`}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatPrice(listing.price, listing.currency)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mt-1 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {listing.title}
          </h3>

          {/* Safe Deal badge */}
          {listing.isSafeDeal && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-200/50 dark:border-emerald-800/40">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Полка Защита (Escrow)</span>
            </div>
          )}
        </div>

        {/* Location & Date */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/70 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{listing.city} {listing.metro ? `• ${listing.metro}` : ''}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{listing.date}</span>
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{listing.seller.rating}</span>
              <span className="text-slate-400">({listing.seller.reviewsCount})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
