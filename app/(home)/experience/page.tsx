import type { Metadata } from "next";

import Experience from "@/components/sections/Experience";
import { getExperiencePage } from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

export const metadata: Metadata = { title: "Experience" };

const ExperiencePage = async () => (
  <Experience {...await getExperiencePage()} />
);

export default ExperiencePage;
