# PlayStation (Games section) setup

The Games section (`/games`, the Games tab under Personal) shows my trophy level, recently played games, library and trophy progress. `lib/psn.ts` loads them on the server with [`psn-api`](https://github.com/achievements-app/psn-api), and pages re-fetch at most once an hour (ISR). On each re-fetch, `getGamesData()`:

1. exchanges `PSN_NPSSO` for an access code, then the access code for an access token ([Auth flow](#auth-flow)), and
2. calls the [data endpoints](#data-endpoints) in parallel and merges the results.

Sony has no official public API for this. `psn-api` calls the same endpoints as the PlayStation mobile app, authenticated with your account's **NPSSO** token. Sony can change these endpoints without notice.

It needs one server-only env var: `PSN_NPSSO`.

## 1. Get the NPSSO token

1. Sign in at [playstation.com](https://www.playstation.com) with the account whose games you want to show.
2. In the **same browser**, open <https://ca.account.sony.com/api/v1/ssocookie>.
3. It returns `{"npsso":"<64 characters>"}`. Copy the value.

The NPSSO gives full access to the account. Keep it out of the repo and the browser bundle.

## 2. Add it to `.env`

```bash
PSN_NPSSO=<npsso>
```

No quotes and no trailing spaces.

## 3. Check it works

From `portfolio-v5/`:

```bash
set -a; source .env; set +a
node --input-type=module -e 'import * as p from "psn-api"; const a = await p.exchangeAccessCodeForAuthTokens(await p.exchangeNpssoForAccessCode(process.env.PSN_NPSSO)); console.log((await p.getUserTrophyProfileSummary(a, "me")).trophyLevel);'
```

It prints your trophy level. Then, with `npm run dev` running, open `/games`. You should see the trophy summary and the Recent / Favourites / Library / Trophies tabs. If you only see Favourites and "PlayStation data is unavailable right now", the dev server log says why (lines start with `psn:`; see [Troubleshooting](#troubleshooting)).

## 4. Production (Vercel)

In the Vercel project, **Settings → Environment Variables**, set `PSN_NPSSO` for Production and Preview, then redeploy.

Don't use a `NEXT_PUBLIC_` name for it. That prefix inlines the value into the browser bundle, which would expose your account.

## Renewing the token

The NPSSO is the `npsso` cookie from your playstation.com sign-in, and it stops working when that cookie expires (commonly reported as about 2 months; psn-api doesn't document it). It also stops early if you sign out of playstation.com everywhere or change your password. When it expires, the Games section falls back to the curated favourites and the server logs a `psn:` error; nothing else breaks.

To renew it:

1. Repeat steps 1–3 to get and check a new NPSSO.
2. Note its expiry date: in the same browser, DevTools → **Application** → **Cookies** → `https://ca.account.sony.com` → `npsso` → **Expires**.
3. Update `PSN_NPSSO` in `.env` and Vercel, and redeploy.
4. Record the expiry date for the reminder below:

   ```bash
   gh variable set PSN_NPSSO_EXPIRES_ON --body YYYY-MM-DD
   ```

### Expiry reminder

`.github/workflows/psn-token-reminder.yml` runs daily at 09:00 IST. It reads the `PSN_NPSSO_EXPIRES_ON` repository variable, and from the day before that date it opens an issue labelled `psn-token` and assigned to the repo owner. GitHub emails the assignee, and the issue holds the renewal steps. It opens only one issue at a time; close it once you've renewed. It needs no secrets: it reads a date, not the token. The logic lives in `.github/scripts/psn-token-reminder.mjs`. To test it locally:

```bash
PSN_NPSSO_EXPIRES_ON=2026-12-01 TODAY=2026-11-30 GITHUB_REPOSITORY=Pratham82/portfolio-v5 DRY_RUN=1 node .github/scripts/psn-token-reminder.mjs
```

It only knows the date you record. If the token stops working early (sign-out, password change), there's no reminder; the Games section just falls back to favourites.

GitHub pauses scheduled workflows in a public repo after 60 days with no commits, and emails you before it does. If that happens, re-enable the workflow in the **Actions** tab.

## Auth flow

What `exchangeNpssoForAccessCode` and `exchangeAccessCodeForAuthTokens` do:

| Step | Request | Result |
|------|---------|--------|
| 1. NPSSO → access code | `GET https://ca.account.sony.com/api/authz/v3/oauth/authorize?access_type=offline&client_id=…&redirect_uri=com.scee.psxandroid.scecompcall://redirect&response_type=code&scope=psn:mobile.v2.core psn:clientapp`, with header `Cookie: npsso=<NPSSO>`, redirects not followed | A 302 whose `Location` holds `?code=<access code>` |
| 2. Access code → tokens | `POST https://ca.account.sony.com/api/authz/v3/oauth/token`, form body `code`, `grant_type=authorization_code`, `redirect_uri`, `token_format=jwt`, with Basic auth for the PlayStation app client that psn-api has built in | `access_token` (lasts **1 hour**) and `refresh_token` (lasts **10 days**; `refresh_token_expires_in` was `863999`) |
| 3. Data calls | Header `Authorization: Bearer <access_token>` | |

`lib/psn.ts` caches the access token in memory until 5 minutes before it expires. After that it exchanges the NPSSO again instead of storing the refresh token, so `PSN_NPSSO` is the only secret to manage.

## Data endpoints

`accountId` is `me` (the signed-in account) everywhere.

| Used for | psn-api function | Request |
|----------|------------------|---------|
| Trophy level and counts | `getUserTrophyProfileSummary` | `GET https://m.np.playstation.com/api/trophy/v1/users/me/trophySummary` |
| Played games, playtime, last played (Recent, Library) | `getUserPlayedGames` | `GET https://m.np.playstation.com/api/gamelist/v2/users/me/titles?limit=200&offset=0` |
| All trophy sets (Trophies tab) | `getUserTitles` | `GET https://m.np.playstation.com/api/trophy/v1/users/me/trophyTitles?limit=200&offset=0` |
| Title ID → trophy set progress (the bars on game cards); at most 5 IDs per call | `getUserTrophiesForSpecificTitle` | `GET https://m.np.playstation.com/api/trophy/v1/users/me/titles/trophyTitles?npTitleIds=PPSA…,CUSA…` |
| Owned games (the unplayed part of Library) | `getPurchasedGames` | `GET https://web.np.playstation.com/api/graphql/v1/op?operationName=getPurchasedGameList` (persisted GraphQL query) |

Covers come from `image.api.playstation.com` and trophy icons from `psnobj.prod.dl.playstation.net`; both are allowed in `next.config.js`.

## What's shown

| Section | How it's built |
|---------|----------------|
| Trophy summary | `getUserTrophyProfileSummary` |
| Recent | The 6 most recently played games |
| Library | Played games (by playtime), then owned games not yet played. Media apps (Netflix, Spotify, YouTube, ...) are filtered out, PS4/PS5 copies of a game are merged, and other editions of a played game are dropped using its `concept.titleIds`. |
| Progress on game cards | `getUserTrophiesForSpecificTitle`, an exact title ID → trophy set match. Names differ between endpoints ("Alan Wake 2" vs "Alan Wake II"), so name matching isn't reliable. |
| Trophies tab | `getUserTitles`, most recently updated first |
| Favourites | Hand-written in `src/data/games.json` |

## Troubleshooting

| Log message | Cause / fix |
|-------------|-------------|
| `psn: PSN_NPSSO is not set` | Add the env var (step 2 or 4). |
| `psn: Error: There was a problem retrieving your PSN access code. Is your NPSSO code valid?` | The NPSSO expired or was copied wrong. Get a new one (step 1). |
| `psn: purchased games: ...` | Only the owned-games list failed; the Library shows played games only. Usually temporary. |
| Images missing, `Invalid src prop` | PSN served an image from a new host. Add it to `images.remotePatterns` in `next.config.js`. |
