import Image from "next/image";

import { HeadphonesIcon } from "@phosphor-icons/react";

import { ITopItems } from "@/interface/now.interface";

import Widget from "./Widget";

const OnRepeat = ({ topItems }: { topItems: ITopItems }) => (
  <Widget
    id="on-repeat"
    title="On repeat"
    icon={<HeadphonesIcon />}
    source={{ label: "Spotify", url: "https://open.spotify.com" }}
  >
    <p className="mb-4 text-sm text-muted-foreground">
      My most played artists and tracks over the last 4 weeks.
    </p>

    <ol className="mb-5 flex gap-4 overflow-x-auto pb-1">
      {topItems.artists.map((artist, index) => (
        <li key={artist.id} className="w-20 shrink-0">
          <a
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block text-center"
          >
            <span className="relative mx-auto block size-16 overflow-hidden rounded-full border bg-muted">
              {artist.imageUrl && (
                <Image
                  src={artist.imageUrl}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </span>
            <span className="mt-2 block truncate text-xs font-medium text-foreground">
              {artist.name}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              #{index + 1}
            </span>
          </a>
        </li>
      ))}
    </ol>

    <ol className="flex flex-col">
      {topItems.tracks.map((track, index) => (
        <li key={track.id}>
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
          >
            <span className="w-4 shrink-0 text-right font-mono text-xs text-muted-foreground">
              {index + 1}
            </span>
            <span className="relative size-9 shrink-0 overflow-hidden rounded border bg-muted">
              {track.imageUrl && (
                <Image
                  src={track.imageUrl}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {track.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {track.artist}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  </Widget>
);

export default OnRepeat;
