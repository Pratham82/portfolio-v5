export interface IAllAboutPageResponse {
  pageName: string;
  title: string;
  subtitle: string;
  workExperience?: WorkExperience[] | null;
  education?: Education[] | null;
  resume: Resume;
}
export interface WorkExperience {
  _key: string;
  position: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
}
export interface Education {
  _key: string;
  degree: string;
  institution: Institution;
}
export interface Institution {
  institution: string;
  startYear: string;
  endYear: string;
}
export interface Resume {
  _key?: null;
  resumeText: string;
  resumeLink: string;
}
