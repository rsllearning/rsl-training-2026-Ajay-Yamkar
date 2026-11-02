# ShopCart — client-side state management

A React + TypeScript shop demonstrating three cart state models (Context + `useReducer`, Zustand, and Jotai) and an XState v5 checkout workflow backed by json-server.

## Run locally

```sh
npm install
npm run server # terminal 1: http://localhost:3001
npm run dev    # terminal 2: http://localhost:5173
```

The Vite `/api` proxy forwards to json-server. Pick a cart implementation from the state model switcher in the header. Each model shares the same catalog and cart UI; checkout uses the Zustand store and the shared XState actor so the workflow can demonstrate the cross-store synchronization.

## State model comparison

- **Context + reducer** — split state and dispatch contexts; dispatch-only controls do not subscribe to cart changes.
- **Zustand** — minimal selectors and derived totals; checkout status is part of the store.
- **Jotai** — writable cart atom plus derived count and price atoms and write-only action atoms.
- **XState v5** — review, submitting, and success states; guarded submission, cancellable promise actor, error recovery, and store synchronization.

`npm run build` runs TypeScript checking and creates a production bundle.
