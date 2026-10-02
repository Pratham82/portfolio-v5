# PlayStation (Games section) setup

The Games section (`/games` and the Games tab on `/home`) shows my trophy level, recently played games, library and trophy progress. `lib/psn.ts` loads them on the server with [`psn-api`](https://github.com/achievements-app/psn-api), and pages re-fetch at most once an hour (ISR).

Sony has no official public API for this. `psn-api` calls the same endpoints as the PlayStation app, authenticated with your account's **NPSSO** token. Sony can change these endpoints without notice.

It needs one server-only env var: `PSN_NPSSO`.

## 1. Get the NPSSO token

1. Sign in at [playstation.com](https://www.playstation.com) with the account to show.
2. In the same browser, open <https://ca.account.sony.com/api/v1/ssocookie>.
3. It returns `{"npsso":"<64 characters>"}`. Copy the value.

The NPSSO gives full access to the account. Keep it out of the repo and the browser bundle, and never use a `NEXT_PUBLIC_` name for it.

## 2. Add it to `.env`

```bash
PSN_NPSSO=<npsso>
```

## 3. Check it works

```bash
npm run dev
```

Open `/games`. You should see the trophy summary and the Recent / Favourites / Library / Trophies tabs. If you only see Favourites and "PlayStation data is unavailable right now", the dev server log says why (lines start with `psn:`).

## 4. Production (Vercel)

In the Vercel project, **Settings → Environment Variables**, set `PSN_NPSSO` for Production and Preview, then redeploy.

## Renewing the token

The NPSSO expires after about **2 months**, or sooner if you sign out of playstation.com everywhere. When it does, the Games section falls back to the curated favourites and the server logs a `psn:` error; nothing else breaks. To fix it, repeat step 1 and update `PSN_NPSSO` in `.env` and Vercel, then redeploy (or wait for the next hourly revalidation).

## What's shown

| Section | Source |
|---------|--------|
| Trophy level and counts | `getUserTrophyProfileSummary` |
| Recent | `getUserPlayedGames`, newest 6 |
| Library | Played games (by playtime), then owned games not yet played (`getPurchasedGames`). Duplicates across PS4/PS5 and editions are merged. |
| Trophy progress per game | `getUserTrophiesForSpecificTitle` (exact title ID → trophy set) |
| Trophies tab | `getUserTitles`, most recently updated first |
| Favourites | Hand-written in `src/data/games.json` |

Media apps (Netflix, Spotify, YouTube, ...) are filtered out of the played list.

## Troubleshooting

| Log message | Cause / fix |
|-------------|-------------|
| `psn: PSN_NPSSO is not set` | Add the env var (step 2 or 4). |
| `psn: Error: There was a problem retrieving your PSN access code` | The NPSSO expired or was copied wrong. Get a new one (step 1). |
| `psn: purchased games: ...` | Only the owned-games list failed; the library shows played games only. Usually transient. |
