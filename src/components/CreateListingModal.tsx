import React, { useState } from 'react';
import { X, Plus, ShieldCheck, Sparkles, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES, CITIES } from '../data/mockData';
import { Listing } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newListing: Listing) => void;
}

const PRESET_SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80'
];

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState<number | ''>('');
  const [city, setCity] = useState('Москва');
  const [metro, setMetro] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newListing: Listing = {
      id: `lot-${Date.now()}`,
      title: title.trim(),
      price: price === '' ? 0 : Number(price),
      currency: '₽',
      category,
      city,
      metro: metro.trim() ? `м. ${metro.trim()}` : undefined,
      date: 'Только что',
      views: 1,
      description: description.trim() || 'Описание лота не указано продавцом.',
      images: images.length > 0 ? images : [PRESET_SAMPLE_PHOTOS[0]],
      condition,
      isSafeDeal,
      deliveryType: category === 'gaming_digital' ? 'instant_digital' : 'delivery',
      isVip,
      seller: {
        id: 'current-user',
        name: 'Вы (Продавец на Полке)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        reviewsCount: 1,
        dealsCount: 1,
        isVerified: true,
        responseTime: '1 минута',
        registeredYear: 2026,
        onlineStatus: 'online',
      },
      specs: {
        'Категория': CATEGORIES.find(c => c.id === category)?.name || 'Разное',
        'Состояние': condition === 'new' ? 'Новое' : condition === 'perfect' ? 'Идеальное' : condition === 'used' ? 'Б/У' : 'Цифровой товар',
        'Размещение': isVip ? 'VIP Полка' : 'Бесплатное размещение'
      }
    };

    onCreated(newListing);
    onClose();
  };

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
              Бесплатная публикация лота за пару кликов
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
          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200">
              Название объявления / лота <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Например: Ноутбук MacBook Air M2 или Квартира у парка"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1220] border border-[#1f2d47] text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category & City row */}
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
                {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

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
          </div>

          {/* Metro & Price row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-200">
                Метро / Район (необязательно)
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
                Цена (₽) <span className="text-slate-400 font-normal">(0 = Бесплатно / Даром)</span>
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
          </div>

          {/* Condition */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200">
              Состояние
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'new', label: 'Новое' },
                { id: 'perfect', label: 'Идеальное' },
                { id: 'used', label: 'Б/У' },
                { id: 'digital', label: 'Цифровой' }
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCondition(c.id as any)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition ${
                    condition === c.id
                      ? 'border-blue-500 bg-blue-600/20 text-blue-300 font-bold'
                      : 'border-[#1f2d47] bg-[#0c1220] text-slate-300 hover:bg-[#162035]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-200 flex items-center justify-between">
              <span>Фотографии лота</span>
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
              <span>Или выберите образец:</span>
              {PRESET_SAMPLE_PHOTOS.slice(1, 4).map((preset, idx) => (
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
              placeholder="Расскажите подробнее о товаре, комплектации, причинах продажи и нюансах..."
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
                  Включить «Полка Защиту» (Escrow-гарант)
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
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Поставить на Полку бесплатно</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
