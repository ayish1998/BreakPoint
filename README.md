# BreakPoint — Stress management platform for developers

Full-stack app: Next.js + Tailwind (frontend) and Express + MongoDB (backend) with local OSS AI integration.

## Quick start

1. Frontend
   - cd frontend
   - npm install
   - Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:4000`
   - npm run dev (http://localhost:3000)

2. Backend
   - cd backend
   - npm install
   - Copy `.env.example` to `.env` and fill values
   - npm run dev (http://localhost:4000)

3. MongoDB
   - Ensure MongoDB running locally on mongodb://127.0.0.1:27017

4. Local AI server (single-model)
   - Recommended: LM Studio (OpenAI-compatible). Steps:
     - Download and start the Local Server (OpenAI-compatible). Note the port (e.g., 1234) and API key if enabled.
     - Pick ONE good model and use its exact name reported by LM Studio.
     - backend/.env:
       - `OSS_BASE_URL=http://localhost:1234/v1`
       - `OSS_MODEL=<exact model name from LM Studio>`
       - `OSS_API_KEY=<if enabled>`
     - Restart backend.
   - Alternative: Ollama (native API). backend/.env → `OSS_BASE_URL=http://localhost:11434` (no `/v1`) and `OSS_MODEL=<model>`.

## Features

- Breathing exercise (4-7-8), Mood check, Stress journal, AI assistant, Pomodoro timer
- Dark mode via next-themes, developer-friendly fonts and subtle animations
- Auth with JWT, journal CRUD, AI chat (single-model)

## Optional: GitHub OAuth (scaffold)

- You can add GitHub OAuth using Passport or `@octokit/oauth-app` quickly. Suggested endpoints:
  - GET `/api/auth/github` → redirect to GitHub
  - GET `/api/auth/github/callback` → exchange code, find-or-create user, set JWT cookie
  - Store `githubId` on `User` model

## Structure

- frontend/app: Next.js app router pages
- frontend/components: UI widgets
- frontend/lib/api.ts: API helper
- backend/src: server, models, routes, services

## Environment

- Frontend: `.env.local` → `NEXT_PUBLIC_API_URL`
- Backend: `.env` → PORT, CORS_ORIGIN, MONGODB_URI, JWT_SECRET, OSS_* keys

## Notes

- Adjust CORS in `src/server.js` for deployment.
- For production, set `secure: true` cookies and proper CORS origins.

