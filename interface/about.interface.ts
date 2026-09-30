/** The Experience singleton (`allWorkExperiencePage[0]`). */
export interface IWorkExperiencePageResponse {
  title: string;
  workExperience?: WorkExperience[] | null;
  resume?: Resume | null;
}
export interface WorkExperience {
  _key: string;
  position: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  companyLogo?: CompanyLogo | null;
  description: string;
  /** Bullet points parsed from the resume (see lib/resume.ts). */
  highlights?: WorkHighlight[];
}

export interface WorkHighlight {
  /** Optional bold lead-in, e.g. "Design System". */
  label?: string;
  text: string;
}

export interface CompanyLogo {
  asset: Asset;
  __typename: string;
}

export interface Asset {
  _id: string;
  label: any;
  url: string;
  __typename: string;
}
export interface Resume {
  resumeLink?: string | null;
}
