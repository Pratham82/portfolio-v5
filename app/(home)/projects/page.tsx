import type { Metadata } from "next";

import Projects from "@/components/sections/Projects";
import { getProjects } from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

export const metadata: Metadata = { title: "Projects" };

const ProjectsPage = async () => <Projects projects={await getProjects()} />;

export default ProjectsPage;
