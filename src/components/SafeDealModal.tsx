import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertTriangle,
  QrCode,
  ArrowRight,
  Lock
} from 'lucide-react';
import { Listing } from '../types';

interface SafeDealModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteDeal: (listing: Listing) => void;
}

type DealStep = 'payment' | 'holding' | 'verification' | 'completed' | 'dispute';

export const SafeDealModal: React.FC<SafeDealModalProps> = ({
  listing,
  isOpen,
  onClose,
  onCompleteDeal,
}) => {
  if (!isOpen || !listing) return null;

  const [step, setStep] = useState<DealStep>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card' | 'tpay'>('sbp');
  const [deliveryAddress, setDeliveryAddress] = useState('г. Москва, ул. Арбат, д. 12, кв. 45');

  const handlePay = () => {
    setStep('holding');
    setTimeout(() => {
      setStep('verification');
    }, 2200);
  };

  const handleConfirmReceived = () => {
    setStep('completed');
    onCompleteDeal(listing);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-[#151d2e] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-emerald-500/10 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                Полка Защита
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">Escrow 100%</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Защита покупателя и продавца на всех этапах сделки
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

        {/* Step Indicator */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span className={step === 'payment' ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-emerald-500'}>
              1. Оплата
            </span>
            <span>→</span>
            <span className={step === 'holding' ? 'text-amber-600 dark:text-amber-400 font-bold' : step === 'verification' || step === 'completed' ? 'text-emerald-500' : ''}>
              2. Холд средств
            </span>
            <span>→</span>
            <span className={step === 'verification' ? 'text-amber-600 dark:text-amber-400 font-bold' : step === 'completed' ? 'text-emerald-500' : ''}>
              3. Проверка лота
            </span>
            <span>→</span>
            <span className={step === 'completed' ? 'text-emerald-500 font-bold' : ''}>
              4. Выплата продавцу
            </span>
          </div>
        </div>

        {/* Content per Step */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          {/* Item Preview */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">
                {listing.title}
              </h4>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Продавец: <strong className="text-slate-700 dark:text-slate-200">{listing.seller.name}</strong>
              </div>
              <div className="text-sm font-black text-amber-600 dark:text-amber-400 mt-1">
                {listing.price.toLocaleString('ru-RU')} {listing.currency}
              </div>
            </div>
          </div>

          {/* STEP 1: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-200">
                  Способ получения / Доставка
                </label>
                {listing.deliveryType === 'instant_digital' ? (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Мгновенная цифровая выдача прямо в защищенный чат сделки сразу после оплаты.</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Адрес пункта выдачи Полка Доставки (СДЭК / Boxberry)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                )}
              </div>

              {/* Payment methods */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-200">
                  Выберите способ оплаты
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sbp')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'sbp'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span>СБП 0%</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    <span>МИР / Visa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tpay')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'tpay'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Lock className="w-5 h-5 text-amber-500" />
                    <span>T-Pay</span>
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  Как работает гарант «Полка Защита»:
                </div>
                <p>1. Деньги списываются, но блокируются на защищенном эскроу-счете банка-партнера.</p>
                <p>2. Продавец отправляет вам лот.</p>
                <p>3. Вы проверяете товар лично. Только после вашего подтверждения деньги поступают продавцу.</p>
              </div>

              <button
                onClick={handlePay}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Оплатить {listing.price.toLocaleString('ru-RU')} ₽ в Полка Защиту</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: HOLDING */}
          {step === 'holding' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto animate-pulse">
                <Clock className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Средства зарезервированы в «Полка Защита»
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  Уведомляем продавца <strong>{listing.seller.name}</strong> о необходимости отправки товара...
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: VERIFICATION */}
          {step === 'verification' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  Товар доставлен / передан продавцом!
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Пожалуйста, проверьте лот, комплектность или данные авторизации. У вас есть 24 часа на подтверждение.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleConfirmReceived}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Я проверил лот, всё отлично (Перевести деньги продавцу)</span>
                </button>

                <button
                  onClick={() => setStep('dispute')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Есть претензии (Открыть спор / Арбитраж Полки)</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: COMPLETED */}
          {step === 'completed' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Сделка успешно завершена!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  Средства переведены продавцу. Спасибо за использование «Полка Защиты»! Оставьте отзыв о продавце.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold rounded-xl text-xs"
              >
                Закрыть окно
              </button>
            </div>
          )}

          {/* DISPUTE STATE */}
          {step === 'dispute' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-300 space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Арбитраж и спор по сделке на Полке
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Выплата продавцу заморожена до выяснения обстоятельств арбитражем сервиса. Опишите проблему (дефект, нерабочий ключ, некомплект).
                </p>
              </div>

              <textarea
                rows={3}
                placeholder="Опишите суть проблемы для администратора сервиса..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => alert('Претензия направлена в службу арбитража платформы ПОЛКА.')}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 text-white font-bold text-xs"
                >
                  Отправить претензию в арбитраж
                </button>
                <button
                  onClick={() => setStep('verification')}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs"
                >
                  Назад
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
