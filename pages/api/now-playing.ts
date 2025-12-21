import querystring from "querystring";

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
).toString("base64");

export type NowPlayingSuccessResponse = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NowPlayingSuccessResponse | void> {
  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const SPOTIFY_ACCESS_TOKEN = tokenResponse?.data.access_token;

    const nowPlayingResponse = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
        },
      },
    );

    if (nowPlayingResponse.status === 204 || nowPlayingResponse.data === "") {
      return res.status(200).json({ isPlaying: false });
    }

    const track = nowPlayingResponse.data;

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
