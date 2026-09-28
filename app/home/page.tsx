import HomeClient from "@/components/home/HomeClient";
import { getAllPosts } from "@/lib/blogPosts";
import { getAllLinks } from "@/lib/links";
import {
  getExperiencePage,
  getHomePage,
  getProjects,
  getResumeLink,
} from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

const HomePage = async () => {
  const [experience, projects, home, resumeLink] = await Promise.all([
    getExperiencePage(),
    getProjects(),
    getHomePage(),
    getResumeLink(),
  ]);

  return (
    <HomeClient
      posts={getAllPosts()}
      links={getAllLinks()}
      experience={experience}
      projects={projects}
      home={home}
      resumeLink={resumeLink}
    />
  );
};

export default HomePage;
