import Projects from "@/components/sections/Projects";
import { IProject } from "@/interface/projects.interface";
import { SANITY_REVALIDATE, getProjects } from "@/lib/sanity/queries";

const ProjectsPage = (props: { projects: IProject[] }) => (
  <Projects {...props} />
);

export default ProjectsPage;

export async function getStaticProps() {
  return {
    props: { projects: await getProjects() },
    revalidate: SANITY_REVALIDATE,
  };
}
