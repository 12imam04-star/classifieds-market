import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Clock
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

  const monthlySplit = listing.price >= 8000 ? Math.round(listing.price / 12).toLocaleString('ru-RU') : null;

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onClick(listing)}
        className="group relative bg-[#101726] rounded-2xl border border-[#1f2d47] shadow-lg hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#0c1220] shrink-0 relative">
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            {listing.isSafeDeal && (
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[9px] font-bold">
                Escrow
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-white tracking-tight">
                {formatPrice(listing.price, listing.currency)}
              </span>
              {monthlySplit && (
                <span className="text-xs text-slate-400 hidden sm:inline">
                  от {monthlySplit} ₽/мес в сплит
                </span>
              )}
            </div>

            <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-blue-400 transition-colors mt-0.5">
              {listing.title}
            </h3>

            {listing.isSafeDeal && (
              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Полка Защита (Escrow)</span>
              </div>
            )}

            <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {listing.city} {listing.metro ? `• ${listing.metro}` : ''}
              </span>
              <span>•</span>
              <span>{listing.date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1f2d47]">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <img src={listing.seller.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-slate-700" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-white">{listing.seller.name}</span>
                {listing.seller.isVerified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                )}
              </div>
              <div className="flex items-center text-amber-400 font-bold text-[11px]">
                <Star className="w-3 h-3 fill-amber-400 mr-1" />
                <span>{listing.seller.rating}</span>
                <span className="text-slate-400 ml-1">({listing.seller.reviewsCount})</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(listing.id);
            }}
            className={`p-2.5 rounded-xl transition backdrop-blur-md ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 border border-transparent'
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
      className="group relative bg-[#101726] rounded-2xl border border-[#1f2d47] shadow-xl hover:shadow-2xl hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Photo showcase area with hover segments */}
      <div 
        className="relative w-full aspect-[4/3] bg-[#0c1220] overflow-hidden"
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
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeImageIndex
                    ? 'w-5 bg-white shadow-md'
                    : 'w-1.5 bg-white/50 backdrop-blur-sm'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges on top of image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-20 pointer-events-none">
          {listing.isVip && (
            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-[10px] font-black shadow-md flex items-center gap-1 tracking-wide">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              VIP
            </span>
          )}
          {listing.isUrgent && (
            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-black shadow-md flex items-center gap-1 tracking-wide">
              <Zap className="w-3 h-3 fill-white" />
              Срочно
            </span>
          )}
          {listing.deliveryType === 'instant_digital' && (
            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black shadow-md flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-300" />
              Автовыдача
            </span>
          )}
        </div>

        {/* Circular Dark Frosted Glass Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-200 shadow-lg ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-rose-500/40'
              : 'bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-rose-400'
          }`}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Price & Monthly Split */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {formatPrice(listing.price, listing.currency)}
            </span>
            {monthlySplit && (
              <span className="text-[11px] text-slate-400 font-medium">
                от {monthlySplit} ₽/мес
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 mt-1 leading-snug group-hover:text-blue-400 transition-colors">
            {listing.title}
          </h3>

          {/* Safe Deal badge (Emerald Escrow) */}
          {listing.isSafeDeal && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Безопасная сделка (Escrow)</span>
            </div>
          )}
        </div>

        {/* Location & Seller Footer */}
        <div className="pt-2.5 border-t border-[#1f2d47] text-xs text-slate-400 space-y-1">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{listing.city} {listing.metro ? `• ${listing.metro}` : ''}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <span className="text-slate-400">{listing.date}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{listing.seller.rating}</span>
              <span className="text-slate-400 font-normal">({listing.seller.reviewsCount})</span>
              {listing.seller.isVerified && (
                <CheckCircle2 className="w-3 h-3 text-blue-400 ml-0.5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
