"use client";

import { motion } from "motion/react";
import { useState } from "react";

import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { HoverItem, HoverList } from "@/components/ui/hover-list";
import { IProject } from "@/interface/projects.interface";
import { cn } from "@/lib/utils";
import getProjectsByCategories from "@/src/utils/getProjectsByCategories";

const Projects = ({ projects }: { projects: IProject[] }) => {
  const filteredProjects = getProjectsByCategories(projects);
  const filteredProjectCategories = Object.keys(filteredProjects);

  const updateCategoriesOrder = [
    "React",
    ...filteredProjectCategories.filter((skill) => skill !== "React"),
  ];
  const [selectedProject, setSelectedProject] = useState(
    updateCategoriesOrder?.[0] || "NeoG Camp",
  );

  return (
    <PageAnimationContainer>
      <PageTitle>Projects</PageTitle>
      <div className="flex flex-wrap gap-1 py-3">
        {updateCategoriesOrder.map((val) => {
          const isSelected = val === selectedProject;
          return (
            <Button
              key={val}
              size="xs"
              variant={isSelected ? "secondary" : "ghost"}
              aria-pressed={isSelected}
              className={cn(
                "px-2.5 font-normal",
                isSelected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setSelectedProject(val)}
            >
              {val}
            </Button>
          );
        })}
      </div>
      <motion.div
        key={selectedProject}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <HoverList className="grid grid-cols-1 sm:grid-cols-2">
          {filteredProjects?.[selectedProject]?.map(({ project }) => (
            <HoverItem id={project.title} key={project.title}>
              <ProjectCard {...project} />
            </HoverItem>
          ))}
        </HoverList>
      </motion.div>
    </PageAnimationContainer>
  );
};

export default Projects;
