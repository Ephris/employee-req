# Employee Requirement System – Ambo University (Cursor Ambo Hackathon 2026)

This is a web-based Employee Requirement system built for Ambo University during the Cursor Ambo Hackathon 2026. The goal is to replace the paper-based process with a modern, efficient, and searchable web application for collecting, reviewing, and managing employee requirement information.

Note: This repository contains a functional subset suitable for demonstration and deployment. The full internal submission delivered to Ambo University includes complete authentication and authorization with three roles (Admin, HR Manager, and Employee), role-based access control, and additional workflows. That enhanced version is reserved for the University for further development and deployment.

Author: Ephrem Niguse

## Project Structure

- `src/` frontend app
- `backend/` backend service
- `backend/src/modules/` API modules (`auth`, `submissions`, `uploads`, `health`)

## Features (demo subset)

- Employee requirement data capture via structured web forms
- Admin login and protected admin panel (demo)
- Submission management endpoints (backend)
- Basic health checks and upload endpoints
- Form autosave in local storage to prevent data loss (frontend)
- Clean, accessible UI optimized for quick data entry

## Full Project (submitted to Ambo University)

- Secure authentication and session handling
- Three roles: Admin, HR Manager, Employee
- Role-based access control (RBAC) across routes and actions
- Enhanced validation, auditing, and review workflows
- Production deployment guidance and ops hardening

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

## Tech Stack

- Languages: TypeScript, JavaScript
- Frontend: React 19, Vite 7
- Routing: React Router
- Styling: CSS (utility-first friendly), modern accessible components
- Backend: Node.js (Express)
- Database: MongoDB (Mongoose)
- Auth: JWT, role-based access (full version)
- Validation: Zod
- Tooling: ESLint, TypeScript, Vite, npm
- Deployment: Vercel (frontend), configurable backend hosting

## Copyright

Copyright © 2026 Ephrem Niguse.

Permission is granted to Ambo University to evaluate and enhance the full internal submission. This public repository is provided for demonstration and educational purposes. All rights reserved unless a separate license is explicitly provided by the author.
