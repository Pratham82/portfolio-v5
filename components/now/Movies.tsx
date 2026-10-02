import Image from "next/image";

import { ArrowsClockwiseIcon, FilmSlateIcon } from "@phosphor-icons/react";

import { HoverItem, HoverList } from "@/components/ui/hover-list";
import { IFilm } from "@/interface/now.interface";
import { formatDay, toIstDate } from "@/src/utils/formatIst";

import Widget from "./Widget";

/** 3.5 → "★★★½" */
const stars = (rating: number) =>
  "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");

const Movies = ({ films }: { films: IFilm[] }) => (
  <Widget
    id="movies"
    title="Recently watched"
    icon={<FilmSlateIcon />}
    source={{ label: "Letterboxd", url: "https://letterboxd.com/Pratham82/" }}
  >
    <HoverList className="grid grid-cols-3 sm:grid-cols-4">
      {films.map((film) => (
        <HoverItem id={`film-${film.url}`} key={film.url}>
          <a
            href={film.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-3"
          >
            <div className="relative aspect-2/3 overflow-hidden rounded-md border bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
              {film.posterUrl && (
                <Image
                  src={film.posterUrl}
                  alt={film.title}
                  fill
                  sizes="(min-width: 640px) 150px, 30vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              )}
            </div>
            <p
              title={film.title}
              className="mt-2 line-clamp-2 text-xs font-medium text-foreground"
            >
              {film.title}
              {film.year && (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  {film.year}
                </span>
              )}
            </p>
            <p className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              {film.rating !== undefined && (
                <span aria-label={`${film.rating} stars`}>
                  {stars(film.rating)}
                </span>
              )}
              {film.rewatch && (
                <ArrowsClockwiseIcon aria-label="Rewatch" className="size-3" />
              )}
              <span>
                {film.rating !== undefined || film.rewatch ? "· " : ""}
                {formatDay(film.watchedDate ?? toIstDate(film.addedAt))}
              </span>
            </p>
          </a>
        </HoverItem>
      ))}
    </HoverList>
  </Widget>
);

export default Movies;
