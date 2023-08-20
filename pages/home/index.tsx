import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";

import { homePage } from "../../src/graphql/queries";
import useGetPageData from "../../src/hooks/useGetPageData";
import { IHomePageResponse } from "../../@types/home.interface";
import HomepageSkeleton from "../../components/loadingPages/home.skeleton";

const HomePage = () => {
  const { data, loading } = useQuery(homePage);
  const { title = "", subtitle = "", pageData } = useGetPageData(data);

  const { avatar, contributions, pageRedirects, techStack }: IHomePageResponse =
    pageData || {};

  if (loading) {
    return <HomepageSkeleton />;
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
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
      <h1 className="mt-2 text-lg">{subtitle}</h1>

      <h2 className="mb-2 mt-4 text-xl">{techStack?.techStackTitle}</h2>
      <div className="flex flex-wrap">
        {techStack?.techStacks?.map((tech) => (
          <span className="text-md pr-1">{tech},</span>
        ))}
      </div>

      <h2 className="mb-2 mt-4 text-xl">{contributions?.contributionsTitle}</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={contributions?.contributionsLink}
        alt="github-contributions-chart"
        className="h-[90px] grayscale"
      />
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
    </motion.div>
  );
};

export default HomePage;
