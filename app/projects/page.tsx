import Projects from "@/components/sections/Projects";
import { getProjects } from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

const ProjectsPage = async () => <Projects projects={await getProjects()} />;

export default ProjectsPage;
