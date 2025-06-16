export interface IHomePageResponse {
  __typename: string;
  pageName: string;
  title: string;
  subtitle: string;
  avatar: Avatar;
  techStack: TechStack;
  contributions: Contributions;
  pageRedirects?: PageRedirects[] | null;
}
export interface Avatar {
  __typename: string;
  asset: Asset;
}
export interface Asset {
  __typename: string;
  altText?: null;
  url: string;
}
export interface TechStack {
  __typename: string;
  techStackTitle: string;
  techStacks?: string[] | null;
}
export interface Contributions {
  __typename: string;
  contributionsTitle: string;
  contributionsLink: string;
}
export interface PageRedirects {
  __typename: string;
  link: string;
  linkTitle: string;
}

export enum HomePageTabs {
  EXPERIENCE = "Experience",
  PROJECTS = "Projects",
  BLOGS = "Blogs",
}
export interface IHomePage {
  rootObject?: IHomePage[] | null;
}

export type TabType = HomePageTabs;
export type TabOptions = {
  options: TabType[];
  selected: TabType;
};
