import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Package, 
  Star, 
  CheckCircle2
} from 'lucide-react';
import { Listing } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  myListings: Listing[];
  favoritesCount: number;
  onOpenListing: (listing: Listing) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  myListings,
  favoritesCount,
  onOpenListing,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'listings' | 'escrow'>('listings');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#151d2e] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md font-black text-xl">
              П
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-base">
                <span>Имам (Личный кабинет на Полке)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" title="Верифицирован" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Паспорт и Госуслуги подтверждены • ID 849201
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance & Stats cards */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
              <div className="text-[11px] text-amber-700 dark:text-amber-400 font-bold uppercase">Баланс кошелька</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">12 450 ₽</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Доступно к выводу</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">Полка Защита (Escrow)</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">0 ₽</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Заблокировано в сделках</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
              <div className="text-[11px] text-purple-700 dark:text-purple-400 font-bold uppercase">Рейтинг продавца</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                5.0
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">100% довольных клиентов</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
                activeTab === 'listings'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Мои лоты на Полке ({myListings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('escrow')}
              className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
                activeTab === 'escrow'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>История безопасных заказов</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'listings' && (
            <div className="space-y-3">
              {myListings.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
                  У вас пока нет активных лотов. Нажмите «Поставить на Полку», чтобы разместить первое объявление.
                </div>
              ) : (
                myListings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onOpenListing(item);
                      onClose();
                    }}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 flex items-center justify-between gap-3 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">{item.title}</h4>
                        <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">{item.price.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold shrink-0">
                      На Полке
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'escrow' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Все сделки завершены успешно
              </div>
              <p>
                Покупки и продажи с использованием «Полка Защиты» застрахованы и хранятся в архиве.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
