# CollegeDunia MVP Scaffold

Monorepo scaffold for an education lead-gen portal:
- `frontend`: Next.js (SEO pages + lead form)
- `backend/CollegeDunia.Api`: .NET 10 minimal API + EF Core (PostgreSQL default)

## 1. Install and start PostgreSQL (macOS)

```bash
brew install postgresql@16
brew services start postgresql@16
```

## 2. Create DB and user

```bash
psql postgres -f backend/CollegeDunia.Api/sql/init_postgres.sql
```

## 3. Run backend

```bash
cd backend/CollegeDunia.Api
dotnet restore
dotnet run --urls http://localhost:5000
```

API endpoints:
- `GET /api/health`
- `GET /api/courses`
- `GET /api/universities`
- `POST /api/leads`
- `GET /api/leads` (requires `x-admin-key` header)

## 4. Run frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy on Render (backend + Postgres)

This repo includes `render.yaml` for Render Blueprint deployment.

1. Push latest code to GitHub (including `render.yaml`).
2. In Render dashboard, click `New` -> `Blueprint`.
3. Select this repo and branch, then apply blueprint.
4. Render will create:
   - `collegedunia-api` (web service)
   - `collegedunia-db` (PostgreSQL)
5. After frontend deployment on Vercel, update backend env var `FrontendUrl` in Render to your exact Vercel URL and redeploy.

## Optional: switch to SQLite later

Set:
- `DatabaseProvider=sqlite`
- `ConnectionStrings__SqliteConnection=Data Source=collegedunia.db`

## Current MVP scope

- Homepage with hero and lead form
- Dynamic course pages: `/courses/[slug]`
- Dynamic university pages: `/universities/[slug]`
- Lead capture persisted to PostgreSQL (default)
- Seed data for sample universities and courses

## Next steps

- Add authentication + role-based admin panel
- Add lead statuses, counselor assignment rules, and lead activity timeline
- Add blog CMS and programmatic state/city pages
- Add tracking pipeline (GA4, Meta Pixel, UTM capture)
