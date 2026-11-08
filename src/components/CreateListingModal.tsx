import React, { useState } from 'react';
import { X, Plus, ShieldCheck, Sparkles, Zap, ShoppingBag, Globe, Monitor } from 'lucide-react';
import { CLASSIC_CATEGORIES, DIGITAL_CATEGORIES, CITIES, DIGITAL_PLATFORMS, DIGITAL_REGIONS } from '../data/mockData';
import { Listing } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newListing: Listing) => void;
}

const PRESET_SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80'
];

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  if (!isOpen) return null;

  const [listingType, setListingType] = useState<'classic' | 'digital'>('classic');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState<number | ''>('');
  const [city, setCity] = useState('Москва');
  const [metro, setMetro] = useState('');
  const [platform, setPlatform] = useState('Steam');
  const [region, setRegion] = useState('Global (Без ограничений)');
  const [condition, setCondition] = useState<'new' | 'perfect' | 'used' | 'digital'>('perfect');
  const [description, setDescription] = useState('');
  const [isSafeDeal, setIsSafeDeal] = useState(true);
  const [isVip, setIsVip] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([PRESET_SAMPLE_PHOTOS[0]]);

  const handleAddSampleImage = (url: string) => {
    if (!images.includes(url)) {
      setImages([...images, url]);
    }
  };

  const handleAddCustomImage = () => {
    if (customImageUrl.trim()) {
      setImages([...images, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  // Fee calculation (transparent 3% fee)
  const numericPrice = typeof price === 'number' ? price : 0;
  const sellerPayout = numericPrice > 0 ? Math.round(numericPrice * 0.97) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const isDig = listingType === 'digital';

    const newListing: Listing = {
      id: `lot-${Date.now()}`,
      title: title.trim(),
      price: price === '' ? 0 : Number(price),
      currency: '₽',
      category: isDig ? category : category,
      city: isDig ? 'Все города' : city,
      metro: !isDig && metro.trim() ? `м. ${metro.trim()}` : undefined,
      date: 'Только что',
      views: 1,
      description: description.trim() || 'Описание лота не указано продавцом.',
      images: images.length > 0 ? images : [PRESET_SAMPLE_PHOTOS[0]],
      condition: isDig ? 'digital' : condition,
      isSafeDeal,
      deliveryType: isDig ? 'instant_digital' : 'delivery',
      isVip,
      isDigital: isDig,
      platform: isDig ? platform : undefined,
      region: isDig ? region : undefined,
      seller: {
        id: 'current-user',
        name: 'Вы (Продавец на Полке)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        reviewsCount: 1,
        dealsCount: 1,
        isVerified: true,
        responseTime: isDig ? 'Мгновенно (автовыдача)' : '5 минут',
        registeredYear: 2026,
        onlineStatus: 'online',
      },
      specs: isDig ? {
        'Тип товара': 'Цифровой лот (ПОЛКА Digital)',
        'Платформа': platform,
        'Регион': region,
        'Способ передачи': 'Мгновенная автовыдача в чат'
      } : {
        'Категория': CLASSIC_CATEGORIES.find(c => c.id === category)?.name || 'Товары',
        'Состояние': condition === 'new' ? 'Новое' : condition === 'perfect' ? 'Идеальное' : 'Б/У',
        'Размещение': isVip ? 'VIP Полка' : 'Бесплатное'
      }
    };

    onCreated(newListing);
    onClose();
  };

  const categoriesList = listingType === 'digital'
    ? DIGITAL_CATEGORIES.filter(c => c.id !== 'digital_all')
    : CLASSIC_CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#101726] rounded-3xl shadow-2xl border border-[#1f2d47] overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#1f2d47] flex items-center justify-between bg-[#0c1220]">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Разместить объявление на Полке
            </h2>
            <p className="text-xs text-slate-400">
              Выберите тип лота: физический товар или цифровой (подписки, ключи, аккаунты)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#162035] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {/* TYPE SELECTOR (Hybrid separation) */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-200">
              Тип витрины / размещения
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#0c1220] border border-[#1f2d47]">
              <button
                type="button"
                onClick={() => {
                  setListingType('classic');
                  setCategory('electronics');
                }}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  listingType === 'classic'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>🏬 Вещи, Техника, Авто</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setListingType('digital');
                  setCategory('digital_subs');
                }}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  listingType === 'digital'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                <Zap className="w-4 h-4 text-cyan-300" />
                <span>⚡ Digital (Подписки, Игры, Ключи)</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200">
              Название лота <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={
                listingType === 'digital'
                  ? "Например: Telegram Premium 12 месяцев (Gift Link) или Steam CS2 Prime"
                  : "Например: Ноутбук MacBook Air M2 16/256 или iPhone 15 Pro"
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-200">
                Категория
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
              >
                {categoriesList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* If Digital: Platform selection / If Classic: City selection */}
            {listingType === 'digital' ? (
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-200 flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5 text-purple-400" />
                  Платформа / Сервис
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-purple-500"
                >
                  {DIGITAL_PLATFORMS.filter(p => p !== 'Все платформы').map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-200">
                  Город размещения
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
                >
                  {CITIES.filter(c => c !== 'Все города').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* If Digital: Region & Delivery / If Classic: Metro & Condition */}
          {listingType === 'digital' ? (
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-200 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Регион активации
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-cyan-500"
              >
                {DIGITAL_REGIONS.filter(r => r !== 'Все регионы').map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-200">
                  Метро / Район
                </label>
                <input
                  type="text"
                  placeholder="Например: Арбатская или Центр"
                  value={metro}
                  onChange={(e) => setMetro(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-200">
                  Состояние товара
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="new">Новое (в упаковке)</option>
                  <option value="perfect">Идеальное / Близко к новому</option>
                  <option value="used">Б/У</option>
                </select>
              </div>
            </div>
          )}

          {/* Price & Seller Earnings Calculator */}
          <div className="space-y-2">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-200 flex items-center justify-between">
                <span>Цена продажи (₽)</span>
                {numericPrice > 0 && (
                  <span className="text-emerald-400 font-bold text-xs">
                    Вы получите: {sellerPayout.toLocaleString('ru-RU')} ₽ (комиссия всего 3%)
                  </span>
                )}
              </label>
              <input
                type="number"
                min="0"
                placeholder="0 ₽"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Transparent commission fee banner */}
            {listingType === 'digital' && numericPrice > 0 && (
              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>На ПОЛКЕ ваша выплата: <strong>{sellerPayout.toLocaleString('ru-RU')} ₽</strong> (комиссия всего 3%)</span>
                <span className="text-slate-400">На других площадках списывают до 20-25%</span>
              </div>
            )}
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-200 flex items-center justify-between">
              <span>Изображение лота</span>
              <span className="text-xs text-slate-400 font-normal">Добавлено: {images.length}</span>
            </label>

            {/* Current photos previews */}
            <div className="flex gap-2 flex-wrap">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-[#1f2d47] group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Custom URL */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Вставьте ссылку на изображение (URL)..."
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddCustomImage}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-semibold rounded-xl text-white transition"
              >
                Добавить
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs text-slate-400 pt-1">
              <span>Или выберите готовый образец:</span>
              {PRESET_SAMPLE_PHOTOS.slice(0, 4).map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleAddSampleImage(preset)}
                  className="px-2 py-0.5 rounded-md bg-[#0c1220] hover:bg-[#162035] border border-[#1f2d47] text-[11px] text-blue-400"
                >
                  Фото {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200">
              Описание лота
            </label>
            <textarea
              rows={3}
              placeholder="Расскажите подробнее о товаре, комплектации, способе передачи или гарантиях..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Safe Deal & VIP switches */}
          <div className="space-y-2 pt-2 border-t border-[#1f2d47]">
            <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 cursor-pointer">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">
                  Включить «Полка Защиту» (100% Escrow Гарант)
                </span>
              </div>
              <input
                type="checkbox"
                checked={isSafeDeal}
                onChange={(e) => setIsSafeDeal(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 cursor-pointer">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="font-semibold text-slate-200">
                    VIP статус (Золотая плашка)
                  </span>
                  <span className="text-[11px] text-slate-400 block">Поднятие в топ каталога</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isVip}
                onChange={(e) => setIsVip(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
              />
            </label>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              className={`w-full py-3.5 px-4 rounded-2xl text-white font-black text-sm shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 ${
                listingType === 'digital'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:opacity-95 shadow-purple-600/30'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-indigo-600/30'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>
                {listingType === 'digital' ? 'Поставить в ПОЛКА Digital' : 'Разместить на Полке бесплатно'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
