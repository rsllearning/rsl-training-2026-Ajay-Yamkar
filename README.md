# Project Explorer

A responsive project-management portal built with Next.js App Router, TypeScript, React Server Components, nested layouts, dynamic routes, search parameters, loading/error boundaries, and Suspense streaming.

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Routes
- `/` Home
- `/about` About
- `/dashboard` Dashboard
- `/dashboard/analytics` Analytics
- `/projects` Project list (supports `?search=nextjs&status=active`)
- `/projects/p-101` Project overview
- `/projects/p-101/team`, `/tasks`, `/activity`
- `/projects/p-101/docs/setup/database` Catch-all documentation route
- `/settings` Settings

## Assignment features
- Shared global layout/navigation and dashboard-specific nested layout.
- Dynamic project routes and nested project sections.
- Search and status filters driven by URL search parameters.
- App Router `loading.tsx`, `error.tsx`, and custom not-found UI.
- Dashboard streaming via a slow Server Component inside React Suspense.
- Client-side favorites and settings toggle.
- Project data lives in `src/lib/projects.ts`.
