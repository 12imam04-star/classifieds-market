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
  Eye, 
  Clock, 
  Sparkles
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#101726] rounded-3xl shadow-2xl border border-[#1f2d47] overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-[#1f2d47] flex items-center justify-between bg-[#0c1220]">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Лот № {listing.id.toUpperCase()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              {listing.views} просмотров
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {listing.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#162035] transition"
              title="Поделиться"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleFavorite(listing.id)}
              className={`p-2 rounded-xl transition ${
                isFavorite 
                  ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' 
                  : 'text-slate-400 hover:text-rose-400 hover:bg-[#162035]'
              }`}
              title={isFavorite ? 'В избранном' : 'Добавить в избранное'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#162035] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {copiedLink && (
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-300 text-xs font-semibold text-center border border-blue-500/30">
              Ссылка на лот скопирована в буфер обмена!
            </div>
          )}

          {/* Title and Top price */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {listing.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {listing.price.toLocaleString('ru-RU')} {listing.currency}
              </span>
              {listing.isVip && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  VIP лот на Полке
                </span>
              )}
            </div>
          </div>

          {/* Main Grid: Gallery + Action Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0c1220] border border-[#1f2d47]">
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
                          ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Location details */}
              <div className="p-3.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{listing.city} {listing.metro ? `(${listing.metro})` : ''}</span>
              </div>
            </div>

            {/* Seller & Transaction Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Seller Trust Box */}
              <div className="p-4 rounded-2xl bg-[#0c1220] border border-[#1f2d47] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={listing.seller.avatar}
                      alt={listing.seller.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-sm"
                    />
                    {listing.seller.onlineStatus === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0c1220]" title="В сети" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 font-bold text-white truncate">
                      <span>{listing.seller.name}</span>
                      {listing.seller.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" title="Документы проверены" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{listing.seller.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{listing.seller.reviewsCount} отзывов</span>
                      <span>•</span>
                      <span>{listing.seller.dealsCount} сделок</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-[#1f2d47]">
                  <div>
                    На Полке с <strong className="text-white">{listing.seller.registeredYear} г.</strong>
                  </div>
                  <div>
                    Отвечает: <strong className="text-white">{listing.seller.responseTime}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* Safe Deal Purchase button */}
                <button
                  onClick={() => onStartSafeDeal(listing)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition transform active:scale-95"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Купить с защитой (Полка Защита)</span>
                </button>

                {/* Chat button */}
                <button
                  onClick={() => onOpenChatWithSeller(listing)}
                  className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Написать продавцу</span>
                </button>

                {/* Show Phone Button */}
                <button
                  onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-[#0c1220] hover:bg-[#162035] border border-[#1f2d47] text-slate-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  {isPhoneRevealed ? (
                    <span className="font-mono font-bold text-emerald-400">
                      +7 (916) 482-19-90
                    </span>
                  ) : (
                    <span>Показать телефон (+7 916 •••-••-90)</span>
                  )}
                </button>
              </div>

              {/* Escrow Guarantee Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Безопасная сделка «Полка Защита»
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Ваши деньги заблокированы на защищенном эскроу-счете до момента, пока вы лично не проверите товар в пункте выдачи или данные доступа.
                </p>
              </div>
            </div>
          </div>

          {/* Specifications table */}
          {Object.keys(listing.specs).length > 0 && (
            <div className="pt-4 border-t border-[#1f2d47] space-y-3">
              <h3 className="font-bold text-white text-base">Характеристики лота</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {Object.entries(listing.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-2 rounded-xl bg-[#0c1220] border border-[#1f2d47]">
                    <span className="text-slate-400">{key}:</span>
                    <span className="font-semibold text-white text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="pt-4 border-t border-[#1f2d47] space-y-2">
            <h3 className="font-bold text-white text-base">Описание от продавца</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
