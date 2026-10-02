# Now page setup

The Now page (`/now`, the Now tab under Personal) is a short, hand-written update on what I'm focused on, followed by four live widgets:

| Widget | Shows | Source | Needs |
|--------|-------|--------|-------|
| On repeat | Top 5 artists and tracks, last ~4 weeks | Spotify Web API | `user-top-read` on `SPOTIFY_REFRESH_TOKEN` |
| Coding this week | Hours coded in the last 7 days, a bar per day, top 5 languages | WakaTime API | `WAKATIME_API_KEY` |
| Football | Next match, last 3 results (green W / red L) and table position (league + Champions League; rows tinted green → yellow → amber → red by position: top 20%, to 50%, to 80%, bottom 20%) for Man City and Real Madrid | FotMob (unofficial) | nothing |
| Recently watched | Latest 8 films by the date I watched them, with rating | Letterboxd RSS | nothing |

Every widget loads **on the server only** (`lib/now.ts` → one loader per source) when the page is built, then at most once an hour (ISR). If a source fails or isn't configured, its loader logs and returns `null`, and that widget is simply left out. The page and build never fail because of a third party.

The home page also shows my local time next to my location ("Mumbai📍 · 10:42 AM IST"). That's `components/LocalTime.tsx`, rendered in the browser only, and it needs no setup. `HomeShell` splits the Sanity subtitle at its last `<br>` and puts the clock after that last line, so keep the location as the subtitle's last line.

## 1. Write the Now text

Open **Now** in Sanity Studio, edit the body (markdown, rendered as MDX) and bump **Updated**, then publish. The Sanity webhook expires the cache, so `/now` and the home Now tab update on the next visit without a deploy.

## 2. Spotify: allow top artists and tracks

"On repeat" reads [Get User's Top Items](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks), which needs the `user-top-read` scope. A refresh token only has the scopes it was created with, so make a new one:

1. Follow [Spotify setup](spotify.md) steps 3–4. The authorize URL there already asks for `user-top-read`.
2. Replace `SPOTIFY_REFRESH_TOKEN` in `.env` and in Vercel. The client ID and secret don't change. The new token keeps working for the now-playing widget.

Until then, the build log shows `spotify: Error: top artists (403): ... Insufficient client scope` and the widget is hidden.

## 3. WakaTime: coding stats

1. Create a free account at [wakatime.com](https://wakatime.com).
2. Install the WakaTime extension in your editor (VS Code: search "WakaTime") and paste the API key it asks for.
3. Copy your **Secret API Key** from [wakatime.com/settings/api-key](https://wakatime.com/settings/api-key) and add it:

   ```bash
   WAKATIME_API_KEY=<key>
   ```

4. Add the same variable in Vercel (Production + Preview) and redeploy.

Stats need a day or two of coding before they show up. The free plan covers the last 7 days, which is all this widget uses.

## 4. Football and movies

Nothing to set up.

- **Football:** FotMob's site API needs no key. The clubs are the `TEAMS` list in `lib/football.ts`; a team's ID is in its FotMob URL (`fotmob.com/teams/8456/...`).
- **Movies:** the Letterboxd username is `LETTERBOXD_USER` in `lib/letterboxd.ts`. The profile must stay public.

## Check it works

```bash
npm run build
```

The log shows a `spotify:`, `wakatime:`, `football:` or `letterboxd:` line for any widget that couldn't load. Then `npm start` and open `/now`.

## Endpoints called

| Widget | Request |
|--------|---------|
| On repeat | `POST https://accounts.spotify.com/api/token` (refresh token → access token, shared with `/api/now-playing` via `lib/spotify.ts`), then `GET https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5` and `/v1/me/top/tracks?...` |
| Coding | `GET https://wakatime.com/api/v1/users/current/stats/last_7_days` and `GET .../summaries?range=last_7_days`, with `Authorization: Basic base64(WAKATIME_API_KEY)` |
| Football | `GET https://www.fotmob.com/api/data/teams?id=<teamId>` (about 700 KB; uses `fixtures.allFixtures` for matches and `table[]` for standings, one entry per competition with the club's row and the zone legend). Crests: `https://images.fotmob.com/image_resources/logo/teamlogo/<teamId>.png` |
| Movies | `GET https://letterboxd.com/Pratham82/rss/` (diary entries only; list posts are skipped). Sorted by `letterboxd:watchedDate` (newest first; same day: later `pubDate` first). |

Images come from `i.scdn.co` (Spotify), `images.fotmob.com` and `a.ltrbxd.com`; all are allowed in `next.config.js`.

## Tests

Playwright sets `NOW_LIVE_WIDGETS=off`, which skips every widget so screenshots don't change with my listening, coding or football results. The home page clock is marked `data-volatile` and masked in screenshots. An e2e test asserts the browser never calls any of these APIs.

## Troubleshooting

| Log message | Cause / fix |
|-------------|-------------|
| `spotify: Error: top artists (403): ... Insufficient client scope` | The refresh token lacks `user-top-read`. Redo step 2. |
| `wakatime: WAKATIME_API_KEY is not set` | Add the key (step 3). |
| `wakatime: Error: /stats/last_7_days (401)` | Wrong key. Copy the **Secret API Key** again. |
| `football: Error: team 8456 (...)` | FotMob changed or blocked its API. Only that club is hidden; check the endpoint in a browser. |
| `letterboxd: Error: feed (...)` | Letterboxd is down, or the profile is private or renamed. |
| Images missing, `Invalid src prop` | A source served images from a new host. Add it to `images.remotePatterns` in `next.config.js`. |
