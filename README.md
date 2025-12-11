# Todo App

A full-stack Todo application with React frontend and Express backend.

## Project Structure

```
todo-app/
├── shared/          # Shared TypeScript types
├── server/          # Express + TypeScript REST API
└── client/          # React + TypeScript + Fluent UI
```

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

### Backend

```bash
cd server
npm install
npm run dev
```

Server runs on http://localhost:3001

### Frontend

```bash
cd client
npm install
npm run dev
```

Client runs on http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todoitems` | Get all todo items |
| GET | `/api/todoitems?filter={substring}` | Filter items by name |

## Tech Stack

**Backend:**
- Express.js
- TypeScript
- tsx (development)

**Frontend:**
- React 18
- TypeScript
- Vite
- Fluent UI v8
