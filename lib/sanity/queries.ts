import {
  IAllAboutPageResponse,
  WorkExperience,
} from "@/interface/about.interface";
import { IHomePageResponse } from "@/interface/home.interface";
import { Author } from "@/interface/post.interface";
import { IProject, IProjectsPage } from "@/interface/projects.interface";
import {
  aboutPage,
  allExperience,
  allProjects,
  fetchAuthorByUserName,
  homePage,
} from "@/src/graphql/queries";
import balanceInlineTags from "@/src/utils/balanceInlineTags";

import { sanityQuery } from "./client";

/** How often (seconds) ISR re-fetches Sanity content. */
export const SANITY_REVALIDATE = 3600;

export type HomePageData = Pick<IHomePageResponse, "title" | "subtitle">;

export type ExperiencePageData = {
  title: string;
  workExperience: WorkExperience[];
};

export const getHomePage = async (): Promise<HomePageData> => {
  const { allHomePage } = await sanityQuery<{
    allHomePage: IHomePageResponse[];
  }>(homePage);
  const [page] = allHomePage;

  return {
    title: page?.title ?? "",
    // Rendered as raw HTML; an unclosed tag would break hydration.
    subtitle: balanceInlineTags(page?.subtitle ?? ""),
  };
};

export const getExperiencePage = async (): Promise<ExperiencePageData> => {
  const { allWorkExperiencePage } = await sanityQuery<{
    allWorkExperiencePage: IAllAboutPageResponse[];
  }>(allExperience);
  const [page] = allWorkExperiencePage;

  return {
    title: page?.title ?? "",
    workExperience: page?.workExperience ?? [],
  };
};

export const getProjects = async (): Promise<IProject[]> => {
  const { allProject } = await sanityQuery<IProjectsPage>(allProjects);

  return allProject?.map(({ project }) => project) ?? [];
};

export const getResumeLink = async (): Promise<string> => {
  const { allAboutPage } = await sanityQuery<{
    allAboutPage: IAllAboutPageResponse[];
  }>(aboutPage);

  return allAboutPage[0]?.resume?.resumeLink ?? "";
};

export const getAuthorByUsername = async (
  username: string,
): Promise<Author | null> => {
  const { allAuthor } = await sanityQuery<{ allAuthor: Author[] }>(
    fetchAuthorByUserName,
    { username },
  );

  return allAuthor[0] ?? null;
};
