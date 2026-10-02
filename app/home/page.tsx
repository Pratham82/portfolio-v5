import HomeClient from "@/components/home/HomeClient";
import { getAllPosts } from "@/lib/blogPosts";
import { getAllLinks } from "@/lib/links";
import { getNowContent, getNowData } from "@/lib/now";
import { getGamesData } from "@/lib/psn";
import {
  getExperiencePage,
  getHomePage,
  getProjects,
  getResumeLink,
} from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

const HomePage = async () => {
  const [
    experience,
    projects,
    home,
    resumeLink,
    games,
    nowContent,
    nowData,
    links,
  ] = await Promise.all([
    getExperiencePage(),
    getProjects(),
    getHomePage(),
    getResumeLink(),
    getGamesData(),
    getNowContent(),
    getNowData(),
    getAllLinks(),
  ]);

  return (
    <HomeClient
      posts={getAllPosts()}
      links={links}
      experience={experience}
      projects={projects}
      home={home}
      resumeLink={resumeLink}
      games={games}
      now={{ ...nowContent, data: nowData }}
    />
  );
};

export default HomePage;
