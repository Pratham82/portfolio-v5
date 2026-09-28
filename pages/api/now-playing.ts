import type { NextApiRequest, NextApiResponse } from "next";

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

type NowPlayingResponse =
  NowPlayingSuccessResponse | { isPlaying: false } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NowPlayingResponse>,
) {
  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: SPOTIFY_REFRESH_TOKEN ?? "",
        }),
      },
    );
    if (!tokenResponse.ok) throw new Error("Failed to refresh token");

    const { access_token: SPOTIFY_ACCESS_TOKEN } = await tokenResponse.json();

    const nowPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
        },
      },
    );

    if (nowPlayingResponse.status === 204) {
      return res.status(200).json({ isPlaying: false });
    }
    if (!nowPlayingResponse.ok) throw new Error("Failed to fetch track");

    const body = await nowPlayingResponse.text();
    if (body === "") {
      return res.status(200).json({ isPlaying: false });
    }

    const track = JSON.parse(body);

    const isPlaying = track.is_playing;
    const title = track.item.name;
    const artist = track.item.artists.map((a: any) => a.name).join(", ");
    const album = track.item.album.name;
    const albumImageUrl = track.item.album.images[0].url;
    const songUrl = track.item.external_urls.spotify;

    return res.status(200).json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch now playing" });
  }
}
