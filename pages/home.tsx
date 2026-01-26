import Image from "next/image";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
// import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

import {
  ActiveMiniTabs,
  HomeTabs,
  HomepageSkeleton,
  PageAnimationContainer,
  ScrambleText,
  SocialLinks,
  SpotifyNowPlayingMonoChrome,
  ThemeSwitcher as ThemToggler,
  Links,
  AboutMe,
} from "@/components";

import { HomePageTabs, IHomePageResponse } from "../interface/home.interface";
import { PostMeta, getAllPosts } from "../lib/blogPosts";
import { getAllLinks } from "../lib/links";
import { homePage } from "../src/graphql/queries";
import useGetPageData from "../src/hooks/useGetPageData";
import useNowPlaying from "../src/hooks/useNowPlaying";
import useTabs from "../src/hooks/useTabs";

import Blogs from "./blogs";
import Experience from "./experience";
import Projects from "./projects";

type HomeProps = {
  posts: {
    content: string;
    meta: PostMeta;
  }[];
  links: ReturnType<typeof getAllLinks>;
};
const HomePage = (props: HomeProps) => {
  const { posts, links } = props;
  const { data, loading } = useQuery(homePage);
  const { title, subtitle = "", pageData } = useGetPageData(data);
  const [visibleData, setVisibleData] = useState({
    isContributionsVisible: false,
    isNowPlayingVisible: false,
  });

  const { avatar }: IHomePageResponse = pageData || {};

  const spotifyNowPlayingData = useNowPlaying();
  const { theme } = useTheme();

  const spotifyNowPlayingProps = {
    album: spotifyNowPlayingData.data?.album || "",
    albumImageUrl: spotifyNowPlayingData.data?.albumImageUrl || "",
    artist: spotifyNowPlayingData.data?.artist || "",
    title: spotifyNowPlayingData.data?.title || "",
    isPlaying: spotifyNowPlayingData.data?.isPlaying ?? false,
    songUrl: spotifyNowPlayingData.data?.songUrl || "",
  };

  const { tabs, handleTabChange } = useTabs();
  const router = useRouter();

  useEffect(() => {
    const { from, ...restQuery } = router.query;

    if (from && typeof from === "string") {
      const tabMap: Record<string, HomePageTabs> = {
        blog: HomePageTabs.BLOGS,
        links: HomePageTabs.LINKS,
      };

      const targetTab = tabMap[from];
      if (targetTab) {
        handleTabChange(targetTab);

        // Clean up the query parameter
        router.replace(
          {
            pathname: router.pathname,
            query: restQuery,
          },
          undefined,
          { shallow: true },
        );
      }
    }
  }, []);

  const [title1, title2] = title.split(/(?<=I'm)/).map((s: string) => s.trim());

  if (loading) {
    return <HomepageSkeleton />;
  }

  return (
    <PageAnimationContainer className="flex flex-col">
      <div className="mb-2 mt-6 flex items-center justify-between">
        <h1 className="text-[20px] md:text-[28px] font-bold flex items-center gap-2">
          {title1}
          <span className="flex items-center gap-1">
            <ScrambleText text={title2} className="p-0 m-0" />
          </span>
        </h1>
        <ThemToggler />
      </div>

      <div className="flex items-center gap-2">
        <Image
          src={avatar?.asset?.url || ""}
          alt="profile"
          width={90}
          height={90}
          className="relative rounded-2xl grayscale mt-2"
        />
        <h2
          dangerouslySetInnerHTML={{ __html: subtitle }}
          className="mt-2 text-md dark:text-slate-300 text-black"
        />
      </div>

      <div className="my-4">
        <SocialLinks align="left" />
      </div>

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
            colorScheme={theme === "dark" ? "dark" : "light"}
            blockSize={7}
          />
        ) : null}
        {visibleData.isNowPlayingVisible ? (
          <SpotifyNowPlayingMonoChrome {...spotifyNowPlayingProps} />
        ) : null}
      </div>

      <HomeTabs tabOptions={tabs} onTabChange={handleTabChange} />
      <section className="mt-4">
        {tabs.selected === HomePageTabs.EXPERIENCE && <Experience />}
        {tabs.selected === HomePageTabs.PROJECTS && <Projects />}
        {tabs.selected === HomePageTabs.BLOGS && <Blogs posts={posts} />}
        {tabs.selected === HomePageTabs.LINKS && <Links links={links} />}
        {tabs.selected === HomePageTabs.ABOUTME && <AboutMe />}
      </section>
    </PageAnimationContainer>
  );
};

export default HomePage;

export async function getStaticProps() {
  const posts = getAllPosts();
  const links = getAllLinks();

  return {
    props: {
      posts,
      links,
    },
  };
}
