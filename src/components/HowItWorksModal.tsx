import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Truck, 
  Zap, 
  HelpCircle,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#151d2e] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black">
                  ПОЛКА Защита
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Гарант 100%
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Как работает система безопасных сделок и правила защиты
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          
          {/* 4 Steps Visual Flow */}
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              4 простых шага безопасной сделки
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs">1</span>
                  <span>Оформление и холд средств</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Покупатель оплачивает заказ (СБП 0%, банковской картой или T-Pay). Деньги замораживаются на защищенном эскроу-счете и не поступают продавцу.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span className="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs">2</span>
                  <span>Отправка или автовыдача</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Продавец видит подтвержденную оплату и отправляет посылку через службу доставки, либо система мгновенно выдает цифровой код в чат.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span className="w-6 h-6 rounded-lg bg-purple-500 text-white flex items-center justify-center text-xs">3</span>
                  <span>Личная проверка товара</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Покупатель забирает товар в пункте выдачи или проверяет цифровую привязку. На проверку дается 24 часа.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs">4</span>
                  <span>Выплата продавцу</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Только после подтверждения покупателя платформа переводит деньги на карту продавца. Все честно и прозрачно!
                </p>
              </div>
            </div>
          </div>

          {/* Two-Column Guarantee Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Buyer Protection */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Гарантии покупателю
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                <li>• 100% возврат денег, если товар не подошел или не был отправлен.</li>
                <li>• Возможность вскрыть и осмотреть посылку в пункте выдачи до подтверждения.</li>
                <li>• Продавцы проходят проверку документов (Паспорт / Госуслуги).</li>
              </ul>
            </div>

            {/* Seller Protection */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/40 space-y-2">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-blue-500" />
                Гарантии продавцу
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                <li>• Защита от неоплаты: отправка только после гарантированного резерва денег.</li>
                <li>• Страхование отправления на полную заявленную стоимость лота.</li>
                <li>• Автоматическое закрытие сделки по регламенту, если покупатель забыл подтвердить.</li>
              </ul>
            </div>
          </div>

          {/* Arbitration Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                Служба честного арбитража 24/7
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Если возникло разногласие (дефект, несоответствие описанию или нерабочий ключ), любой участник может нажать кнопку <strong>«Открыть спор»</strong> прямо в заказе. Администраторы платформы изучат фото и историю переписки и вынесут справедливое решение.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
