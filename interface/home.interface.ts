/** The Home Page singleton (`allHomePage[0]`). */
export interface IHomePageResponse {
  title: string;
  subtitle: string;
}

export enum HomePageTabs {
  EXPERIENCE = "Experience",
  PROJECTS = "Projects",
  BLOGS = "Blogs",
  LINKS = "Links",
  ABOUTME = "About",
  USES = "Uses",
  GAMES = "Games",
  NOW = "Now",
  SKILLS = "Skills",
}

export enum HomeTabGroup {
  WORK = "Work",
  PERSONAL = "Personal",
}

export const HOME_TAB_GROUPS: Record<HomeTabGroup, HomePageTabs[]> = {
  [HomeTabGroup.WORK]: [
    HomePageTabs.EXPERIENCE,
    HomePageTabs.PROJECTS,
    HomePageTabs.SKILLS,
    HomePageTabs.BLOGS,
  ],
  [HomeTabGroup.PERSONAL]: [
    HomePageTabs.NOW,
    HomePageTabs.GAMES,
    HomePageTabs.USES,
    HomePageTabs.LINKS,
    HomePageTabs.ABOUTME,
  ],
};

/** Each tab's URL. `/` and `/home` also open Experience. */
export const HOME_TAB_HREF: Record<HomePageTabs, string> = {
  [HomePageTabs.EXPERIENCE]: "/experience",
  [HomePageTabs.PROJECTS]: "/projects",
  [HomePageTabs.SKILLS]: "/skills",
  [HomePageTabs.BLOGS]: "/blogs",
  [HomePageTabs.NOW]: "/now",
  [HomePageTabs.GAMES]: "/games",
  [HomePageTabs.USES]: "/uses",
  [HomePageTabs.LINKS]: "/links",
  [HomePageTabs.ABOUTME]: "/about",
};

/** The tab a pathname opens, or `null` for a non-tab route. */
export const getTabFromPath = (pathname: string): HomePageTabs | null => {
  if (pathname === "/" || pathname === "/home") return HomePageTabs.EXPERIENCE;
  const entry = Object.entries(HOME_TAB_HREF).find(
    ([, href]) => href === pathname,
  );
  return entry ? (entry[0] as HomePageTabs) : null;
};

export const getTabGroup = (tab: HomePageTabs): HomeTabGroup =>
  HOME_TAB_GROUPS[HomeTabGroup.PERSONAL].includes(tab)
    ? HomeTabGroup.PERSONAL
    : HomeTabGroup.WORK;
export type TabType = HomePageTabs;
export type TabOptions = {
  options: TabType[];
  selected: TabType;
};
