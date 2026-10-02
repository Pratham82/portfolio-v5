"use client";

import dynamic from "next/dynamic";

import { useTheme } from "next-themes";
import { Mascot } from "page-mascot";
import { ReactNode, useEffect, useState } from "react";

import AboutMe from "@/components/AboutMe";
import FloatingNav from "@/components/FloatingNav";
import HomeTabs from "@/components/HomePageTabs";
import Links from "@/components/Links";
import LocalTime from "@/components/LocalTime";
import MobileMenu from "@/components/MobileMenu";
import NowPlayingPill from "@/components/NowPlayingPill";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import ScrambleText from "@/components/ScrambleText";
import BlogList from "@/components/sections/BlogList";
import Experience from "@/components/sections/Experience";
import Games from "@/components/sections/Games";
import Now from "@/components/sections/Now";
import Projects from "@/components/sections/Projects";
import Uses from "@/components/sections/Uses";
import Skills from "@/components/Skills";
import SocialLinks from "@/components/SocialLinks";
import HeroWashes from "@/components/ui/hero-washes";
import { Separator } from "@/components/ui/separator";
import type { IGamesData } from "@/interface/games.interface";
import { HomePageTabs } from "@/interface/home.interface";
import type { INowData } from "@/interface/now.interface";
import { IProject } from "@/interface/projects.interface";
import type { PostMeta } from "@/lib/blogPosts";
import type { LinkMeta } from "@/lib/links";
import type { ExperiencePageData, HomePageData } from "@/lib/sanity/queries";
import { CALENDAR_THEME } from "@/src/data/calendarTheme";
import useNowPlaying from "@/src/hooks/useNowPlaying";
import useTabs from "@/src/hooks/useTabs";

// Client-only: the calendar depends on today's date and the resolved theme,
// so rendering it on the server causes a hydration mismatch.
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

export type HomeClientProps = {
  posts: {
    content: string;
    meta: PostMeta;
  }[];
  links: {
    content: string;
    meta: LinkMeta;
  }[];
  experience: ExperiencePageData;
  projects: IProject[];
  home: HomePageData;
  resumeLink: string;
  games: IGamesData | null;
  now: { updated: string; content: ReactNode; data: INowData };
};
const HomeClient = (props: HomeClientProps) => {
  const { posts, links, experience, projects, home, resumeLink, games, now } =
    props;
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

  const { tabs, group, handleTabChange, handleGroupChange } = useTabs();
  // Read ?from= from window.location rather than useSearchParams: on a static
  // page useSearchParams needs a Suspense boundary, which would drop the home
  // content from the server-rendered HTML.
  useEffect(() => {
    const url = new URL(window.location.href);
    const from = url.searchParams.get("from");
    const tabMap: Record<string, HomePageTabs> = {
      blog: HomePageTabs.BLOGS,
      links: HomePageTabs.LINKS,
    };

    const targetTab = from ? tabMap[from] : undefined;
    if (targetTab) {
      handleTabChange(targetTab);

      // Clean up the query parameter without a navigation.
      url.searchParams.delete("from");
      window.history.replaceState(null, "", url.pathname + url.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

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
        <Mascot
          directions="/mascots/kamran-directions.webp"
          reactions="/mascots/kamran-reactions.webp"
          size={160}
          label="mascot"
          className="hidden sm:block"
        />
        <h2 className="mt-2 text-sm leading-relaxed text-foreground/85 sm:text-base">
          <span dangerouslySetInnerHTML={{ __html: intro }} />
          {location && (
            <>
              <br />
              <span dangerouslySetInnerHTML={{ __html: location }} />{" "}
              <LocalTime className="text-[10px] sm:text-xs" />
              <br />
              <NowPlayingPill track={nowPlaying} className="mt-1" />
            </>
          )}
        </h2>
      </div>

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
        onTabChange={handleTabChange}
        onGroupChange={handleGroupChange}
        className="mt-2 hidden md:flex"
      />
      <section className="mt-6">
        {tabs.selected === HomePageTabs.EXPERIENCE && (
          <Experience {...experience} />
        )}
        {tabs.selected === HomePageTabs.PROJECTS && (
          <Projects projects={projects} />
        )}
        {tabs.selected === HomePageTabs.SKILLS && <Skills />}
        {tabs.selected === HomePageTabs.BLOGS && <BlogList posts={posts} />}
        {tabs.selected === HomePageTabs.LINKS && <Links links={links} />}
        {tabs.selected === HomePageTabs.ABOUTME && <AboutMe />}
        {tabs.selected === HomePageTabs.USES && <Uses />}
        {tabs.selected === HomePageTabs.GAMES && <Games games={games} />}
        {tabs.selected === HomePageTabs.NOW && <Now {...now} />}
      </section>
      <FloatingNav
        isMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selected={tabs.selected}
        onTabChange={handleTabChange}
      />
    </PageAnimationContainer>
  );
};

export default HomeClient;
