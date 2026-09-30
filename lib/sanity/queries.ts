import {
  IWorkExperiencePageResponse,
  WorkExperience,
} from "@/interface/about.interface";
import { IHomePageResponse } from "@/interface/home.interface";
import { Author } from "@/interface/post.interface";
import { IProject, IProjectsPage } from "@/interface/projects.interface";
import { getResumeExperience, ResumeJob } from "@/lib/resume";
import {
  allExperience,
  allProjects,
  fetchAuthorByUserName,
  homePage,
} from "@/src/graphql/queries";
import balanceInlineTags from "@/src/utils/balanceInlineTags";

import { sanityQuery } from "./client";

export { SANITY_REVALIDATE } from "./client";

export type HomePageData = IHomePageResponse;

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

const normalizeCompany = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * The resume is the source of truth for roles, dates and bullets; Sanity
 * supplies the company logos (matched by company name).
 */
const mergeWithResume = (
  cms: WorkExperience[],
  resumeJobs: ResumeJob[],
): WorkExperience[] =>
  resumeJobs.map((job) => {
    const match = cms.find(
      (entry) =>
        normalizeCompany(entry.companyName) ===
        normalizeCompany(job.companyName),
    );
    // The resume only says "Remote"; keep the CMS's more specific
    // "Indonesia (Remote)" style location when there is one.
    const location =
      job.location === "Remote" && match?.location.includes("Remote")
        ? match.location
        : job.location;

    return {
      _key: match?._key ?? normalizeCompany(job.companyName),
      companyName: job.companyName,
      position: job.position,
      location,
      startDate: job.startDate,
      endDate: job.endDate ?? "",
      companyLogo: match?.companyLogo ?? null,
      description: match?.description ?? "",
      highlights: job.highlights,
    };
  });

/** The Experience singleton holds the work history and the resume link. */
const getWorkExperienceDoc = async () => {
  const { allWorkExperiencePage } = await sanityQuery<{
    allWorkExperiencePage: IWorkExperiencePageResponse[];
  }>(allExperience);

  return allWorkExperiencePage[0];
};

export const getExperiencePage = async (): Promise<ExperiencePageData> => {
  const page = await getWorkExperienceDoc();
  const cmsExperience = page?.workExperience ?? [];
  const resumeJobs = await getResumeExperience(page?.resume?.resumeLink ?? "");

  return {
    title: page?.title ?? "",
    workExperience: resumeJobs
      ? mergeWithResume(cmsExperience, resumeJobs)
      : cmsExperience,
  };
};

export const getProjects = async (): Promise<IProject[]> => {
  const { allProject } = await sanityQuery<IProjectsPage>(allProjects);

  return allProject?.map(({ project }) => project) ?? [];
};

export const getResumeLink = async (): Promise<string> =>
  (await getWorkExperienceDoc())?.resume?.resumeLink ?? "";

export const getAuthorByUsername = async (
  username: string,
): Promise<Author | null> => {
  const { allAuthor } = await sanityQuery<{ allAuthor: Author[] }>(
    fetchAuthorByUserName,
    { username },
  );

  return allAuthor[0] ?? null;
};
