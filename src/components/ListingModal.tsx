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
  Sparkles,
  Zap,
  Monitor,
  Globe,
  Lock,
  RotateCcw,
  Package,
  Truck
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

  const isDigital = listing.isDigital || listing.category.startsWith('digital_');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-4xl bg-[#0d1424] rounded-3xl shadow-2xl border overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-100 ${
          isDigital ? 'border-purple-500/40 shadow-purple-900/30' : 'border-blue-500/40 shadow-blue-900/30'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-3.5 sm:px-6 border-b border-[#1b263b] flex items-center justify-between bg-[#080d1a]">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-400">
            <span className="font-mono text-slate-300">#{listing.id.toUpperCase()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>{listing.views} просмотров</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{listing.date}</span>
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
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {copiedLink && (
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-300 text-xs font-semibold text-center border border-blue-500/30 animate-in fade-in">
              Ссылка на лот успешно скопирована!
            </div>
          )}

          {/* Title and Price */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {isDigital ? (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 text-cyan-300 text-[11px] font-black border border-purple-500/40 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-cyan-300" />
                  ПОЛКА Digital • Автовыдача 0 сек
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 text-[11px] font-black border border-blue-500/40 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-blue-400" />
                  Городская витрина
                </span>
              )}
              {listing.isVip && (
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  VIP лот
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {listing.title}
            </h1>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                {listing.price.toLocaleString('ru-RU')} {listing.currency}
              </span>
              {listing.price >= 8000 && (
                <span className="text-xs text-slate-400">
                  или от {Math.round(listing.price / 12).toLocaleString('ru-RU')} ₽/мес в рассрочку
                </span>
              )}
            </div>
          </div>

          {/* Main Grid: Gallery (7 cols) + Action Sidebar (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#070b16] border border-[#1f2d47] shadow-inner relative group">
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
                          ? isDigital ? 'border-cyan-400 shadow-md shadow-cyan-400/30' : 'border-blue-500 shadow-md shadow-blue-500/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Location or Digital Info Box */}
              <div className="p-3.5 rounded-2xl bg-[#090e1c] border border-[#1b263b] flex items-center justify-between text-xs sm:text-sm text-slate-300">
                {isDigital ? (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Автоматическая передача данных в приватный чат сразу после оплаты</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{listing.city} {listing.metro ? `(${listing.metro})` : ''}</span>
                  </div>
                )}
                {isDigital && listing.region && (
                  <span className="text-purple-300 font-bold bg-purple-950/60 px-2 py-0.5 rounded-lg border border-purple-500/30 text-xs">
                    {listing.region}
                  </span>
                )}
              </div>
            </div>

            {/* Action Sidebar Column */}
            <div className="lg:col-span-5 space-y-4">
              {/* Seller Trust Card */}
              <div className="p-4 rounded-2xl bg-[#090e1c] border border-[#1b263b] space-y-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={listing.seller.avatar}
                      alt={listing.seller.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#1f2d47] shadow-sm"
                    />
                    {listing.seller.onlineStatus === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#090e1c]" title="В сети" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 font-bold text-white truncate text-sm">
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

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-[#1b263b]">
                  <div>
                    На Полке с <strong className="text-slate-200">{listing.seller.registeredYear} г.</strong>
                  </div>
                  <div>
                    Отвечает: <strong className="text-slate-200">{listing.seller.responseTime}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* Main Purchase button */}
                <button
                  onClick={() => onStartSafeDeal(listing)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition transform active:scale-95 ${
                    isDigital
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-purple-900/30'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25'
                  }`}
                >
                  {isDigital ? (
                    <>
                      <Zap className="w-5 h-5 text-cyan-200" />
                      <span>Купить с автовыдачей (0 сек)</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Купить с Полка Защитой</span>
                    </>
                  )}
                </button>

                {/* Chat button */}
                <button
                  onClick={() => onOpenChatWithSeller(listing)}
                  className="w-full py-3 px-4 rounded-2xl bg-[#141f35] hover:bg-blue-600 text-white font-bold text-sm shadow-md border border-[#22334e] hover:border-blue-500 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400 group-hover:text-white" />
                  <span>Написать продавцу</span>
                </button>

                {/* Phone button (only for physical goods) */}
                {!isDigital && (
                  <button
                    onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-[#090e1c] hover:bg-[#141f35] border border-[#1b263b] text-slate-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    {isPhoneRevealed ? (
                      <span className="font-mono font-bold text-emerald-400">
                        +7 (916) 482-19-90
                      </span>
                    ) : (
                      <span>Показать номер (+7 916 •••-••-90)</span>
                    )}
                  </button>
                )}
              </div>

              {/* Escrow Guarantee Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Безопасная сделка (Escrow Гарант)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isDigital 
                    ? 'Ваши средства холдируются на защищенном банковском счете на 24 часа. Продавец получает деньги только после того, как вы проверите ключ/аккаунт и смените привязки.'
                    : 'Деньги замораживаются до момента личного осмотра товара в пункте выдачи СДЭК/Boxberry. Если товар не подошел — 100% возврат средств.'}
                </p>
              </div>
            </div>
          </div>

          {/* Specifications table */}
          {Object.keys(listing.specs).length > 0 && (
            <div className="pt-4 border-t border-[#1b263b] space-y-3">
              <h3 className="font-bold text-white text-base">Характеристики и параметры</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {Object.entries(listing.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-2.5 rounded-xl bg-[#090e1c] border border-[#1b263b]">
                    <span className="text-slate-400">{key}:</span>
                    <span className="font-semibold text-white text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="pt-4 border-t border-[#1b263b] space-y-2">
            <h3 className="font-bold text-white text-base">Описание лота</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#090e1c] p-4 rounded-2xl border border-[#1b263b]">
              {listing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
