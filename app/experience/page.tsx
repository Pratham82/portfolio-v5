import Experience from "@/components/sections/Experience";
import { getExperiencePage } from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

const ExperiencePage = async () => (
  <Experience {...await getExperiencePage()} />
);

export default ExperiencePage;
