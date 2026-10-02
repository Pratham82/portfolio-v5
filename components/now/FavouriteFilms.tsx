import Image from "next/image";

import { HeartIcon } from "@phosphor-icons/react";

import { HoverItem, HoverList } from "@/components/ui/hover-list";
import { IFavouriteFilm } from "@/interface/now.interface";

import Widget from "./Widget";

/** The four favourite films pinned to my Letterboxd profile. */
const FavouriteFilms = ({ films }: { films: IFavouriteFilm[] }) => (
  <Widget
    id="favourite-films"
    title="Favourite films"
    icon={<HeartIcon />}
    source={{ label: "Letterboxd", url: "https://letterboxd.com/Pratham82/" }}
  >
    <HoverList className="grid grid-cols-4">
      {films.map((film) => (
        <HoverItem id={`favourite-${film.url}`} key={film.url}>
          <a
            href={film.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-1.5 sm:p-3"
          >
            <div className="relative aspect-2/3 overflow-hidden rounded-md border bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
              {film.posterUrl && (
                <Image
                  src={film.posterUrl}
                  alt={film.title}
                  fill
                  sizes="(min-width: 640px) 150px, 22vw"
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
          </a>
        </HoverItem>
      ))}
    </HoverList>
  </Widget>
);

export default FavouriteFilms;
