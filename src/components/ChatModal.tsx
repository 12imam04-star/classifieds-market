import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCheck } from 'lucide-react';
import { Listing, Message } from '../types';

interface ChatModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  listing,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !listing) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-0',
      sender: 'system',
      text: 'Диалог защищен сервисом «Полка Защита». Не переходите по внешним ссылкам и не передавайте данные карт. Оформляйте заказ только через кнопку «Купить с защитой».',
      timestamp: '19:40',
      isDealEvent: true
    },
    {
      id: 'm-1',
      sender: 'seller',
      text: `Здравствуйте! Спасибо за интерес к лоту «${listing.title}». Чем могу помочь?`,
      timestamp: '19:41'
    }
  ]);

  const [inputText, setInputText] = useState('');

  const quickReplies = [
    'Здравствуйте! Лот ещё на Полке?',
    'Возможен ли небольшой торг?',
    'Сможете отправить Полка Доставкой сегодня?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate seller smart response
    setTimeout(() => {
      let sellerReply = 'Да, всё в наличии и в точности как в описании!';
      if (text.includes('торг')) {
        sellerReply = 'Цена уже минимальная с учетом отличного состояния, но при быстрой покупке сделаю символическую скидку 5%.';
      } else if (text.includes('отправить') || text.includes('доставк')) {
        sellerReply = 'Конечно, отправляю в день заказа через Полка Доставку! Упакую максимально надежно.';
      }

      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'seller',
        text: sellerReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-lg h-[620px] bg-[#101726] rounded-3xl shadow-2xl border border-[#1f2d47] overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="p-3 sm:p-4 border-b border-[#1f2d47] flex items-center justify-between bg-[#0c1220]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-10 h-10 rounded-full object-cover border border-[#1f2d47]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0c1220]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                {listing.seller.name}
              </h3>
              <p className="text-[11px] text-slate-400">
                В сети • Отвечает за {listing.seller.responseTime}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#162035] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listing Mini Bar */}
        <div className="px-4 py-2 bg-blue-950/20 border-b border-[#1f2d47] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <img src={listing.images[0]} alt="" className="w-7 h-7 rounded-lg object-cover" />
            <span className="truncate font-semibold text-slate-200">{listing.title}</span>
          </div>
          <span className="font-bold text-blue-400 shrink-0 ml-2">
            {listing.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
          {messages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="p-3 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-[11px] text-blue-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{msg.text}</span>
                </div>
              );
            }

            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm ${
                    isUser
                      ? 'bg-blue-600 text-white font-medium rounded-br-xs shadow-md shadow-blue-600/20'
                      : 'bg-[#0c1220] border border-[#1f2d47] text-white rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${isUser ? 'text-blue-100' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-blue-100" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Replies chips */}
        <div className="p-2 border-t border-[#1f2d47] flex gap-1.5 overflow-x-auto no-scrollbar bg-[#0c1220]/50">
          {quickReplies.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qr)}
              className="px-2.5 py-1 rounded-full bg-[#162035] border border-[#22324e] text-[11px] text-slate-300 hover:text-white hover:border-blue-500/50 shrink-0 transition"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-[#1f2d47] flex items-center gap-2 bg-[#0c1220]"
        >
          <input
            type="text"
            placeholder="Напишите сообщение продавцу..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#101726] border border-[#1f2d47] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition shadow-md shadow-blue-600/30 font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
