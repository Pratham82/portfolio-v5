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

export const getTabGroup = (tab: HomePageTabs): HomeTabGroup =>
  HOME_TAB_GROUPS[HomeTabGroup.PERSONAL].includes(tab)
    ? HomeTabGroup.PERSONAL
    : HomeTabGroup.WORK;
export type TabType = HomePageTabs;
export type TabOptions = {
  options: TabType[];
  selected: TabType;
};
