# Modern Front-End Security Dashboard

This is the supplied Vanilla JavaScript, HTML, CSS, Node.js, and Express training dashboard, with security refinements applied in place.

## Run the application

```bash
npm install
npm start
```

Open <http://localhost:3000>. The dashboard and Account Settings page retain their original interactions.

## Vulnerabilities and fixes

### DOM-based cross-site scripting

- **Vulnerable implementation:** `client/app.js` interpolated the `name` query parameter into `app.innerHTML`.
- **Untrusted source and boundary:** The URL query string is user-controlled input crossing into the browser DOM.
- **Fix:** Build the profile card using DOM methods and assign all dynamic values with `textContent`. The account page also uses text-only DOM updates. The server does not serialize profile data into HTML.

### Prototype pollution and unsafe settings merge

- **Vulnerable implementation:** The starter copied request settings with `for...in` into a regular object, allowing inherited and unexpected keys to participate in the merge.
- **Untrusted source and boundary:** The JSON request body is controlled by the caller and crosses the HTTP API boundary.
- **Fix:** The API accepts only a plain JSON object containing exactly `theme`, `language`, and `fontSize`, validates each value against an allowed set, and copies approved fields into a null-prototype object. Dangerous and unknown keys are rejected. The client creates only the expected settings object directly.

### SSR token leakage

- **Vulnerable implementation:** The starter serialized the complete server-side user into `window.initialUser` and returned it from `/api/profile`, including session and refresh token fields.
- **Sensitive boundary:** Server-only credentials must not cross into HTML, hydration data, or browser API responses.
- **Fix:** No user object is embedded in the page. `publicProfile()` explicitly returns only `id`, `name`, `email`, and `role`; profile responses are marked `Cache-Control: no-store`. The browser fetches this public view model when needed.

### Content Security Policy

- **Vulnerable implementation:** The starter had no CSP and used inline scripts and styles.
- **Boundary:** Browser execution policy controls which scripts, styles, frames, and other resources can load.
- **Fix:** The Express response middleware sets a restrictive CSP (`default-src 'self'`, same-origin scripts/styles, `object-src 'none'`, `base-uri 'self'`, and `form-action 'self'`). Inline code was moved into external same-origin files. CSP is an additional layer; safe DOM APIs remain the primary XSS fix.

### Clickjacking

- **Vulnerable implementation:** The pages could be embedded by an attacker-controlled site.
- **Boundary:** Cross-origin framing can deceive a user into interacting with a hidden or disguised application.
- **Fix:** Responses set CSP `frame-ancestors 'none'` and the legacy `X-Frame-Options: DENY` fallback. `test/iframe-test.html` is retained as a manual framing check.

Other response protections include `X-Content-Type-Options: nosniff`, a strict referrer policy, and a restrictive Permissions Policy. These controls complement the five primary fixes.

## Verification

Automated checks use Node's built-in test runner and require no additional test dependencies:

```bash
npm test
```

The checks cover:

- A markup payload in the `name` query parameter is handled through text-only DOM APIs, and the HTML contains no serialized `window.initialUser` object.
- Valid settings save successfully; invalid values and a JSON `__proto__` payload are rejected, and `Object.prototype` remains unchanged.
- The dashboard, account page, and profile endpoint do not expose the fake access or refresh tokens; profile data has only the four public fields.
- Both HTML pages return the restrictive CSP, contain no inline script/style blocks, and deny framing with `frame-ancestors` and `X-Frame-Options`.
- Dashboard and Account Settings routes remain available.

For a browser-based clickjacking check, start the app and open `test/iframe-test.html` from a different local origin (for example, serve that directory on another port). The browser should refuse to display `/account` inside the iframe. For DOM XSS, open `http://localhost:3000/?name=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E`; the payload should appear as literal text, with no alert or injected image element.

## Defense in depth

Untrusted values are rendered as text, structured input is validated against a narrow schema, and sensitive server fields never cross into browser responses. CSP reduces the impact of a future injection mistake, while framing headers independently protect against clickjacking. The automated checks exercise these controls together with the original dashboard routes.
