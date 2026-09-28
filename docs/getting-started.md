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
| `SPOTIFY_REFRESH_TOKEN` | `/api/now-playing` | See below |

### Getting a Spotify refresh token

1. In the [Spotify dashboard](https://developer.spotify.com/dashboard), open your app. Copy the Client ID and Client secret (32 characters each), and add `http://127.0.0.1:3000/api/callback` as a Redirect URI.
2. With `npm run dev` running, open:
   `https://accounts.spotify.com/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Fcallback&scope=user-read-currently-playing%20user-read-playback-state`
   After you approve, `/api/callback` shows the authorization code.
3. Swap the code for a refresh token. The code is single-use and expires quickly:
   ```bash
   curl -X POST https://accounts.spotify.com/api/token \
     -u "<CLIENT_ID>:<CLIENT_SECRET>" \
     -d grant_type=authorization_code \
     -d code=<CODE> \
     -d redirect_uri=http://127.0.0.1:3000/api/callback
   ```
4. Put `refresh_token` from the response into `SPOTIFY_REFRESH_TOKEN`, locally and in Vercel.

If `/api/now-playing` returns a 500, the server log shows Spotify's error. `invalid_client` means the ID or secret is wrong. `invalid_grant` means the refresh token is wrong.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Build, start on port 3100, run Playwright |
| `npm test` | Typecheck + e2e |
