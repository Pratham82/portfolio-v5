import HomeClient from "@/components/home/HomeClient";
import { getAllPosts } from "@/lib/blogPosts";
import { getAllLinks } from "@/lib/links";
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
  const [experience, projects, home, resumeLink, games] = await Promise.all([
    getExperiencePage(),
    getProjects(),
    getHomePage(),
    getResumeLink(),
    getGamesData(),
  ]);

  return (
    <HomeClient
      posts={getAllPosts()}
      links={getAllLinks()}
      experience={experience}
      projects={projects}
      home={home}
      resumeLink={resumeLink}
      games={games}
    />
  );
};

export default HomePage;
