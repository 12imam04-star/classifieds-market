import { Listing, Category, NotificationItem } from '../types';

export const CLASSIC_CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'Все разделы',
    icon: 'Layers',
    count: 142,
    subcategories: []
  },
  {
    id: 'electronics',
    name: 'Электроника',
    icon: 'Smartphone',
    count: 58,
    subcategories: ['Смартфоны', 'Ноутбуки', 'Компьютеры и комплектующие', 'Телевизоры', 'Аудио']
  },
  {
    id: 'real_estate',
    name: 'Недвижимость',
    icon: 'Home',
    count: 32,
    subcategories: ['Квартиры посуточно', 'Долгосрочная аренда', 'Продажа вторички', 'Дома и дачи']
  },
  {
    id: 'auto',
    name: 'Транспорт',
    icon: 'Car',
    count: 24,
    subcategories: ['Автомобили с пробегом', 'Новые авто', 'Мотоциклы', 'Запчасти']
  },
  {
    id: 'services',
    name: 'Услуги',
    icon: 'Wrench',
    count: 18,
    subcategories: ['Ремонт техники', 'Бытовые услуги', 'Обучение и курсы', 'Грузоперевозки']
  },
  {
    id: 'fashion',
    name: 'Личные вещи',
    icon: 'Shirt',
    count: 10,
    subcategories: ['Одежда', 'Обувь', 'Аксессуары', 'Часы']
  }
];

export const DIGITAL_CATEGORIES: Category[] = [
  {
    id: 'digital_all',
    name: 'Все цифровые лоты',
    icon: 'Zap',
    count: 94,
    subcategories: [],
    isDigitalOnly: true
  },
  {
    id: 'digital_subs',
    name: 'Подписки и нейросети',
    icon: 'Sparkles',
    count: 28,
    subcategories: ['Telegram Premium', 'ChatGPT Plus & ИИ', 'Spotify Premium', 'VPN сервисы', 'YouTube Premium'],
    isDigitalOnly: true
  },
  {
    id: 'digital_accounts',
    name: 'Игровые аккаунты',
    icon: 'Gamepad2',
    count: 34,
    subcategories: ['Steam & CS2', 'Brawl Stars', 'Roblox', 'Genshin Impact', 'Valorant', 'Epic Games'],
    isDigitalOnly: true
  },
  {
    id: 'digital_currency',
    name: 'Донат и валюта',
    icon: 'Coins',
    count: 18,
    subcategories: ['Робуксы (Roblox)', 'V-Bucks Fortnite', 'Гемы Brawl Stars', 'Пополнение Steam'],
    isDigitalOnly: true
  },
  {
    id: 'digital_keys',
    name: 'Ключи и лицензии',
    icon: 'Key',
    count: 14,
    subcategories: ['Windows 11 / 10', 'Microsoft Office', 'Steam ключи', 'Антивирусы'],
    isDigitalOnly: true
  }
];

export const DIGITAL_PLATFORMS = [
  'Все платформы',
  'Steam',
  'Telegram',
  'Roblox',
  'PlayStation',
  'Xbox',
  'Brawl Stars',
  'AI / Нейросети',
  'Windows / Софт',
  'Spotify'
];

export const DIGITAL_REGIONS = [
  'Все регионы',
  'Global (Без ограничений)',
  'Россия и СНГ',
  'Турция (TR)',
  'Казахстан (KZ)',
  'США (US)'
];

export const CITIES = [
  'Все города',
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Екатеринбург',
  'Новосибирск',
  'Нижний Новгород',
  'Краснодар'
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Безопасная сделка подтверждена',
    description: 'Оплата по заказу «Telegram Premium 12 месяцев» заморожена на эскроу-счете. Автовыдача сработала успешно.',
    time: '5 минут назад',
    type: 'deal',
    read: false
  },
  {
    id: 'n-2',
    title: 'Новый отзыв с оценкой 5.0 ⭐',
    description: 'Покупатель Максим поблагодарил вас за мгновенную выдачу ключа активации.',
    time: '1 час назад',
    type: 'system',
    read: false
  },
  {
    id: 'n-3',
    title: 'Лот выставлен на Полку',
    description: 'Ваш цифровой лот прошел мгновенную проверку и готов к автовыдаче.',
    time: '3 часа назад',
    type: 'system',
    read: true
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  // ===================== ЦИФРОВЫЕ ТОВАРЫ (ПОЛКА DIGITAL) =====================
  {
    id: 'item-digital-1',
    title: 'Telegram Premium на 12 месяцев (Активация подарком / Без входа)',
    price: 2490,
    currency: '₽',
    category: 'digital_subs',
    subcategory: 'Telegram Premium',
    city: 'Все города',
    date: 'Сегодня в 13:40',
    views: 1850,
    description: 'Официальная подписка Telegram Premium на 1 год через подарочный сертификат (Gift Link). Вход в ваш аккаунт НЕ требуется! Никаких рисков бана или слета. Гарантия на весь срок действия подписки. Активация за 1-2 минуты после оплаты. Безопасная сделка «Полка Защита»: подтверждаете заказ только тогда, когда у вас загорелась звездочка Premium в профиле.',
    images: [
      'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isVip: true,
    isDigital: true,
    platform: 'Telegram',
    region: 'Global (Без ограничений)',
    seller: {
      id: 'seller-dig-1',
      name: 'KeyStore Official',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
      rating: 4.99,
      reviewsCount: 4320,
      dealsCount: 6800,
      isVerified: true,
      responseTime: 'Мгновенно (автовыдача)',
      registeredYear: 2021,
      onlineStatus: 'online'
    },
    specs: {
      'Тип товара': 'Подписка Gift Link (Без пароля)',
      'Срок подписки': '12 месяцев (1 год)',
      'Платформа': 'Telegram',
      'Регион': 'Global (Любой аккаунт)',
      'Выдача': 'Автовыдача за 3 секунды в чат'
    }
  },
  {
    id: 'item-digital-2',
    title: 'ChatGPT Plus (GPT-4o) + DALL-E 3 на 1 месяц (Персональный доступ + Почта)',
    price: 1890,
    currency: '₽',
    category: 'digital_subs',
    subcategory: 'ChatGPT Plus & ИИ',
    city: 'Все города',
    date: 'Сегодня в 14:15',
    views: 1240,
    description: 'Индивидуальный аккаунт ChatGPT Plus с оплаченной подпиской на 30 дней. Полный доступ к моделям GPT-4o, генератору изображений DALL-E 3, плагинам и анализу данных. Вы получаете логин и пароль от аккаунта и родной почты (первые руки, без соседей). Работает стабильно из любой точки мира. Гарантия замены на весь срок.',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isVip: true,
    isDigital: true,
    platform: 'AI / Нейросети',
    region: 'Global (Без ограничений)',
    seller: {
      id: 'seller-dig-2',
      name: 'AI_Market_PRO',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 940,
      dealsCount: 1250,
      isVerified: true,
      responseTime: '1 минута',
      registeredYear: 2022,
      onlineStatus: 'online'
    },
    specs: {
      'Сервис': 'OpenAI ChatGPT Plus',
      'Модели': 'GPT-4o, DALL-E 3, Voice Mode',
      'Тип аккаунта': 'Индивидуальный (Личный)',
      'Гарантия': '30 дней',
      'Выдача': 'Автовыдача данных в чат'
    }
  },
  {
    id: 'item-digital-3',
    title: 'Steam Аккаунт CS2 (Prime статус, 2500+ часов, Медали, Faceit 8 LVL)',
    price: 14500,
    currency: '₽',
    category: 'digital_accounts',
    subcategory: 'Steam & CS2',
    city: 'Все города',
    date: 'Сегодня в 12:10',
    views: 920,
    description: 'Личный аккаунт Steam с первой почтой и чеками первых покупок. CS2 Prime статус, рейтинг 18,500 Premier, звание Faceit LVL 8. В инвентаре: нож Bowie Knife Damascus Steel, AK-47 Slate StatTrak, перчатки. Мгновенная передача данных через защищенный шлюз платформы ПОЛКА. Деньги холдируются до полной смены почты и пароля покупателем.',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isUrgent: true,
    isDigital: true,
    platform: 'Steam',
    region: 'Россия и СНГ',
    seller: {
      id: 'seller-dig-3',
      name: 'DigitalShop Prime',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      rating: 4.98,
      reviewsCount: 1420,
      dealsCount: 1890,
      isVerified: true,
      responseTime: 'Мгновенно',
      registeredYear: 2020,
      onlineStatus: 'online'
    },
    specs: {
      'Платформа': 'Steam',
      'Игры': 'Counter-Strike 2 (Prime), GTA V',
      'Родная почта': 'Да, полная передача',
      'Гарантия': 'Пожизненная',
      'Регион': 'Россия и СНГ'
    }
  },
  {
    id: 'item-digital-4',
    title: 'Roblox Робуксы 2 000 R$ (Моментальный трансфер через Gamepass / С компенсацией комиссии)',
    price: 1490,
    currency: '₽',
    category: 'digital_currency',
    subcategory: 'Робуксы (Roblox)',
    city: 'Все города',
    date: 'Сегодня в 15:00',
    views: 2100,
    description: 'Покупка 2 000 Robux чистым трансфером через покупку вашего геймпасса. Налог Roblox 30% полностью покрывается за мой счет (вы получаете ровно 2 000 R$ чистыми на баланс!). Белый метод, никаких списаний или банов. Быстрая инструкция в чате.',
    images: [
      'https://images.unsplash.com/photo-1612287232230-65e9b8676d49?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isDigital: true,
    platform: 'Roblox',
    region: 'Global (Без ограничений)',
    seller: {
      id: 'seller-dig-4',
      name: 'RobloxHub 24/7',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 3100,
      dealsCount: 4800,
      isVerified: true,
      responseTime: '3 минуты',
      registeredYear: 2021,
      onlineStatus: 'online'
    },
    specs: {
      'Игра': 'Roblox',
      'Количество': '2 000 Robux чистыми',
      'Способ передачи': 'Gamepass transfer',
      'Налог 30%': 'Покрывается продавцом',
      'Безопасность': '100% Escrow Гарант'
    }
  },
  {
    id: 'item-digital-5',
    title: 'Brawl Stars Аккаунт (42 000 кубков, 72 бойца, 15 гиперзарядов, Эксклюзивные скины)',
    price: 3490,
    currency: '₽',
    category: 'digital_accounts',
    subcategory: 'Brawl Stars',
    city: 'Все города',
    date: 'Сегодня в 11:20',
    views: 1650,
    description: 'Прокачанный личный аккаунт Brawl Stars с полной перепривязкой Supercell ID на вашу почту. 42k кубков, 72 бойца, множество редких архивных скинов (Звездная Шелли, Феникс Ворон, Меха Ворон). Перепривязка в прямом эфире в чате «Полка Защита».',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isDigital: true,
    platform: 'Brawl Stars',
    region: 'Global (Без ограничений)',
    seller: {
      id: 'seller-dig-5',
      name: 'Supercell Trader',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      reviewsCount: 512,
      dealsCount: 680,
      isVerified: true,
      responseTime: '5 минут',
      registeredYear: 2022,
      onlineStatus: 'online'
    },
    specs: {
      'Кубки': '42 000+',
      'Бойцы': '72 из 78',
      'Привязка': 'Supercell ID на вашу почту',
      'Скины': 'Более 140 скинов',
      'Гарантия': 'Бессрочная'
    }
  },
  {
    id: 'item-digital-6',
    title: 'Spotify Premium на 12 месяцев (Индивидуальный тариф / Без слетов / Любой аккаунт)',
    price: 1290,
    currency: '₽',
    category: 'digital_subs',
    subcategory: 'Spotify Premium',
    city: 'Все города',
    date: 'Сегодня в 10:00',
    views: 890,
    description: 'Индивидуальная премиум-подписка Spotify на 1 год. Никаких семейных групп и риска слета. Высочайшее качество звука (Very High 320 kbps), скачивание треков офлайн, отсутствие рекламы. Активируем на ваш существующий аккаунт с сохранением всех плейлистов или выдаем готовый.',
    images: [
      'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isDigital: true,
    platform: 'Spotify',
    region: 'Турция (TR)',
    seller: {
      id: 'seller-dig-1',
      name: 'KeyStore Official',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
      rating: 4.99,
      reviewsCount: 4320,
      dealsCount: 6800,
      isVerified: true,
      responseTime: 'Мгновенно (автовыдача)',
      registeredYear: 2021,
      onlineStatus: 'online'
    },
    specs: {
      'Сервис': 'Spotify Premium Individual',
      'Длительность': '12 месяцев',
      'Качество': '320 kbps Lossless ready',
      'Сохранение треков': 'Да, все плейлисты остаются',
      'Гарантия': '365 дней'
    }
  },
  {
    id: 'item-digital-7',
    title: 'Windows 11 Pro / 10 Pro Retail Ключ активации (Бессрочная онлайн-лицензия)',
    price: 490,
    currency: '₽',
    category: 'digital_keys',
    subcategory: 'Windows 11 / 10',
    city: 'Все города',
    date: 'Сегодня в 09:30',
    views: 2400,
    description: 'Оригинальный 25-значный лицензионный ключ активации Windows 11 Pro / Windows 10 Pro. Тип лицензии: Retail (привязывается к учетной записи Microsoft и материнской плате, не слетает при переустановке ОС). Официальная онлайн-активация с серверов Microsoft. Автовыдача ключа сразу после оплаты в чат заказа.',
    images: [
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isDigital: true,
    platform: 'Windows / Софт',
    region: 'Global (Без ограничений)',
    seller: {
      id: 'seller-dig-2',
      name: 'AI_Market_PRO',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 940,
      dealsCount: 1250,
      isVerified: true,
      responseTime: 'Автовыдача 0 сек',
      registeredYear: 2022,
      onlineStatus: 'online'
    },
    specs: {
      'Продукт': 'Windows 11 Pro (или Win 10 Pro)',
      'Тип ключа': 'Retail (Бессрочная лицензия)',
      'Язык': 'Мультиязычная (русский есть)',
      'Разрядность': 'x32 / x64',
      'Выдача': 'Мгновенно в чат заказа'
    }
  },

  // ===================== ФИЗИЧЕСКИЕ ТОВАРЫ (ГОРОДСКАЯ ВИTРИНА) =====================
  {
    id: 'item-1',
    title: 'Apple iPhone 15 Pro Max 256GB Titanium Blue (Идеальное состояние)',
    price: 89900,
    currency: '₽',
    category: 'electronics',
    subcategory: 'Смартфоны',
    city: 'Москва',
    metro: 'м. Тверская',
    date: 'Сегодня в 19:45',
    views: 342,
    description: 'Оригинальный iPhone 15 Pro Max, покупался в официальном магазине. Состояние аккумулятора 98%. Полный комплект: родная коробка, оригинальный кабель Type-C, чек. Без царапин и сколов, с первого дня под защитным стеклом Remax. Возможны любые проверки. Поддерживаю Безопасную сделку «Полка Защита» с проверкой при получении.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'perfect',
    isSafeDeal: true,
    deliveryType: 'delivery',
    isVip: true,
    isDigital: false,
    seller: {
      id: 'seller-1',
      name: 'Алексей Мельников',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      reviewsCount: 128,
      dealsCount: 164,
      isVerified: true,
      responseTime: '2 минуты',
      registeredYear: 2021,
      onlineStatus: 'online'
    },
    specs: {
      'Производитель': 'Apple',
      'Память': '256 ГБ',
      'Цвет': 'Blue Titanium',
      'АКБ': '98%',
      'Комплект': 'Полный комплект'
    }
  },
  {
    id: 'item-3',
    title: 'Студия с дизайнерским ремонтом 34 м² у парка Горького',
    price: 65000,
    currency: '₽/мес',
    category: 'real_estate',
    subcategory: 'Долгосрочная аренда',
    city: 'Москва',
    metro: 'м. Октябрьская (5 мин пешком)',
    date: 'Сегодня в 16:20',
    views: 280,
    description: 'Сдается уютная светлая студия после свежего дизайнерского евроремонта. Вся бытовая техника премиум-класса (BOSCH, посудомоечная машина, индукционная плита, стиральная машина с сушкой, кондиционер Daikin). Тихий зеленый двор, закрытая охраняемая территория, консьерж 24/7. Без скрытых комиссий от прямого собственника. Договор с подтверждением через Госуслуги.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'perfect',
    isSafeDeal: true,
    deliveryType: 'pickup',
    isVip: true,
    isDigital: false,
    seller: {
      id: 'seller-3',
      name: 'Екатерина Власова',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewsCount: 34,
      dealsCount: 42,
      isVerified: true,
      responseTime: '10 минут',
      registeredYear: 2019,
      onlineStatus: 'online'
    },
    specs: {
      'Площадь': '34 м²',
      'Этаж': '6 из 14',
      'Ремонт': 'Дизайнерский',
      'Залог': '1 месяц',
      'Комиссия': '0%'
    }
  },
  {
    id: 'item-4',
    title: 'Sony PlayStation 5 Slim 1TB + 2 геймпада DualSense + подписка PS Plus Deluxe',
    price: 49500,
    currency: '₽',
    category: 'electronics',
    subcategory: 'Компьютеры и комплектующие',
    city: 'Санкт-Петербург',
    metro: 'м. Невский проспект',
    date: 'Вчера в 20:15',
    views: 890,
    description: 'Новая ревизия PS5 Slim с дисководом, куплена 3 месяца назад. Бережная эксплуатация, в комплекте два оригинальных геймпада DualSense (белый и Midnight Black), зарядная станция Sony, коробка со всеми проводами. Турецкий аккаунт с оплаченной подпиской PS Plus Deluxe на 8 месяцев отдаю в подарок! Отправляю сделкой через службу «Полка Доставка» с проверкой в пункте выдачи.',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'perfect',
    isSafeDeal: true,
    deliveryType: 'delivery',
    isDigital: false,
    seller: {
      id: 'seller-4',
      name: 'Максим Смирнов',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      reviewsCount: 76,
      dealsCount: 92,
      isVerified: true,
      responseTime: '15 минут',
      registeredYear: 2022,
      onlineStatus: 'offline'
    },
    specs: {
      'Модель': 'PlayStation 5 Slim 1TB',
      'Привод': 'Ultra HD Blu-ray',
      'Комплектация': '2 джойстика + док-станция',
      'Состояние': 'Идеальное'
    }
  },
  {
    id: 'item-6',
    title: 'BMW 3 серии 2.0 AT, 2021, 48 000 км, M-Sport пакет',
    price: 3650000,
    currency: '₽',
    category: 'auto',
    subcategory: 'Автомобили с пробегом',
    city: 'Казань',
    date: 'Вчера в 14:10',
    views: 1100,
    description: 'Автомобиль в идеальном заводском состоянии, один владелец. Заводской M-пакет, лазерная оптика BMW Laser, цифровая приборная панель Live Cockpit Professional, проекция на лобовое стекло, камеры 360°, музыка Harman Kardon. Передняя часть и все зоны риска в бронепленке SunTek с момента покупки. Обслуживание исключительно у официального дилера. Чистая юридическая история без ДТП и расчетов.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'perfect',
    isSafeDeal: false,
    deliveryType: 'pickup',
    isVip: true,
    isDigital: false,
    seller: {
      id: 'seller-6',
      name: 'Руслан Каримов',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 4.92,
      reviewsCount: 41,
      dealsCount: 52,
      isVerified: true,
      responseTime: '30 минут',
      registeredYear: 2017,
      onlineStatus: 'online'
    },
    specs: {
      'Год выпуска': '2021',
      'Пробег': '48 000 км',
      'Двигатель': '2.0 л / 184 л.с. / Бензин',
      'Коробка': 'Автомат (ZF 8)',
      'Привод': 'Полный (xDrive)',
      'Кузов': 'Седан'
    }
  },
  {
    id: 'item-7',
    title: 'Разработка современных сайтов, ботов и мобильных сервисов под ключ',
    price: 35000,
    currency: '₽',
    category: 'services',
    subcategory: 'IT и фриланс',
    city: 'Все города',
    date: 'Сегодня в 12:40',
    views: 450,
    description: 'Профессиональная разработка веб-сервисов, интернет-магазинов, P2P бирж и Telegram WebApps. Стек технологий: React, Next.js, Node.js, Python FastAPI, Tailwind, PostgreSQL. Индивидуальный дизайн в Figma, адаптивность под любые устройства, интеграция платежных систем (СБП, Тинькофф, ЮKassa, криптошлюзы). Оплата через безопасную сделку «Полка Защита» по этапам с фиксацией ТЗ.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'digital',
    isSafeDeal: true,
    deliveryType: 'instant_digital',
    isDigital: false,
    seller: {
      id: 'seller-7',
      name: 'DevNova Studio',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewsCount: 89,
      dealsCount: 114,
      isVerified: true,
      responseTime: 'в течение 5 минут',
      registeredYear: 2020,
      onlineStatus: 'online'
    },
    specs: {
      'Опыт работы': '7+ лет',
      'Договор': 'Да, работа с физ. и юр. лицами',
      'Сроки выполнения': 'От 3 до 14 рабочих дней',
      'Поддержка': '30 дней гарантии бесплатно'
    }
  },
  {
    id: 'item-8',
    title: 'Кожаная куртка оверсайз Studio Edition (Размер M-L, Новая с бирками)',
    price: 7200,
    currency: '₽',
    category: 'fashion',
    subcategory: 'Одежда',
    city: 'Екатеринбург',
    date: 'Вчера в 18:30',
    views: 195,
    description: 'Стильная оверсайз куртка из плотной экокожи премиального качества из лимитированной коллекции Studio Edition. Абсолютно новая с навесными бирками. Качественная фурнитура, стильный свободный крой. Не подошел размер при заказе. Отправлю через службу «Полка Доставка» с возможностью примерки в ПВЗ.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=80'
    ],
    condition: 'new',
    isSafeDeal: true,
    deliveryType: 'delivery',
    isDigital: false,
    seller: {
      id: 'seller-8',
      name: 'Мария Антонова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 52,
      dealsCount: 68,
      isVerified: true,
      responseTime: '15 минут',
      registeredYear: 2022,
      onlineStatus: 'online'
    },
    specs: {
      'Бренд': 'Studio Edition',
      'Размер': 'M/L (46-48)',
      'Цвет': 'Черный матовый',
      'Состояние': 'Новое с бирками'
    }
  }
];
