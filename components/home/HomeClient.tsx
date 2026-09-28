"use client";

import { useTheme } from "next-themes";
import { Mascot } from "page-mascot";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

import AboutMe from "@/components/AboutMe";
import ActiveMiniTabs from "@/components/ActiveMiniTab";
import FloatingNav from "@/components/FloatingNav";
import HomeTabs from "@/components/HomePageTabs";
import Links from "@/components/Links";
import MobileMenu from "@/components/MobileMenu";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import ScrambleText from "@/components/ScrambleText";
import BlogList from "@/components/sections/BlogList";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Uses from "@/components/sections/Uses";
import Skills from "@/components/Skills";
import SocialLinks from "@/components/SocialLinks";
import SpotifyNowPlayingMonoChrome from "@/components/SpotifyNowPlayingMonoChrome";
import HeroWashes from "@/components/ui/hero-washes";
import { Separator } from "@/components/ui/separator";
import { HomePageTabs } from "@/interface/home.interface";
import { IProject } from "@/interface/projects.interface";
import type { PostMeta } from "@/lib/blogPosts";
import type { LinkMeta } from "@/lib/links";
import type { ExperiencePageData, HomePageData } from "@/lib/sanity/queries";
import { CALENDAR_THEME } from "@/src/data/calendarTheme";
import useNowPlaying from "@/src/hooks/useNowPlaying";
import useTabs from "@/src/hooks/useTabs";

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
};
const HomeClient = (props: HomeClientProps) => {
  const { posts, links, experience, projects, home, resumeLink } = props;
  const { title, subtitle } = home;

  const [visibleData, setVisibleData] = useState({
    isContributionsVisible: false,
    isNowPlayingVisible: false,
    isSkillsVisible: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const spotifyNowPlayingData = useNowPlaying();
  const { resolvedTheme } = useTheme();

  const spotifyNowPlayingProps = {
    album: spotifyNowPlayingData.data?.album || "",
    albumImageUrl: spotifyNowPlayingData.data?.albumImageUrl || "",
    artist: spotifyNowPlayingData.data?.artist || "",
    title: spotifyNowPlayingData.data?.title || "",
    isPlaying: spotifyNowPlayingData.data?.isPlaying ?? false,
    songUrl: spotifyNowPlayingData.data?.songUrl || "",
  };

  const { tabs, handleTabChange } = useTabs();
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
        <h2
          dangerouslySetInnerHTML={{ __html: subtitle }}
          className="mt-2 text-sm leading-relaxed text-foreground/85 sm:text-base"
        />
      </div>

      <div className="my-4">
        <SocialLinks align="left" resumeLink={resumeLink} />
      </div>
      {/* <MindMap data={skillsMindMapData} /> */}
      {/* <h2 className="mb-2 mt-4 text-xl">{techStack?.techStackTitle}</h2> */}
      {/* <div className="flex flex-wrap justify-center">
        {techStack?.techStacks?.map((tech) => (
          <span className="text-md pr-1" key={tech}>
            {tech},
          </span>
        ))}
      </div> */}

      {/* <h2 className="mb-2 mt-4 text-xl">{contributions?.contributionsTitle}</h2> */}
      {/* <Link href={socialLinks[0].link} target="_blank">
        <img
          src={contributions?.contributionsLink || ""}
          alt="github-contributions-chart"
          // width={200}
          height={90}
          className="grayscale"
        />
      </Link> */}
      {/* <div className="flex pt-8">
        {pageRedirects?.map((page) => (
          <Link
            key={page.linkTitle}
            href={page?.link}
            className="flex items-center pr-4"
          >
            {page?.linkTitle} <ArrowUpRightIcon className="pl-2" size={26} />
          </Link>
        ))}
      </div> */}

      <ActiveMiniTabs
        setVisibleData={setVisibleData}
        visibleData={visibleData}
      />

      <div className="mt-4 mb-2">
        {visibleData.isContributionsVisible ? (
          <GitHubCalendar
            username="Pratham82"
            colorScheme={resolvedTheme === "light" ? "light" : "dark"}
            theme={CALENDAR_THEME}
            blockSize={7}
          />
        ) : null}
        {visibleData.isNowPlayingVisible ? (
          <SpotifyNowPlayingMonoChrome {...spotifyNowPlayingProps} />
        ) : null}
        {visibleData.isSkillsVisible ? <Skills /> : null}
      </div>

      <Separator className="mb-2 mt-2 md:hidden" />
      <HomeTabs
        tabOptions={tabs}
        onTabChange={handleTabChange}
        className="mt-2 hidden md:flex"
      />
      <section className="mt-6">
        {tabs.selected === HomePageTabs.EXPERIENCE && (
          <Experience {...experience} />
        )}
        {tabs.selected === HomePageTabs.PROJECTS && (
          <Projects projects={projects} />
        )}
        {tabs.selected === HomePageTabs.BLOGS && <BlogList posts={posts} />}
        {tabs.selected === HomePageTabs.LINKS && <Links links={links} />}
        {tabs.selected === HomePageTabs.ABOUTME && <AboutMe />}
        {tabs.selected === HomePageTabs.USES && <Uses />}
      </section>
      <FloatingNav
        isMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        tabOptions={tabs}
        onTabChange={handleTabChange}
      />
    </PageAnimationContainer>
  );
};

export default HomeClient;
