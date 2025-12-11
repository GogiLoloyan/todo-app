# Todo App

A full-stack Todo application built with React, MobX, and Express. Features include debounced search with URL synchronization, request cancellation, and a clean service-oriented architecture.

## Features

- **Search with Debouncing** — Filter todos by name with 300ms debounce to prevent excessive API calls
- **URL State Sync** — Search state persists in URL, enabling shareable links and browser navigation
- **Request Cancellation** — Automatic `AbortController` integration prevents race conditions
- **Loading States** — Shimmer placeholders provide smooth loading experience
- **Text Highlighting** — Search terms are highlighted in results
- **Responsive UI** — Built with Microsoft Fluent UI components

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           Client                                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │  Components  │◄───│  SearchStore │◄───│  URL (search=)   │   │
│  │              │    │   (MobX)     │───►│                  │   │
│  └──────┬───────┘    └──────────────┘    └──────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐    ┌──────────────┐                           │
│  │   useQuery   │───►│  HttpClient  │                           │
│  │   (hook)     │    │  (service)   │                           │
│  └──────────────┘    └──────┬───────┘                           │
└─────────────────────────────┼───────────────────────────────────┘
                              │ HTTP
┌─────────────────────────────┼───────────────────────────────────┐
│                       Server│                                   │
│                      ┌──────▼───────┐                           │
│                      │   Express    │                           │
│                      │   REST API   │                           │
│                      └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
todo-app/
├── shared/                    # Shared TypeScript types
│   └── types.ts               # TodoItem, query params interfaces
│
├── server/                    # Express REST API
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── routes/            # API route handlers
│   │   └── data/              # Mock data
│   ├── package.json
│   └── tsconfig.json
│
└── client/                    # React SPA
    ├── src/
    │   ├── main.tsx           # App entry point
    │   ├── App.tsx            # Root component
    │   ├── api/
    │   │   ├── HttpClient.ts  # Generic HTTP client
    │   │   ├── todoService.ts # Todo API methods
    │   │   ├── configs.ts     # API endpoints
    │   │   └── types.ts       # Request types
    │   ├── components/
    │   │   ├── TodoList.tsx          # Todo list with highlighting
    │   │   ├── TodoListContainer.tsx # Data fetching container
    │   │   ├── TodoSearchBox.tsx     # Search input
    │   │   └── LoadingShimmer.tsx    # Loading placeholder
    │   ├── hooks/
    │   │   └── useQuery.ts           # Data fetching hook
    │   ├── stores/
    │   │   ├── SearchStore.ts        # MobX search state
    │   │   └── SearchStoreContext.tsx
    │   └── utils/
    │       └── highlightText.tsx     # Text highlighting utility
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

### 1. Install Dependencies

```bash
# Server
cd server && npm install

# Client
cd client && npm install
```

### 2. Start Development Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev
# Server runs on http://localhost:3001

# Terminal 2 - Frontend
cd client
npm run dev
# Client runs on http://localhost:5173
```

### 3. Open the App

Navigate to http://localhost:5173

Try searching with URL params: http://localhost:5173?search=test

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todoitems` | Get all todo items |
| GET | `/api/todoitems?filter={text}` | Filter items by name substring |

### Response Format

```json
[
  {
    "id": 1,
    "name": "Learn TypeScript",
    "isComplete": true
  }
]
```

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Express.js | REST API framework |
| TypeScript | Type safety |
| tsx | Development server with hot reload |
| cors | Cross-origin resource sharing |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| MobX | State management |
| Fluent UI v8 | Microsoft's React components |

## Custom Hooks

### `useQuery<T>`

A lightweight data fetching hook with AbortController support.

```typescript
const { data, loading, error, refetch } = useQuery({
  queryKey: ['todos', searchValue],
  queryFn: ({ signal }) => todoService.getAll({ signal }),
  enabled: true,
  initialData: [],
});
```

| Option | Type | Description |
|--------|------|-------------|
| `queryKey` | `unknown[]` | Cache key, triggers refetch on change |
| `queryFn` | `(ctx) => Promise<T>` | Fetch function receiving abort signal |
| `enabled` | `boolean` | Conditionally enable/disable fetching |
| `initialData` | `T` | Initial data before first fetch |

## State Management

### SearchStore (MobX)

Self-contained store managing search state with URL synchronization.

```typescript
class SearchStore {
  searchValue: string;        // Raw input value
  debouncedSearchValue: string; // Debounced value for API

  setSearchValue(value: string): void;
  clearSearch(): void;
}
```

**Key Features:**
- Reads initial state from URL on construction (synchronous)
- Debounces value changes via MobX reactions
- Writes debounced value back to URL via `history.replaceState`

## Build for Production

```bash
# Build server
cd server && npm run build

# Build client
cd client && npm run build

# Start production server
cd server && npm start
```

## Future Improvements

- [ ] Add retry logic with exponential backoff to `useQuery`
- [ ] Create, update, delete todo operations
- [ ] Pagination support
- [ ] Optimistic updates
- [ ] Error boundary components
- [ ] Unit and integration tests
- [ ] Docker containerization

## License

MIT
