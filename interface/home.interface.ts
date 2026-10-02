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
}
export type TabType = HomePageTabs;
export type TabOptions = {
  options: TabType[];
  selected: TabType;
};
