"use client";

import GameCard from "@/components/games/GameCard";
import TrophyProgressRow from "@/components/games/TrophyProgressRow";
import TrophySummary from "@/components/games/TrophySummary";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import { HoverItem, HoverList } from "@/components/ui/hover-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IGamesData, ILibraryGame } from "@/interface/games.interface";
import { favouriteGames } from "@/src/data/games";

enum GamesTab {
  RECENT = "Recent",
  FAVOURITES = "Favourites",
  LIBRARY = "Library",
  TROPHIES = "Trophies",
}

const CARD_GRID = "grid grid-cols-2 sm:grid-cols-3";

// UTC and a fixed locale, so the server and browser render the same text.
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const gameMeta = (game: ILibraryGame, showDate = false) =>
  [
    game.platform,
    game.hours !== undefined ? `${game.hours}h` : "Not played",
    showDate && game.lastPlayed ? formatDate(game.lastPlayed) : undefined,
    game.psPlus ? "PS Plus" : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

const GameGrid = ({
  id,
  games,
  showDate,
}: {
  id: string;
  games: ILibraryGame[];
  showDate?: boolean;
}) => (
  <HoverList className={CARD_GRID}>
    {games.map((game) => (
      <HoverItem id={`${id}-${game.titleId}`} key={game.titleId}>
        <GameCard
          name={game.name}
          imageUrl={game.imageUrl}
          meta={gameMeta(game, showDate)}
          progress={game.trophyProgress}
        />
      </HoverItem>
    ))}
  </HoverList>
);

const Favourites = () => (
  <HoverList className={CARD_GRID}>
    {favouriteGames.map((game) => (
      <HoverItem id={`favourite-${game.name}`} key={game.name}>
        <GameCard
          name={game.name}
          imageUrl={game.image}
          meta={game.platform}
          note={game.note}
          url={game.url}
        />
      </HoverItem>
    ))}
  </HoverList>
);

const Games = ({ games }: { games: IGamesData | null }) => (
  <PageAnimationContainer>
    <PageTitle className="mb-2">Games</PageTitle>
    <p className="mb-6 text-sm text-muted-foreground">
      What I&apos;m playing on PlayStation, pulled from my PSN profile, plus the
      games I keep coming back to.
    </p>

    {games ? (
      <>
        <TrophySummary summary={games.summary} />
        <Tabs defaultValue={GamesTab.RECENT}>
          <TabsList className="mb-6">
            <TabsTrigger value={GamesTab.RECENT}>Recent</TabsTrigger>
            <TabsTrigger value={GamesTab.FAVOURITES}>Favourites</TabsTrigger>
            <TabsTrigger value={GamesTab.LIBRARY}>
              Library
              <span className="font-mono text-xs text-muted-foreground">
                {games.library.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value={GamesTab.TROPHIES}>Trophies</TabsTrigger>
          </TabsList>
          <TabsContent value={GamesTab.RECENT}>
            <GameGrid id="recent" games={games.recent} showDate />
          </TabsContent>
          <TabsContent value={GamesTab.FAVOURITES}>
            <Favourites />
          </TabsContent>
          <TabsContent value={GamesTab.LIBRARY}>
            <GameGrid id="library" games={games.library} />
          </TabsContent>
          <TabsContent value={GamesTab.TROPHIES}>
            <HoverList className="grid">
              {games.trophies.map((title) => (
                <HoverItem id={`trophies-${title.id}`} key={title.id}>
                  <TrophyProgressRow title={title} />
                </HoverItem>
              ))}
            </HoverList>
          </TabsContent>
        </Tabs>
      </>
    ) : (
      <>
        <h2 className="mb-2 font-medium text-foreground">Favourites</h2>
        <Favourites />
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          PlayStation data is unavailable right now.
        </p>
      </>
    )}
  </PageAnimationContainer>
);

export default Games;
