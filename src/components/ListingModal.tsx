import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Truck, 
  Eye, 
  Clock, 
  AlertCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { Listing } from '../types';

interface ListingModalProps {
  listing: Listing | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onStartSafeDeal: (listing: Listing) => void;
  onOpenChatWithSeller: (listing: Listing) => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  listing,
  onClose,
  isFavorite,
  onToggleFavorite,
  onStartSafeDeal,
  onOpenChatWithSeller,
}) => {
  if (!listing) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Объявление № {listing.id.toUpperCase()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {listing.views} просмотров
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {listing.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              title="Поделиться"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleFavorite(listing.id)}
              className={`p-2 rounded-xl transition ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/40' 
                  : 'text-slate-500 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'В избранном' : 'Добавить в избранное'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {copiedLink && (
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold text-center border border-blue-200 dark:border-blue-800">
              Ссылка на объявление скопирована в буфер обмена!
            </div>
          )}

          {/* Title and Top price */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {listing.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {listing.price.toLocaleString('ru-RU')} {listing.currency}
              </span>
              {listing.isVip && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  VIP объявление
                </span>
              )}
            </div>
          </div>

          {/* Main Grid: Gallery + Action Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <img
                  src={listing.images[activeImgIndex] || listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        idx === activeImgIndex
                          ? 'border-blue-600 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Location details */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{listing.city} {listing.metro ? `(${listing.metro})` : ''}</span>
              </div>
            </div>

            {/* Seller & Transaction Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Seller Trust Box (Avito & GGsel & Playerok blend) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={listing.seller.avatar}
                      alt={listing.seller.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                    />
                    {listing.seller.onlineStatus === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" title="В сети" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white truncate">
                      <span>{listing.seller.name}</span>
                      {listing.seller.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" title="Документы проверены" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{listing.seller.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{listing.seller.reviewsCount} отзывов</span>
                      <span>•</span>
                      <span>{listing.seller.dealsCount} сделок</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <div>
                    На платформе с <strong className="text-slate-700 dark:text-slate-300">{listing.seller.registeredYear} г.</strong>
                  </div>
                  <div>
                    Отвечает: <strong className="text-slate-700 dark:text-slate-300">{listing.seller.responseTime}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* Safe Deal Purchase button */}
                <button
                  onClick={() => onStartSafeDeal(listing)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition transform active:scale-95"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Купить с защитой (Escrow)</span>
                </button>

                {/* Chat button */}
                <button
                  onClick={() => onOpenChatWithSeller(listing)}
                  className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Написать продавцу</span>
                </button>

                {/* Show Phone Button (anti-scraping pattern like Avito) */}
                <button
                  onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  {isPhoneRevealed ? (
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +7 (916) 482-19-90
                    </span>
                  ) : (
                    <span>Показать телефон (+7 916 •••-••-90)</span>
                  )}
                </button>
              </div>

              {/* Escrow Guarantee Banner (Playerok / Avito Dostavka style) */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-300 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Безопасная сделка AvitoX
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ваши деньги надежно заблокированы на защищенном эскроу-счете. Продавец получит выплату только после того, как вы лично проверите товар или услугу.
                </p>
              </div>
            </div>
          </div>

          {/* Specifications table */}
          {Object.keys(listing.specs).length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Характеристики</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {Object.entries(listing.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">{key}:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Описание</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
