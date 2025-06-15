import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";

import PageAnimationContainer from "../components/PageAnimationContainer";
// import SpotifyNowPlayingCard from "../components/SpotifyNowPlayingCard";
import SpotifyNowPlayingMonoChrome from "../components/SpotifyNowPlayingMonoChrome";
import HomepageSkeleton from "../components/loadingPages/home.skeleton";
import { IHomePageResponse } from "../interface/home.interface";
import { socialLinks } from "../src/data/headerData";
import { homePage } from "../src/graphql/queries";
import useGetPageData from "../src/hooks/useGetPageData";
import useNowPlaying from "../src/hooks/useNowPlaying";

const HomePage = () => {
  const { data, loading } = useQuery(homePage);
  const { title = "", subtitle = "", pageData } = useGetPageData(data);

  const spotifyNowPlayingData = useNowPlaying();

  const spotifyNowPlayingProps = {
    album: spotifyNowPlayingData.data?.album || "",
    albumImageUrl: spotifyNowPlayingData.data?.albumImageUrl || "",
    artist: spotifyNowPlayingData.data?.artist || "",
    title: spotifyNowPlayingData.data?.title || "",
    isPlaying: spotifyNowPlayingData.data?.isPlaying ?? false,
    songUrl: spotifyNowPlayingData.data?.songUrl || "",
  };

  const { avatar, contributions, pageRedirects, techStack }: IHomePageResponse =
    pageData || {};

  if (loading) {
    return <HomepageSkeleton />;
  }

  return (
    <PageAnimationContainer className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Image
          src={avatar?.asset?.url || ""}
          alt="profile"
          width={110}
          height={110}
          className="relative rounded-2xl grayscale"
        />
      </motion.div>
      <h1 className="mb-2 mt-6 text-2xl">{title}</h1>
      <h1 className="mt-2 text-lg text-center">{subtitle}</h1>

      <h2 className="mb-2 mt-4 text-xl">{techStack?.techStackTitle}</h2>
      <div className="flex flex-wrap justify-center">
        {techStack?.techStacks?.map((tech) => (
          <span className="text-md pr-1" key={tech}>
            {tech},
          </span>
        ))}
      </div>

      <h2 className="mb-2 mt-4 text-xl">{contributions?.contributionsTitle}</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Link href={socialLinks[0].link} target="_blank">
        <img
          src={contributions?.contributionsLink || ""}
          alt="github-contributions-chart"
          // width={200}
          height={90}
          className="grayscale"
        />
      </Link>
      <div className="flex pt-8">
        {pageRedirects?.map((page) => (
          <Link
            key={page.linkTitle}
            href={page?.link}
            className="flex items-center pr-4"
          >
            {page?.linkTitle} <ArrowUpRight className="pl-2" size={26} />
          </Link>
        ))}
      </div>
      {/* <SpotifyNowPlayingCard {...spotifyNowPlayingProps} /> */}
      <SpotifyNowPlayingMonoChrome {...spotifyNowPlayingProps} />
    </PageAnimationContainer>
  );
};

export default HomePage;
