# Styling Paradigms Assignment

Two independent React exercises live in `exercises/`, each showing a different way to build a consistent interface.

## Exercise 1: Tailwind product dashboard

`exercises/tailwind-dashboard` is a responsive product catalog for a small home and lifestyle shop. It includes a mobile navigation drawer, catalog summary, searchable and filterable products, reusable product cards, stock states, and a restock action. The grid uses Tailwind breakpoints: one column on small screens, two from `sm`, and three from `lg`.

Theme values are configured in `tailwind.config.js` and reused with utility classes. Card styling, responsive layout, hover, focus, and disabled states are implemented with Tailwind utilities rather than per-component CSS selectors.

## Exercise 2: Vanilla Extract component library

`exercises/vanilla-extract-library` demonstrates reusable `Button`, `Card`, and `Badge` components. Buttons support primary, secondary, and danger variants; small, medium, and large sizes; and hover, focus, active, and disabled states. Badges support success, warning, and error variants. Card subcomponents provide a consistent header, title, description, and footer.

Shared typed color, spacing, radius, shadow, and typography tokens are defined in `src/theme.css.ts`. Component recipes are composed in `src/components.css.ts`; the Vite Vanilla Extract plugin emits CSS at build time, with no runtime style generation.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev:dashboard
```

In a second terminal, run the component library:

```sh
npm run dev:library
```

Create production builds for both exercises with:

```sh
npm run build
```

The compiled CSS is emitted under each exercise's `dist/assets/` directory.
