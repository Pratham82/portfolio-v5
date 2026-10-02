import type { ITopItems } from "@/interface/now.interface";

// TODO: drop the NEXT_PUBLIC_ fallbacks once the Vercel env vars are renamed.
const SPOTIFY_CLIENT_ID =
  process.env.SPOTIFY_CLIENT_ID ?? process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET =
  process.env.SPOTIFY_CLIENT_SECRET ??
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN =
  process.env.SPOTIFY_REFRESH_TOKEN ??
  process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

export const hasSpotifyCredentials = Boolean(
  SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN,
);

/** Refresh the access token this long before Spotify says it expires. */
const TOKEN_EXPIRY_MARGIN_MS = 5 * 60 * 1000;
/** How many top artists and tracks the Now page shows. */
const TOP_LIMIT = 5;

// Access tokens last an hour. Reuse one for as long as this server instance
// lives instead of refreshing on every request.
let cachedToken: { value: string; expiresAt: number } | null = null;

/** Forget the cached token, e.g. after Spotify rejects it with a 401. */
export const clearAccessToken = () => {
  cachedToken = null;
};

export const getAccessToken = async (): Promise<string> => {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");
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

type SpotifyImage = { url: string; width: number | null };
type SpotifyArtist = {
  id: string;
  name: string;
  images: SpotifyImage[];
  external_urls: { spotify: string };
};
type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: SpotifyImage[] };
  external_urls: { spotify: string };
};

/** The smallest image that's still at least `min` pixels wide. */
const pickImage = (images: SpotifyImage[], min = 160) =>
  [...images]
    .sort((a, b) => (a.width ?? 0) - (b.width ?? 0))
    .find((image) => (image.width ?? 0) >= min)?.url ?? images[0]?.url;

const getTop = async <T>(type: "artists" | "tracks", token: string) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?time_range=short_term&limit=${TOP_LIMIT}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (res.status === 401) clearAccessToken();
  if (!res.ok) {
    throw new Error(`top ${type} (${res.status}): ${await res.text()}`);
  }
  const { items } = (await res.json()) as { items: T[] };
  return items;
};

/**
 * My top artists and tracks for roughly the last 4 weeks (Spotify's
 * `short_term`). Needs the `user-top-read` scope on the refresh token; see
 * docs/spotify.md. Returns `null` (and logs) on any failure.
 */
export const getTopItems = async (): Promise<ITopItems | null> => {
  if (!hasSpotifyCredentials) {
    console.warn("spotify: missing SPOTIFY_* env vars; skipping top items");
    return null;
  }

  try {
    const token = await getAccessToken();
    const [artists, tracks] = await Promise.all([
      getTop<SpotifyArtist>("artists", token),
      getTop<SpotifyTrack>("tracks", token),
    ]);

    return {
      artists: artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        imageUrl: pickImage(artist.images),
        url: artist.external_urls.spotify,
      })),
      tracks: tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        imageUrl: pickImage(track.album.images, 64),
        url: track.external_urls.spotify,
      })),
    };
  } catch (error) {
    console.error("spotify:", error);
    return null;
  }
};
