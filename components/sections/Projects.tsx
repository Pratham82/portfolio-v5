"use client";

import { motion } from "motion/react";
import { useState } from "react";

import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { HoverItem, HoverList } from "@/components/ui/hover-list";
import { IAllProject } from "@/interface/projects.interface";
import { cn } from "@/lib/utils";

/** Full-stack, real-time or multi-service builds. Everything else is "Playground". */
const COMPLEX_PROJECTS = new Set([
  "Chat App",
  "Real Time notes",
  "Subscriptions Manager",
  "LaunchPad",
  "Contact manager",
  "CRUD API",
  "Issue Tracker",
  "SNKR Town",
  "Code Tube",
]);

const GROUPS = ["Featured", "Playground"] as const;

const Projects = ({ projects }: { projects: IAllProject[] }) => {
  const [selected, setSelected] = useState<(typeof GROUPS)[number]>(GROUPS[0]);

  const visible = projects.filter(
    ({ projectName }) =>
      COMPLEX_PROJECTS.has(projectName) === (selected === GROUPS[0]),
  );

  return (
    <PageAnimationContainer>
      <PageTitle>Projects</PageTitle>
      <div className="flex flex-wrap gap-1 py-3">
        {GROUPS.map((val) => {
          const isSelected = val === selected;
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
              onClick={() => setSelected(val)}
            >
              {val}
            </Button>
          );
        })}
      </div>
      <motion.div
        key={selected}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <HoverList className="grid grid-cols-1 sm:grid-cols-2">
          {visible.map(({ projectName, project }) => (
            <HoverItem id={projectName} key={projectName}>
              <ProjectCard {...project} title={project.title || projectName} />
            </HoverItem>
          ))}
        </HoverList>
      </motion.div>
    </PageAnimationContainer>
  );
};

export default Projects;
