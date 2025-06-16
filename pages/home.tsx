import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import HomeTabs from "../components/HomePageTabs";
import PageAnimationContainer from "../components/PageAnimationContainer";
import SocialLinks from "../components/SocialLinks";
import SpotifyNowPlayingMonoChrome from "../components/SpotifyNowPlayingMonoChrome";
import ThemToggler from "../components/ThemeSwitcher";
import HomepageSkeleton from "../components/loadingPages/home.skeleton";
import { HomePageTabs, TabOptions, TabType } from "../interface/home.interface";
import { homePage } from "../src/graphql/queries";
import useGetPageData from "../src/hooks/useGetPageData";
import useNowPlaying from "../src/hooks/useNowPlaying";
import About from "./about";
import { PostMeta, getAllPosts } from "./api/blogPosts";
import Blogs from "./blogs";
import Projects from "./projects";

type HomeProps = {
  posts: {
    content: string;
    meta: PostMeta;
  }[];
};
const HomePage = (props: HomeProps) => {
  const { posts } = props;
  const { data, loading } = useQuery(homePage);
  const { title = "", subtitle = "" } = useGetPageData(data);

  const spotifyNowPlayingData = useNowPlaying();

  const spotifyNowPlayingProps = {
    album: spotifyNowPlayingData.data?.album || "",
    albumImageUrl: spotifyNowPlayingData.data?.albumImageUrl || "",
    artist: spotifyNowPlayingData.data?.artist || "",
    title: spotifyNowPlayingData.data?.title || "",
    isPlaying: spotifyNowPlayingData.data?.isPlaying ?? false,
    songUrl: spotifyNowPlayingData.data?.songUrl || "",
  };

  // const { pageRedirects }: IHomePageResponse = pageData || {};

  const [tabs, setTabs] = useState<TabOptions>({
    options: [
      HomePageTabs.EXPERIENCE,
      HomePageTabs.PROJECTS,
      HomePageTabs.BLOGS,
    ],
    selected: HomePageTabs.EXPERIENCE,
  });

  const handleTabChange = (tab: TabType) => {
    setTabs((prev) => ({
      ...prev,
      selected: tab,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "p":
        case "P":
        case "2": {
          // setTabs((prev) => ({
          //   ...prev,
          //   selected: HomePageTabs.PROJECTS,
          // }));
          handleTabChange(HomePageTabs.PROJECTS);
          break;
        }
        case "b":
        case "B":
        case "3": {
          handleTabChange(HomePageTabs.BLOGS);
          break;
        }
        case "e":
        case "E":
        case "1": {
          handleTabChange(HomePageTabs.EXPERIENCE);
          break;
        }
        default: {
          // Do nothing for other keys
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (loading) {
    return <HomepageSkeleton />;
  }

  return (
    <PageAnimationContainer className="flex flex-col">
      <h1 className="mb-2 mt-6 text-xl font-bold flex justify-between items-center">
        {title} <ThemToggler />
      </h1>
      <h1
        className="mt-2 text-md dark:text-slate-300 text-black
      "
      >
        {subtitle}
      </h1>

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
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

      <SpotifyNowPlayingMonoChrome {...spotifyNowPlayingProps} />

      {/* {
        <TabOptions
          options={selectedTab.options}
          selected={selectedTab.selected}
          onTabChange={handleTabChange}
        />
      } */}
      <HomeTabs tabOptions={tabs} onTabChange={handleTabChange} />
      <section className="mt-4">
        {tabs.selected === HomePageTabs.EXPERIENCE && <About />}
        {tabs.selected === HomePageTabs.PROJECTS && <Projects />}
        {tabs.selected === HomePageTabs.BLOGS && <Blogs posts={posts} />}
      </section>
    </PageAnimationContainer>
  );
};

export default HomePage;

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
