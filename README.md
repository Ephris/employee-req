# My App (Frontend + Backend)

Modernized full-stack setup with:
- React + Vite frontend
- Express + MongoDB backend API
- JWT-authenticated admin routes
- Tailwind foundation for modern UI

## Project Structure

- `src/` frontend app
- `backend/` backend service
- `backend/src/modules/` API modules (`auth`, `submissions`, `uploads`, `health`)

## Environment Setup

Frontend:
- copy `frontend.env.example` into `.env` (root)
- set `VITE_API_BASE_URL`

Backend:
- copy `backend/env.example` into `backend/.env`
- configure:
  - `PORT`
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `CORS_ORIGIN`
  - `RATE_LIMIT_WINDOW_MS`
  - `RATE_LIMIT_MAX`
  - `UPLOAD_MAX_MB`
  - `NODE_ENV`

## Install

Root frontend deps:
```bash
npm install
```

Backend deps:
```bash
cd backend
npm install
```

## Run

Frontend only:
```bash
npm run dev:frontend
```

Backend only:
```bash
npm run dev:backend
```

Both:
```bash
npm run dev:all
```

## Admin Bootstrap

Create initial admin user:
```bash
cd backend
set ADMIN_USERNAME=admin
set ADMIN_PASSWORD=admin123456
npm run seed:admin
```

Then login from `/admin/login`.

## Security Checklist (Baseline)

- Helmet headers enabled
- CORS origin restricted by env
- Global + auth route rate limiting
- JWT auth and role-based admin guards
- Request body validation with Zod
- Mongo payload sanitization
- Upload type and size constraints
