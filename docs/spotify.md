# Spotify "now playing" setup

The home page widget calls `/api/now-playing` (`app/api/now-playing/route.ts`). On every request that route handler:

1. exchanges `SPOTIFY_REFRESH_TOKEN` for a short-lived access token ([Refreshing tokens](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens)), then
2. calls [Get Currently Playing Track](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track).

It needs three server-only env vars: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`. You get the refresh token once, through Spotify's [Authorization Code flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow). It stays valid until you revoke the app's access in your Spotify account.

## 1. Create a Spotify app

Spotify's own guide: [Apps](https://developer.spotify.com/documentation/web-api/concepts/apps).

1. Sign in at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) with the account whose listening you want to show, and click **Create app**.
2. Fill in a name and description. Under **Which API/SDKs are you planning to use?**, tick **Web API**.
3. Add the redirect URI `http://127.0.0.1:3000/api/callback`. You can add more later under **Settings → Edit**.
4. Save. On the app's **Settings** page, copy the **Client ID** and click **View client secret** to copy the **Client secret**. Both are 32 characters long.

Redirect URI rules ([Redirect URIs](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri)):

- Use `127.0.0.1`, not `localhost`. Spotify rejects `localhost`.
- The URI has to match **exactly**, including the port and the trailing slash (don't add one). If your dev server runs on another port, e.g. 3001, register `http://127.0.0.1:3001/api/callback` too, and use that same URI in steps 3 and 4 below.

## 2. Add the client credentials to `.env`

```bash
SPOTIFY_CLIENT_ID=<client id>
SPOTIFY_CLIENT_SECRET=<client secret>
```

No quotes and no trailing spaces. Put the real values here, not another variable's name: `SPOTIFY_CLIENT_ID=NEXT_PUBLIC_SPOTIFY_CLIENT_ID` sends that literal text and fails with `invalid_client`.

Load them into your shell for the commands below:

```bash
set -a; source .env; set +a
```

## 3. Get an authorization code

Start the app with `npm run dev`, then open:

```bash
open "https://accounts.spotify.com/authorize?client_id=$SPOTIFY_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Fcallback&scope=user-read-currently-playing%20user-read-playback-state%20user-top-read"
```

Approve access. Spotify redirects to `/api/callback` (`app/api/callback/route.ts`), which prints `Authorization Code: …`. Copy the code.

The scopes ([Scopes](https://developer.spotify.com/documentation/web-api/concepts/scopes)): `user-read-currently-playing` and `user-read-playback-state` for `/api/now-playing`, and `user-top-read` for the Now page's "On repeat" widget. A refresh token keeps the scopes it was created with, so after adding a scope you need a new one: repeat steps 3–4.

## 4. Exchange the code for a refresh token

Run this straight away. The code is single-use and expires after a few minutes.

```bash
CODE='<paste the code>'
curl -s -X POST https://accounts.spotify.com/api/token \
  -u "$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET" \
  -d grant_type=authorization_code \
  --data-urlencode "code=$CODE" \
  -d redirect_uri=http://127.0.0.1:3000/api/callback
```

`redirect_uri` must be byte-for-byte the one used in step 3, or Spotify answers `invalid_grant` / `Invalid redirect URI`.

The JSON response contains `access_token` (expires in an hour, ignore it) and `refresh_token`. Add the refresh token to `.env`:

```bash
SPOTIFY_REFRESH_TOKEN=<refresh_token>
```

## 5. Check it works

```bash
set -a; source .env; set +a
curl -s -X POST https://accounts.spotify.com/api/token \
  -u "$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET" \
  -d grant_type=refresh_token \
  --data-urlencode "refresh_token=$SPOTIFY_REFRESH_TOKEN"
```

A response with an `access_token` means the credentials are good. Then, with the dev server running:

```bash
curl -s http://127.0.0.1:3000/api/now-playing
```

It returns `{"isPlaying":false}` when nothing is playing, or the track as JSON while something plays. A 500 means something is wrong; the dev server log shows Spotify's error (see [Troubleshooting](#troubleshooting)).

## 6. Production (Vercel)

In the Vercel project, **Settings → Environment Variables**, set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` for Production and Preview, then redeploy. The same refresh token works in every environment; the production domain does not have to be a registered redirect URI, because the redirect is only used once, locally, to get the token.

Don't use `NEXT_PUBLIC_` names for these. That prefix inlines the value into the browser bundle, which would expose the client secret. The route still falls back to the old `NEXT_PUBLIC_SPOTIFY_*` names; delete them from Vercel once the new ones are set.

## Troubleshooting

| Error                                         | Where                      | Cause / fix                                                                                                                                   |
| --------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `INVALID_CLIENT: Invalid redirect URI`        | Spotify authorize page     | The `redirect_uri` isn't registered on the app. Add the exact URI (host, port, path) in **Settings → Edit**.                                  |
| `INVALID_CLIENT: Invalid client`              | Spotify authorize page     | `client_id` is empty or wrong. Did you `source .env` in this shell?                                                                           |
| `invalid_client`                              | Token request / server log | Wrong client ID or secret. Re-copy both from the dashboard.                                                                                   |
| `invalid_grant`, `Invalid redirect URI`       | Code exchange              | `redirect_uri` differs from the one used in step 3 (often a different port).                                                                  |
| `invalid_grant`, `Invalid authorization code` | Code exchange              | The code expired or was already used. Repeat step 3.                                                                                          |
| `invalid_grant`, `Invalid refresh token`      | Server log                 | The token was revoked, or belongs to another app. Repeat steps 3–4.                                                                           |
| `403` from currently-playing                  | Server log                 | The Spotify account isn't allowed to use the app. Apps in development mode only work for the owner and users added under **User Management**. |
| `401` from currently-playing                  | Server log                 | The token lacks the scopes. Repeat steps 3–4 with all three scopes.                                                                           |

If you regenerate the client secret, update it in `.env` and Vercel. Run the check in step 5 again afterwards; if the refresh token is rejected, repeat steps 3–4.
