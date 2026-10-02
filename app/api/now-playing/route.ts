import { NowPlayingSuccessResponse } from "@/interface/spotify.interface";
import {
  clearAccessToken,
  getAccessToken,
  hasSpotifyCredentials,
} from "@/lib/spotify";

/**
 * Visitors share one answer for this long (Vercel's CDN caches the response),
 * so Spotify calls don't grow with traffic. Keep in sync with the polling
 * interval in src/hooks/useNowPlaying.ts.
 */
const CACHE_SECONDS = 30;

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

export const GET = async () => {
  if (!hasSpotifyCredentials) {
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
      clearAccessToken();
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
