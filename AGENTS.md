# AGENTS.md — AI Assistant Context for Algo Learn

> Этот файл описывает проект, архитектуру, конвенции и правила для работы ИИ-ассистентов и агентов.
> Язык по умолчанию для ответов: **русский** (RU), если пользователь не указал иное.

---

## 1. Проект: Algo Learn

**Цель** — интерактивная образовательная платформа для изучения алгоритмов и структур данных через пошаговые визуализации в браузере.

**Репозиторий** — `https://github.com/vitjaz/algo-learn`  
**Автор** — Виталий Алексеев (GitHub: vitjaz, Telegram: @alexeev_dev_blog)  
**Лицензия** — MIT

### Реализованные алгоритмы

| Алгоритм                     | Slug             | Категория | Сложность |
| ---------------------------- | ---------------- | --------- | --------- |
| Бинарный поиск               | `binary-search`  | `search`  | easy      |
| Сортировка пузырьком         | `bubble-sort`    | `sorting` | easy      |
| Сортировка вставками         | `insertion-sort` | `sorting` | easy      |
| Сортировка слиянием          | `merge-sort`     | `sorting` | medium    |
| Быстрая сортировка           | `quick-sort`     | `sorting` | medium    |
| Сортировка выбором           | `selection-sort` | `sorting` | easy      |
| Бинарное дерево поиска (BST) | `bst`            | `trees`   | medium    |

---

## 2. Стек технологий

| Технология                                                                     | Версия                     | Назначение                                                     |
| ------------------------------------------------------------------------------ | -------------------------- | -------------------------------------------------------------- |
| [Next.js](https://nextjs.org)                                                  | 16.2.6                     | React-фреймворк, SSR, SSG, `output: "standalone"`              |
| [React](https://react.dev)                                                     | 19.2.4                     | UI-рендеринг                                                   |
| [TypeScript](https://www.typescriptlang.org/)                                  | 5.x                        | Типизация, строгий режим (`strict: true`)                      |
| [Tailwind CSS](https://tailwindcss.com)                                        | 4.3.0                      | Utility-first стили                                            |
| [shadcn/ui](https://ui.shadcn.com)                                             | 4.7.0                      | Библиотека компонентов, стиль `base-nova`, baseColor `neutral` |
| [Framer Motion](https://motion.dev)                                            | 12.38.0                    | Анимации визуализаций                                          |
| [next-intl](https://next-intl.dev)                                             | 4.11.1 + `next-intl-split` | Интернационализация (RU/EN)                                    |
| [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) | 2.4.1                      | Подсветка кода в примерах                                      |
| [lucide-react](https://lucide.dev)                                             | 1.14.0                     | Иконки                                                         |
| Docker + Docker Compose                                                        | —                          | Контейнеризация и деплой                                       |

**Пакетный менеджер:** `pnpm` (рекомендуется) или `npm`/`yarn`.

---

## 3. Архитектура проекта

```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Корневой лейаут (шрифты Geist, провайдеры)
│   ├── page.tsx               # Главная страница
│   ├── sitemap.ts             # Динамический sitemap
│   ├── globals.css            # Tailwind CSS v4 импорты и CSS-переменные
│   ├── algorithms/[slug]/
│   │   ├── page.tsx           # Серверная страница алгоритма (SSG, metadata, JSON-LD)
│   │   └── client.tsx         # Клиентская часть (интерактивные вкладки, TOC)
│   └── api/og/route.tsx       # OpenGraph изображения
│
├── components/
│   ├── algorithm/             # Компоненты страницы алгоритма
│   │   ├── algorithm-description.tsx
│   │   ├── algorithm-steps.tsx
│   │   ├── algorithm-analysis.tsx
│   │   ├── algorithm-applications.tsx
│   │   ├── code-example.tsx
│   │   ├── complexity-table.tsx
│   │   ├── leetcode-tasks.tsx
│   │   ├── table-of-contents.tsx
│   │   └── visualization/     # Визуальные компоненты
│   │       ├── visualization-container.tsx   # Обёртка: управление play/pause/step/speed
│   │       ├── visualization-controls.tsx    # Кнопки управления
│   │       ├── binary-search-visual.tsx
│   │       ├── bubble-sort-visual.tsx
│   │       ├── insertion-sort-visual.tsx
│   │       ├── merge-sort-visual.tsx
│   │       ├── quick-sort-visual.tsx
│   │       ├── selection-sort-visual.tsx
│   │       └── bst-visual.tsx
│   ├── home/                  # Компоненты главной страницы
│   ├── layout/                # Общие layout-компоненты
│   │   ├── app-shell.tsx
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── footer.tsx
│   ├── providers/             # React-контексты
│   │   ├── theme-provider.tsx
│   │   ├── intl-provider.tsx
│   │   └── locale-provider.tsx
│   └── ui/                    # shadcn/ui компоненты (badge, button, card, tabs, tooltip, и т.д.)
│
├── lib/
│   ├── utils.ts               # cn() — объединение tailwind-классов (clsx + tailwind-merge)
│   └── algorithms/            # Ядро алгоритмов
│       ├── index.ts           # Реестр всех модулей (AlgorithmModule)
│       ├── categories.ts      # Категории (search, sorting, trees)
│       ├── binary-search/     # Модуль алгоритма
│       │   ├── index.ts       # meta, generateSteps, defaultInput, extendedContent
│       │   └── steps.ts       # Функция генерации шагов визуализации
│       ├── bubble-sort/
│       ├── bst/
│       ├── insertion-sort/
│       ├── merge-sort/
│       ├── quick-sort/
│       └── selection-sort/
│
├── i18n/
│   ├── request.ts             # next-intl конфигурация (locale из cookie, fallback RU)
│   └── dictionaries/          # JSON-словари переводов
│       ├── en.json, ru.json   # Корневые словари
│       ├── en/                # Алгоритмо-специфичные словари
│       └── ru/
│
├── types/
│   ├── algorithm.ts           # Типы шагов, метаданные, сложность, LeetCode задачи
│   └── extended-content.ts    # Конфигурация расширенного контента (steps, analysis, applications)
│
└── hooks/
    └── use-mobile.ts          # Хук определения мобильного устройства
```

---

## 4. Ключевые паттерны и конвенции

### 4.1 Модуль алгоритма

Каждый алгоритм — это **папка** в `src/lib/algorithms/<slug>/` с обязательными файлами:

| Файл       | Экспортирует             | Назначение                                                                          |
| ---------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `index.ts` | `meta: AlgorithmMeta`    | Метаданные: slug, категория, сложность, задачи LeetCode, примеры кода (TS + Python) |
| `index.ts` | `generateSteps`          | Функция генерации массива шагов визуализации                                        |
| `index.ts` | `defaultInput`           | Объект с входными данными по умолчанию                                              |
| `index.ts` | `extendedContent` (опц.) | Конфигурация блоков «Как работает», «Анализ сложности», «Применение»                |
| `steps.ts` | `generate*Steps`         | Имплементация генерации шагов                                                       |

Реестр модулей: [`src/lib/algorithms/index.ts`](src/lib/algorithms/index.ts:21) — добавлять новый алгоритм **только** через `algorithmModules`.

### 4.2 Типы шагов визуализации

Все шаги имеют единую структуру (пример: [`BinarySearchStep`](src/types/algorithm.ts:87)):

- `type` — тип шага (уникальный для каждого алгоритма)
- `descriptionKey` — ключ для i18n
- `descriptionParams` — параметры подстановки в строку
- Алгоритмо-специфичные поля: `array`, `comparing`, `sortedIndices`, `range`, `pivotIndex`, `tree`, и т.д.

Каждый тип алгоритма имеет свой `*StepType` union и `*Step` interface в [`src/types/algorithm.ts`](src/types/algorithm.ts).

### 4.3 Визуализация — компонентный паттерн

1. **Сервер** ( [`page.tsx`](src/app/algorithms/[slug]/page.tsx:77) ) генерирует шаги на этапе сборки (`generateStaticParams`) и передаёт их в `AlgorithmPageClient`.
2. **Клиент** ( [`client.tsx`](src/app/algorithms/[slug]/client.tsx) ) управляет вкладками и таблицей содержимого (TOC).
3. **Контейнер** ( [`visualization-container.tsx`](src/components/algorithm/visualization/visualization-container.tsx) ) управляет воспроизведением: play/pause, шаг вперёд/назад, скорость, перемотка.
4. **Визуальный компонент** (например, [`binary-search-visual.tsx`](src/components/algorithm/visualization/binary-search-visual.tsx)) — чистый React-компонент, который рендерит текущий шаг, используя Framer Motion для анимаций.

### 4.4 Интернационализация (i18n)

- **Локали:** `ru` (по умолчанию), `en`.
- **Механизм:** `next-intl` + `next-intl-split` для разделения словарей по файлам.
- **Базовые словари:** `src/i18n/dictionaries/{locale}.json` — общие строки.
- **Алгоритмо-специфичные:** `src/i18n/dictionaries/{locale}/algorithms/{slug}/index.json` — описание, шаги, анализ, применение, задачи LeetCode.
- **Категории:** `src/i18n/dictionaries/{locale}/categories/index.json`.
- **Переключение:** через cookie `locale` (устанавливается клиентским переключателем).
- **Конфигурация:** [`src/i18n/request.ts`](src/i18n/request.ts:5).

### 4.5 shadcn/ui

- Стиль: `base-nova`, `baseColor: neutral`.
- Иконки: `lucide-react`.
- Алиасы: `@/components/ui`, `@/lib`, `@/hooks`, `@/components`.
- Конфигурация: [`components.json`](components.json).
- При добавлении нового компонента: `npx shadcn add <component>`.

### 4.6 Стили

- Tailwind CSS v4 — конфигурация через CSS (`globals.css`), не через `tailwind.config.js`.
- Шрифты: `Geist` (sans), `Geist_Mono` (mono) из `next/font/google`.
- Темы: `next-themes`, тёмная/светлая тема, `suppressHydrationWarning` на `<html>`.

---

## 5. Как добавить новый алгоритм

> Следуй этому чек-листу при добавлении алгоритма.

### 5.1 Модуль алгоритма

1. Создать папку `src/lib/algorithms/<slug>/`
2. Создать `steps.ts` — функция `generate*Steps(...)` возвращает массив типизированных шагов.
3. Создать `index.ts` — экспортировать `meta`, `generateSteps`, `defaultInput`, `extendedContent` (опц.).
4. Добавить тип шагов в [`src/types/algorithm.ts`](src/types/algorithm.ts) (по аналогии с существующими).

### 5.2 Реестр

5. Импортировать модуль в [`src/lib/algorithms/index.ts`](src/lib/algorithms/index.ts) и добавить в `algorithmModules`.
6. Если новая категория — добавить в [`src/lib/algorithms/categories.ts`](src/lib/algorithms/categories.ts) и в `CategoryId` в [`src/types/algorithm.ts`](src/types/algorithm.ts:1).

### 5.3 Визуализация

7. Создать компонент `src/components/algorithm/visualization/<slug>-visual.tsx`.
8. Добавить его в условный рендеринг в `AlgorithmPageClient` (или в `visualization-container.tsx`, если он управляет выбором компонента).

### 5.4 Переводы

9. Создать словари:
   - `src/i18n/dictionaries/en/algorithms/<slug>/index.json`
   - `src/i18n/dictionaries/ru/algorithms/<slug>/index.json`
10. Добавить название алгоритма в `algorithmTitles` в [`src/app/algorithms/[slug]/page.tsx`](src/app/algorithms/[slug]/page.tsx:16).

### 5.5 Страница и метаданные

11. Обновить `README.md` и `README.en.md` — добавить алгоритм в таблицу.
12. Проверить, что `generateStaticParams` в `page.tsx` автоматически подхватит новый slug (он берёт из `algorithmModules`).

---

## 6. Типы и интерфейсы (референс)

- **Категории:** `CategoryId = "search" | "sorting" | "trees"` — [`src/types/algorithm.ts:1`](src/types/algorithm.ts:1)
- **Сложность:** `DifficultyLevel = "easy" | "medium" | "hard"` — [`src/types/algorithm.ts:3`](src/types/algorithm.ts:3)
- **Метаданные:** [`AlgorithmMeta`](src/types/algorithm.ts:65) — slug, category, difficulty, complexity, leetcodeTasks, codeExamples
- **Модуль:** [`AlgorithmModule`](src/lib/algorithms/index.ts:13) — meta, generateSteps, defaultInput, extendedContent?
- **Расширенный контент:** [`ExtendedContentConfig`](src/types/extended-content.ts:49) — steps, analysis, applications

---

## 7. Скрипты и команды

```bash
# Установка зависимостей
pnpm install

# Разработка
pnpm dev              # localhost:3000

# Сборка
pnpm build

# Запуск продакшена
pnpm start

# Линтинг
pnpm lint
```

---

## 8. Docker

```bash
# Сборка и запуск
pnpm docker:up        # или: docker compose up -d --build

# Логи
pnpm docker:logs      # или: docker compose logs -f

# Остановка
pnpm docker:down      # или: docker compose down
```

Конфигурация: `docker-compose.yml` + `Dockerfile`.  
Next.js собирается в `output: "standalone"` режиме для минимального Docker-образа.

---

## 9. Правила для ИИ-агентов

### 9.1 Общие правила

- **Язык:** отвечать на русском, если пользователь не попросил иначе.
- **Согласованность:** следовать существующим паттернам в коде. Копировать структуру ближайшего похожего алгоритма.
- **Типизация:** всё новое должно быть типизировано. Никакого `any` без явной необходимости.
- **Пути:** использовать алиасы `@/` для импортов.

### 9.2 При добавлении алгоритма

- Начинать с `types/algorithm.ts` — добавить типы шагов.
- Затем `lib/algorithms/<slug>/` — модуль и шаги.
- Затем визуальный компонент.
- Затем переводы (RU и EN оба).
- Проверить, что алгоритм появляется в `algorithmModules`, `categories.ts` и `page.tsx` (для `algorithmTitles`).

### 9.3 При изменении UI

- Использовать shadcn/ui компоненты из `src/components/ui/`.
- Для анимаций — Framer Motion.
- Для иконок — `lucide-react`.
- Для стилей — Tailwind CSS утилитарные классы.
- Для текстов — использовать `useTranslations` из `next-intl` и добавлять ключи в словари.

### 9.4 При работе с визуализациями

- Шаги генерируются **серверно** в `page.tsx` и передаются как пропсы.
- Клиент управляет только индексом текущего шага и состоянием play/pause.
- Визуальный компонент **не должен** вызывать `generateSteps` — он получает готовый массив.
- Анимации должны быть плавными, использовать `AnimatePresence` и `motion` из Framer Motion.
- Каждый шаг должен содержать `descriptionKey` и `descriptionParams` для подписи к шагу.

### 9.5 При работе с i18n

- Каждый новый текстовый ключ добавлять в **оба** словаря: `en` и `ru`.
- Формат словаря: плоский JSON с точечной нотацией (например, `algorithms.binary-search.howItWorks.step1`).
- Русский — fallback язык.

### 9.6 Ограничения

- Не менять `next.config.ts` без явной необходимости.
- Не добавлять новые зависимости без согласования с пользователем.
- Не ломать существующие структуры шагов — при расширении делать поля опциональными.
- Docker-конфигурация трогается только при изменении процесса сборки/деплоя.

---

## 10. Быстрые ссылки

| Файл                                                                           | Назначение                    |
| ------------------------------------------------------------------------------ | ----------------------------- |
| [`src/types/algorithm.ts`](src/types/algorithm.ts)                             | Все типы шагов и метаданных   |
| [`src/lib/algorithms/index.ts`](src/lib/algorithms/index.ts)                   | Реестр алгоритмов             |
| [`src/lib/algorithms/categories.ts`](src/lib/algorithms/categories.ts)         | Категории                     |
| [`src/app/algorithms/[slug]/page.tsx`](src/app/algorithms/[slug]/page.tsx)     | Серверная страница алгоритма  |
| [`src/app/algorithms/[slug]/client.tsx`](src/app/algorithms/[slug]/client.tsx) | Клиентская страница алгоритма |
| [`components.json`](components.json)                                           | Конфигурация shadcn/ui        |
| [`next.config.ts`](next.config.ts)                                             | Конфигурация Next.js          |
| [`package.json`](package.json)                                                 | Зависимости и скрипты         |
