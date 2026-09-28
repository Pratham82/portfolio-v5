import { NowPlayingSuccessResponse } from "@/interface/spotify.interface";

// TODO: drop the NEXT_PUBLIC_ fallbacks once the Vercel env vars are renamed.
const SPOTIFY_CLIENT_ID =
  process.env.SPOTIFY_CLIENT_ID ?? process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET =
  process.env.SPOTIFY_CLIENT_SECRET ??
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN =
  process.env.SPOTIFY_REFRESH_TOKEN ??
  process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
).toString("base64");

/**
 * Visitors share one answer for this long (Vercel's CDN caches the response),
 * so Spotify calls don't grow with traffic. Keep in sync with the polling
 * interval in src/hooks/useNowPlaying.ts.
 */
const CACHE_SECONDS = 30;
/** Refresh the access token this long before Spotify says it expires. */
const TOKEN_EXPIRY_MARGIN_MS = 5 * 60 * 1000;

type NowPlayingResponse =
  NowPlayingSuccessResponse | { isPlaying: false } | { error: string };

const json = (body: NowPlayingResponse, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      // Never cache errors, so a failure clears on the next request.
      "Cache-Control":
        status === 200
          ? `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`
          : "no-store",
    },
  });

// Always run on request; caching is done with the Cache-Control header above.
export const dynamic = "force-dynamic";

// Access tokens last an hour. Reuse one for as long as this server instance
// lives instead of refreshing on every request.
let cachedToken: { value: string; expiresAt: number } | null = null;

const getAccessToken = async (): Promise<string> => {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN ?? "",
    }),
  });
  if (!tokenResponse.ok) {
    throw new Error(
      `Failed to refresh token (${tokenResponse.status}): ${await tokenResponse.text()}`,
    );
  }

  const { access_token: value, expires_in: expiresIn } =
    await tokenResponse.json();
  cachedToken = {
    value,
    expiresAt: Date.now() + expiresIn * 1000 - TOKEN_EXPIRY_MARGIN_MS,
  };

  return value;
};

export const GET = async () => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    console.error("now-playing: missing SPOTIFY_* env vars");
    return json({ isPlaying: false });
  }

  try {
    const accessToken = await getAccessToken();

    const nowPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (nowPlayingResponse.status === 204) {
      return json({ isPlaying: false });
    }
    if (nowPlayingResponse.status === 401) {
      // The token was revoked early; fetch a new one on the next request.
      cachedToken = null;
    }
    if (!nowPlayingResponse.ok) {
      throw new Error(
        `Failed to fetch track (${nowPlayingResponse.status}): ${await nowPlayingResponse.text()}`,
      );
    }

    const body = await nowPlayingResponse.text();
    if (body === "") {
      return json({ isPlaying: false });
    }

    const track = JSON.parse(body);

    const isPlaying = track.is_playing;
    const title = track.item.name;
    const artist = track.item.artists.map((a: any) => a.name).join(", ");
    const album = track.item.album.name;
    const albumImageUrl = track.item.album.images[0].url;
    const songUrl = track.item.external_urls.spotify;

    return json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    });
  } catch (error) {
    console.error("now-playing:", error);
    return json({ error: "Failed to fetch now playing" }, 500);
  }
};
