# TanStack Query Training Assignment

A small React application demonstrating cached product search and user mutations with TanStack Query v5.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The React Query Devtools are available from the bottom-left launcher.

## What is included

- **Products:** remote search with a search-aware query key, loading/error/success states, refresh, and stale/cache timing.
- **Users:** list, create, and optimistic delete flows using custom hooks, mutation feedback, rollback, and invalidation.
- **Answers:** the MCQ answer key is in `answers.txt`.

The product list uses DummyJSON's public products API. The users list is initially loaded from DummyJSON, then user changes are stored in this browser's local storage so create/delete behavior remains visible across refetches despite DummyJSON's demo mutation endpoints not persisting changes. The adapter includes a `?fail=1` switch for demonstrating delete rollback (append it to the browser URL).

## Submission checklist

Commit and push this work to a dedicated branch, open a PR, and add a short screen recording of both exercises. PR creation, pushing, classroom upload, and status email require your own GitHub/classroom/email accounts and are not performed from this workspace.
