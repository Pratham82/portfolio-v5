# Getting Started

Requires **Node 24** (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable                                 | Used by                 | Notes                                |
| ---------------------------------------- | ----------------------- | ------------------------------------ |
| `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT` | `lib/sanity` (server)   | Required: the build fails without it |
| `SPOTIFY_CLIENT_ID`                      | `lib/spotify` (server)  | Server-only                          |
| `SPOTIFY_CLIENT_SECRET`                  | `lib/spotify` (server)  | Server-only                          |
| `SPOTIFY_REFRESH_TOKEN`                  | `lib/spotify` (server)  | See [Spotify setup](spotify.md)      |
| `PSN_NPSSO`                              | `lib/psn` (server)      | See [PlayStation setup](psn.md)      |
| `WAKATIME_API_KEY`                       | `lib/wakatime` (server) | See [Now page setup](now.md)         |
| `LETTERBOXD_API_KEY` / `_SECRET`         | `lib/letterboxd` (server) | See [Now page setup](now.md)       |
| `SANITY_REVALIDATE_SECRET`               | `/api/revalidate`       | The secret set on the Sanity webhook |

See [Spotify setup](spotify.md) for how to get the three `SPOTIFY_*` values, and [PlayStation setup](psn.md) for `PSN_NPSSO`. Without `PSN_NPSSO` the site still builds; the Games section shows only the curated favourites. [Now page setup](now.md) covers `WAKATIME_API_KEY` and the extra Spotify scope; any Now widget without its key is just hidden.

## Scripts

| Command                             | Purpose                                   |
| ----------------------------------- | ----------------------------------------- |
| `npm run dev`                       | Dev server                                |
| `npm run build` / `npm start`       | Production build / serve                  |
| `npm run lint` / `npm run lint:fix` | ESLint                                    |
| `npm run typecheck`                 | `tsc --noEmit`                            |
| `npm run test:e2e`                  | Build, start on port 3100, run Playwright |
| `npm test`                          | Typecheck + e2e                           |
