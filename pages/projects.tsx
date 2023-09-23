import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";

import PageAnimationContainer from "../components/PageAnimationContainer";
import ProjectCard from "../components/ProjectCard";
import ProjectsSkeleton from "../components/loadingPages/projects.skeleton";
import { IProjectsPage } from "../interface/projects.interface";
import { allProjects } from "../src/graphql/queries";
import getProjectsByCategories from "../src/utils/getProjectsByCategories";

const Projects = () => {
  const { data, loading } = useQuery(allProjects);

  const { allProject }: IProjectsPage = data || {};

  const allProjectsData = allProject?.map(({ project }) => project);

  const filteredProjects = getProjectsByCategories(allProjectsData);
  const filteredProjectCategories = Object.keys(filteredProjects);
  const [selectedProject, setSelectedProject] = useState(
    filteredProjectCategories?.[0] || "NeoG Camp",
  );

  if (loading) {
    return <ProjectsSkeleton />;
  }

  return (
    <PageAnimationContainer>
      <h1 className="text-3xl">Projects</h1>
      <div className="py-3">
        {filteredProjectCategories.map((val) => (
          <button
            className={classNames(
              "text-sm mx-1 rounded-md py-[4px] px-2",
              val === selectedProject &&
                "bg-slate-900 text-slate-100 dark:text-slate-900 font-medium dark:bg-slate-100",
            )}
            type="button"
            key={val}
            onClick={() => setSelectedProject(val)}
          >
            {val}
          </button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid-cols-1 sm:grid-cols-2 grid gap-3"
      >
        {filteredProjects?.[selectedProject]?.map(({ project }) => {
          return <ProjectCard {...project} key={project.title} />;
        })}
      </motion.div>
    </PageAnimationContainer>
  );
};

export default Projects;
