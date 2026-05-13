# ── Stage 1: builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# BACKEND_URL is read by next.config.mjs during build (for rewrites).
ARG BACKEND_URL=http://web:5000
ENV BACKEND_URL=$BACKEND_URL

# Install dependencies first — this layer is cached unless package.json changes
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run build

# ── Stage 2: runner ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ARG BACKEND_URL=http://web:5000
ENV BACKEND_URL=$BACKEND_URL

# Copy only the standalone output and static assets from the builder stage
COPY --from=builder /app/public            ./public
COPY --from=builder /app/.next/standalone  ./
COPY --from=builder /app/.next/static      ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]