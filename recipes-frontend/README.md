# Recipes Frontend

The frontend supports two ways to reach the backend.

## Connection modes

### 1) Rewrite mode (recommended)

- `lib/api.js` calls relative paths (`/api/...`, `/auth/...`).
- `next.config.mjs` rewrites those paths to `BACKEND_URL`.
- Good default for local and Docker Compose.

### 2) Direct mode (optional)

- `lib/api.js` reads `NEXT_PUBLIC_BACKEND_URL` and calls that absolute URL directly from the browser.
- Use this only if you explicitly want cross-origin browser requests.
- If `NEXT_PUBLIC_BACKEND_URL` is empty, rewrite mode is used.

## Local development

### Rewrite mode

1. Copy `.env.example` to `.env.local`.
2. Set `BACKEND_URL` to your backend URL (usually `http://localhost:5000`).
3. Leave `NEXT_PUBLIC_BACKEND_URL` unset.
4. Start the app.

```bash
cp .env.example .env.local
npm install
npm run dev
```

### Direct mode (optional)

In `.env.local`, set:

```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

You can still keep `BACKEND_URL`, but it is not used by browser requests in this mode.

## Docker Compose

### Rewrite mode

Because rewrites are generated during Next build, pass `BACKEND_URL` as a build arg for the frontend image.

Example frontend compose section:

```yaml
frontend:
  build:
    context: ./recipes-frontend
    args:
      BACKEND_URL: http://web:5000
  ports:
    - "3000:3000"
  depends_on:
    - web
```

Update `http://web:5000` if your backend service name or port is different.

### Direct mode (optional)

If you set `NEXT_PUBLIC_BACKEND_URL` for the frontend container, use a URL reachable from the user's browser (not Docker service DNS).

Example:

```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```
