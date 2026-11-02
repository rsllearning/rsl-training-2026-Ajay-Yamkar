# ShopCart — modern client-side state management

This repository is organized as assignment branches. `common` contains the React + Vite shell, shared TypeScript types, mock API database, and Vite proxy. Each deliverable branch adds its own cart state implementation:

```text
common
├── deliverable-1-context
├── deliverable-2-zustand
│   └── deliverable-4-xstate
└── deliverable-3-jotai
```

## Run locally

```sh
npm install
npm run server # terminal 1: http://localhost:3001
npm run dev    # terminal 2: http://localhost:5173
```

The Vite `/api` proxy forwards requests to json-server. Each deliverable branch builds on the same catalog and visual shell. `npm run build` runs TypeScript checking and creates a production bundle.
