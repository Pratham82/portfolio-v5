# Getting Started

Requires **Node 24** (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Used by | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT` | `lib/sanity` (server) | Required: the build fails without it |
| `SPOTIFY_CLIENT_ID` | `/api/now-playing` | Server-only |
| `SPOTIFY_CLIENT_SECRET` | `/api/now-playing` | Server-only |
| `SPOTIFY_REFRESH_TOKEN` | `/api/now-playing` | Get one using `/api/callback` |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Build, start on port 3100, run Playwright |
| `npm test` | Typecheck + e2e |
