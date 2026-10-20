# Northstar India — React 19 E-Commerce Assignment

A responsive India-inspired mini e-commerce experience built with Vite and React 19. Product prices are shown in Indian rupees (₹), formatted using the Indian numbering system. It demonstrates both tasks in the assignment using simulated asynchronous requests; no backend or additional UI library is required.

## Run locally

Requirements: Node.js 18+ (Node.js 20+ recommended).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build:

```bash
npm run build
npm run preview
```

## Features implemented

### Task 1 — Product listing and registration

- Product cards show image, name, price in INR (₹), category, rating, and short description. Prices use `toLocaleString('en-IN')` for Indian number formatting.
- Product data is returned by a delayed Promise to represent an API request.
- `use()` reads the Promise in `ProductList`. While it is unresolved, the component suspends.
- `<Suspense fallback={...}>` displays skeleton cards while the Promise is pending.
- An Error Boundary catches a rejected product-data Promise and displays a recovery state. The current demo Promise resolves successfully; a network/API integration could reject it.
- React 19 Document Metadata is rendered directly from `App`: `<title>` and `<meta name="description">`.
- Registration uses `<form action={formAction}>` with `useActionState()` rather than an `onSubmit` handler.
- The action validates name, email, and password, waits to simulate a network request, and returns field errors or a success result.
- A nested submit-button component calls `useFormStatus()` to disable the button and show its pending label while the form action is running.
- `UserContext` is provided using React 19's `<UserContext value={user}>` syntax. The header's `UserWelcome` component displays the registered user's name and email.

### Asset Loading APIs

The app uses three React DOM resource APIs from `react`:

- `preconnect('https://images.unsplash.com', { crossOrigin: 'anonymous' })`: establishes an early connection to the image CDN, potentially reducing latency before product images are requested.
- `prefetchDNS('https://fonts.googleapis.com')`: asks the browser to resolve the font host early.
- `preload(firstImage, { as: 'image', fetchPriority: 'high' })`: prioritizes the first visible product image after product data becomes available.

These APIs are hints to the browser; they do not guarantee a particular loading order or performance improvement. Image URLs and the Google Fonts stylesheet require an internet connection.

### Task 2 — Product details and cart

- Selecting a product opens a product detail dialog with image, price, description, and an add-to-cart action.
- `useOptimistic()` immediately adds one to the displayed cart count while the simulated request is pending. The committed cart count updates only after success; a failed action returns to the actual count.
- To make failure behavior easy to review, adding **Desk Lamp Mini** (product ID 4) intentionally fails. Other products succeed.
- `FocusableSearch` receives `ref` directly as a prop and uses it to focus the search input. It does not use `forwardRef()`.
- `observeDetails` is a callback ref that attaches a `ResizeObserver` and returns a cleanup function that disconnects it when the element is removed or the callback ref changes.

### Server and Client Components

This Vite app is a client-rendered React application; it does not implement actual React Server Components. In a framework with RSC support (for example, an appropriately configured Next.js application), product data fetching and mostly static product detail markup could live in a Server Component. The interactive Add to Cart button, optimistic state, event handlers, and browser APIs need a Client Component. The server-rendered product data/details could be passed as props or rendered content to the client-side interactive component. Server Components do not mean that every backend/API call automatically becomes a Server Component.

### React Compiler

React Compiler analyzes component code and can automatically memoize values, functions, and components where beneficial, reducing unnecessary re-renders without requiring manual `useMemo`, `useCallback`, or `memo` everywhere. For example, it may optimize product-card rendering when cart state or registration state changes, subject to component structure and compiler configuration. This project does not enable the compiler plugin; the README describes its potential role rather than claiming it is active.
