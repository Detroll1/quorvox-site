// Весь текст сайта в одном месте: поменять услугу, проект или запись журнала — правится только здесь.

export const services = [
  { tag: '01 / сайты', title: 'Лендинг за 24 часа.', text: 'Одностраничный сайт для бизнеса: меню, цены, контакты, кнопка звонка, адаптив под телефон.' },
  { tag: '02 / боты', title: 'Telegram-бот.', text: 'Заявки и заказы, игры и модерация чатов, рассылки и ответы на частые вопросы.' },
  { tag: '03 / данные', title: 'Парсинг.', text: 'Соберём цены, товары или контакты с сайтов в таблицу. Разово или по расписанию.' },
  { tag: '04 / сервисы', title: 'Веб и Android.', text: 'Сервисы с бэкендом, Android-приложения и доработка уже существующих.' }
];

export type Project = { name: string; kind: string; group: string; text: string; url?: string; tag: string; chips?: string[]; at: string; featured?: boolean };

export const projects: Project[] = [
  { name: 'BimiBami_bot', kind: 'Telegram-бот', group: 'Боты', tag: 'Telegram ↗', url: 'https://t.me/BimiBami_bot', at: '75% 25%', featured: true,
    text: 'Бот для чатов: игры и разные режимы, модерация, ранги участников, анимации и перевод голосовых сообщений в текст. Регулярно обновляем.',
    chips: ['Telegram Bot API', 'модерация', 'игры'] },
  { name: 'Atmosfera', kind: 'Android', group: 'Приложения', tag: 'Android ↗', url: 'https://t.me/Quorvox_team/992', at: '30% 30%', featured: true,
    text: 'Приложение с точным прогнозом погоды. Установочный файл опубликован в Telegram-канале команды.', chips: ['Android'] },
  { name: 'Кафе-кулинария', kind: 'Сайт', group: 'Сайты', tag: 'демо ↗', url: 'https://quorvox.github.io/cookingseveromorsk-demo/', at: '60% 60%', featured: true,
    text: 'Сайт для кафе в Североморске: меню, конструктор комплексного обеда, корзина и заказ по телефону. Светлая и тёмная тема.',
    chips: ['HTML', 'CSS', 'JavaScript'] },
  { name: 'QuorStream', kind: 'Веб-сервис', group: 'Веб-сервисы', tag: 'бэкенд + фронтенд', at: '50% 40%',
    text: 'Сервис для совместного просмотра видео в реальном времени.' },
  { name: 'QuorKick', kind: 'Веб-сервис', group: 'Веб-сервисы', tag: 'бэкенд', at: '50% 40%',
    text: 'Просмотр видео, фильмов и сериалов без прямой интеграции и привязки.' },
  { name: 'Веб-чат для онлайн-платформы', kind: 'Веб-сервис', group: 'Веб-сервисы', tag: '2023', at: '50% 40%',
    text: 'Рабочий чат для онлайн-платформы.' }
];

export const projectGroups = ['Боты', 'Приложения', 'Веб-сервисы', 'Сайты'];

export type Entry = { cat: string; date: string; title: string; text?: string; url: string };

// Новая запись — строка в начало списка. Каждая ведёт на пост в канале.
export const journal: Entry[] = [
  { cat: 'Релизы', date: '2026-10-12', title: 'Сайт для кафе-кулинарии в Североморске', text: 'Меню, конструктор комплексного обеда, корзина и заказ по телефону.', url: 'https://quorvox.github.io/cookingseveromorsk-demo/' },
  { cat: 'Релизы', date: '2026-09-16', title: 'Atmosfera — точная погода на Android', text: 'Вышло наше приложение погоды, установочный файл лежит в канале.', url: 'https://t.me/Quorvox_team/992' },
  { cat: 'Обновления', date: '2026-09-15', title: 'Обновили админку и настроили серверы', text: 'Админка стала стабильнее.', url: 'https://t.me/Quorvox_team/990' },
  { cat: 'Обновления', date: '2026-09-15', title: 'BimiBami_bot: свежее обновление', text: 'Новая версия бота, ждём отзывов.', url: 'https://t.me/Quorvox_team/988' },
  { cat: 'Команда', date: '2026-09-12', title: '13 сентября — день программиста', url: 'https://t.me/Quorvox_team/983' },
  { cat: 'Команда', date: '2026-09-12', title: 'Ищем партнёров для наших проектов', text: 'Предлагаем рекламу в наших сайтах, играх, веб-приложениях и ботах.', url: 'https://t.me/Quorvox_team/979' },
  { cat: 'Релизы', date: '2026-09-10', title: 'BimiBami_bot: новые режимы и игры', text: 'Новые режимы и игры, чёткая модерация, ранги, анимации и перевод голосовых сообщений в текст.', url: 'https://t.me/Quorvox_team/975' }
];

export const journalCats = ['Релизы', 'Обновления', 'Команда'];

export const team = [
  { letter: 'Н', name: 'Николай', role: 'Full-stack', text: 'Бэкенд, фронтенд, боты и парсинг. Руководил командой Android-разработки из 8 человек.' },
  { letter: 'Р', name: 'Роман', role: 'Дизайн', text: 'Анимации и интерактивные части интерфейсов.' },
  { letter: 'Е', name: 'Екатерина', role: 'Фронтенд', text: 'Интерфейсы на React.' },
  { letter: 'М', name: 'Максим', role: 'Руководитель', text: 'Следит за сроками и ходом проектов.' }
];

export const stack = ['React', 'JavaScript', 'Node.js', 'Python', 'HTML / CSS', 'Lua', 'Git', 'Android Studio'];

export const links = {
  telegram: 'https://t.me/Quorvox_team',
  github: 'https://github.com/Quorvox',
  email: 'neironkabot@gmail.com'
};
