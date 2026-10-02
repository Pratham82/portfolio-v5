import { ReactNode } from "react";

import HomeShell from "@/components/home/HomeShell";
import { getHomePage, getResumeLink } from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

/**
 * Every home tab is its own route (`/now`, `/skills`, ...). This layout holds
 * the hero and tab bar, so it stays mounted while switching tabs.
 */
const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const [home, resumeLink] = await Promise.all([
    getHomePage(),
    getResumeLink(),
  ]);

  return (
    <HomeShell home={home} resumeLink={resumeLink}>
      {children}
    </HomeShell>
  );
};

export default HomeLayout;
