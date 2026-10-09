"use client";

import dynamic from "next/dynamic";

import { useTheme } from "next-themes";
import { Mascot } from "page-mascot";
import { ReactNode, useState } from "react";

import FloatingNav from "@/components/FloatingNav";
import HomeTabs from "@/components/HomePageTabs";
import LocalTime from "@/components/LocalTime";
import MobileMenu from "@/components/MobileMenu";
import NowPlayingCard from "@/components/NowPlayingCard";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import ScrambleText from "@/components/ScrambleText";
import SocialLinks from "@/components/SocialLinks";
import HeroWashes from "@/components/ui/hero-washes";
import { Separator } from "@/components/ui/separator";
import WeatherIcon from "@/components/WeatherIcon";
import type { HomePageData } from "@/lib/sanity/queries";
import type { Weather } from "@/lib/weather";
import { CALENDAR_THEME } from "@/src/data/calendarTheme";
import useNowPlaying from "@/src/hooks/useNowPlaying";
import useTabs from "@/src/hooks/useTabs";

// Client-only: the calendar depends on today's date and the resolved theme,
// so rendering it on the server causes a hydration mismatch.
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

export type HomeShellProps = {
  home: HomePageData;
  resumeLink: string;
  /** Current weather in Mumbai, or `null` when Open-Meteo failed. */
  weather: Weather | null;
  /** The selected tab's route. */
  children: ReactNode;
};

/** The home hero and tab bar, shared by every tab route via `app/(home)/layout.tsx`. */
const HomeShell = ({ home, resumeLink, weather, children }: HomeShellProps) => {
  const { title, subtitle } = home;
  // The Sanity subtitle ends with "<br> <small>...Mumbai📍...</small>"; split
  // it off so the local time can sit right after the location.
  const breakIndex = subtitle.search(/<br\s*\/?>(?![\s\S]*<br)/i);
  const intro = breakIndex === -1 ? subtitle : subtitle.slice(0, breakIndex);
  const location =
    breakIndex === -1
      ? ""
      : subtitle.slice(breakIndex).replace(/^<br\s*\/?>/i, "");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: nowPlaying } = useNowPlaying();
  const { resolvedTheme } = useTheme();

  const { tabs, group, handleGroupChange } = useTabs();

  const [title1, title2] = title.split(/(?<=I'm)/).map((s: string) => s.trim());

  return (
    <PageAnimationContainer className="relative flex flex-col">
      <HeroWashes />
      <div className="mb-2 mt-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
          {title1}
          <span className="flex items-center gap-1">
            <ScrambleText text={title2} className="m-0 p-0" />
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* <Image
          src={avatar?.asset?.url || ""}
          alt="profile"
          width={90}
          height={90}
          className="relative rounded-2xl grayscale mt-2"
        /> */}
        {/* Mascot sizes itself with inline styles, so shrink it on phones with a
            scale inside a box of the scaled size. */}
        <div className="size-24 shrink-0 sm:size-40">
          <div className="origin-top-left scale-[0.6] sm:scale-100">
            <Mascot
              directions="/mascots/kamran-directions.webp"
              reactions="/mascots/kamran-reactions.webp"
              size={160}
              label="mascot"
            />
          </div>
        </div>
        <h2 className="mt-2 min-w-0 text-sm leading-relaxed text-foreground/85 sm:text-base">
          <span dangerouslySetInnerHTML={{ __html: intro }} />
          {location && (
            <>
              <br />
              <span dangerouslySetInnerHTML={{ __html: location }} />{" "}
              {/* <small> to match the location, which Sanity wraps in one. */}
              <small>
                <LocalTime />
                {weather && (
                  <span
                    data-volatile
                    title="Current weather in Mumbai"
                    className="text-muted-foreground"
                  >
                    {" "}
                    ·{" "}
                    <span className="font-semibold text-foreground/85">
                      <WeatherIcon code={weather.code} isDay={weather.isDay} />{" "}
                      {weather.temperature}°C
                    </span>
                  </span>
                )}
              </small>
            </>
          )}
        </h2>
      </div>
      <NowPlayingCard track={nowPlaying} className="mt-4" />

      <div className="my-4">
        <SocialLinks align="left" resumeLink={resumeLink} />
      </div>

      <div className="mb-4 min-h-[126px] overflow-x-auto" data-volatile>
        <GitHubCalendar
          username="Pratham82"
          colorScheme={resolvedTheme === "light" ? "light" : "dark"}
          theme={CALENDAR_THEME}
          blockSize={7}
        />
      </div>

      <Separator className="mb-2 mt-2 md:hidden" />
      <HomeTabs
        tabOptions={tabs}
        group={group}
        onGroupChange={handleGroupChange}
        className="mt-2 hidden md:flex"
      />
      <section className="mt-6" data-testid="home-tab-content">
        {children}
      </section>
      <FloatingNav
        isMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selected={tabs.selected}
      />
    </PageAnimationContainer>
  );
};

export default HomeShell;
