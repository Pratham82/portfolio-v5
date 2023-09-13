import { IProject } from "../../interface/projects.interface";

const getProjectsByCategories = (projects: IProject[] | undefined) => {
  const projectsData: Record<string, any[]> = {};
  projects?.forEach((project) => {
    const projectCategory = project?.projectCategory;
    if (!projectsData[projectCategory]) {
      projectsData[projectCategory] = [];
    }
    projectsData[projectCategory] = [
      ...projectsData[projectCategory],
      { project },
    ];
  });
  return projectsData;
};

export default getProjectsByCategories;
