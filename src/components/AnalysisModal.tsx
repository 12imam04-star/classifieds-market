import React from 'react';
import { X, Layers, ShieldCheck, Zap, ExternalLink, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <h2 className="text-lg sm:text-xl font-black">
                Анализ стилей и архитектуры: Avito vs Playerok vs GGsel
              </h2>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              Сравнительный анализ дизайн-систем, UX-паттернов и их синтез в нашей платформе
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          
          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. AVITO */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-black text-base text-blue-600 dark:text-blue-400">1. Авито (Avito.ru)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">C2C / B2C Гигант</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <p><strong>Визуальный стиль:</strong> Светлый, лаконичный, контрастный. Фирменные цветные круги (синий, зеленый, фиолетовый). Белые карточки на светлом фоне, четкая сетка.</p>
                  <p><strong>Сильные стороны UX:</strong></p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Глубокое дерево категорий и фильтры по специфике.</li>
                    <li>Выбор городов и станций метро на карте.</li>
                    <li>Интерактивная галерея фото прямо на карточке (точки при наведении).</li>
                    <li>«Авито Доставка» и защита номера от спам-парсеров.</li>
                  </ul>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[11px] font-semibold">
                Внедрено: карточки с наведением фото, селектор городов, фильтры цен/состояния, маскировка номера.
              </div>
            </div>

            {/* 2. PLAYEROK */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-black text-base text-purple-600 dark:text-purple-400">2. Playerok.com</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">Gaming P2P</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <p><strong>Визуальный стиль:</strong> Темный, неоновый, молодежный, скругленные формы (rounded-2xl/3xl), яркие игровые плашки, динамичные карточки.</p>
                  <p><strong>Сильные стороны UX:</strong></p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Escrow-система: заморозка средств до проверки покупателем.</li>
                    <li>Встроенный чат сделки с авто-инструкциями.</li>
                    <li>Кнопка мгновенного арбитража/спора прямо в заказе.</li>
                    <li>Быстрое поднятие и VIP-статусы.</li>
                  </ul>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-[11px] font-semibold">
                Внедрено: полный Escrow-флоу сделки, статус удержания средств, встроенный чат, кнопка спора.
              </div>
            </div>

            {/* 3. GGSEL */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-black text-base text-emerald-600 dark:text-emerald-400">3. GGSel.net</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">Fast Checkout</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <p><strong>Визуальный стиль:</strong> Высококонверсионный интернет-магазин, контрастные кнопки CTA, бейджи автовыдачи, плотная компоновка.</p>
                  <p><strong>Сильные стороны UX:</strong></p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Покупка в 1 клик с выбором платежки (СБП, МИР, кошельки).</li>
                    <li>Прозрачная статистика продавца: число продаж, % отзывов, скорость ответа.</li>
                    <li>Четкое разделение «Автовыдача» vs «Вручную».</li>
                    <li>Удобный поиск по тегам и играм.</li>
                  </ul>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
                Внедрено: бейджи «Автовыдача», метрики доверия (сделки/отзывы/скорость), оплата СБП/картами.
              </div>
            </div>

          </div>

          {/* Synthesis Table */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Концепция созданной платформы (AvitoX)
            </h3>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Мы объединили универсальность и фильтрацию <strong>Авито</strong> с высокой конверсией и прозрачностью рейтингов <strong>GGSel</strong> и безопасной игровой Escrow-системой <strong>Playerok</strong>. Получилась современная доска объявлений, которая подходит как для физических товаров (авто, недвижимость, вещи), так и для цифровых услуг, игр и софта.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
