# Quorvox — сайт команды

Сайт команды Quorvox (Североморск): услуги, проекты, журнал релизов, форма заявки.

Живой сайт: https://detroll1.github.io/quorvox/

Сделали вместе: Detroll и Николай ([Quorvox](https://github.com/Quorvox)).

## Стек

React 19, TypeScript, Vite, react-router (HashRouter для GitHub Pages). Без внешних CDN, шрифты локальные.
На первом экране живая сеть на canvas: лучи перестраиваются, по ним бегут импульсы, точки откликаются на курсор.

## Запуск

```
npm install
npm run dev     # локально
npm run build   # сборка в ../site/quorvox
```

Тексты, проекты и записи журнала лежат в `src/data/content.ts`.
