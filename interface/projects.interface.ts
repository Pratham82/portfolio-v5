export interface IAllProject {
  __typename: string;
  projectName: string;
  project: IProject;
}
export interface IProject {
  __typename: string;
  title: string;
  mark: string;
  subTitle: string;
  techStackUsed?: string[] | null;
  projectCategory: string;
  githubURL: IUrl;
  liveURL: IUrl;
}
export interface IUrl {
  __typename: string;
  linkText: string;
  link: string;
}
export interface IProjectsPage {
  allProject?: IAllProject[] | null;
}
