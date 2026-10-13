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

const GROUPS = [
  { label: "Featured", type: "application" },
  { label: "Mini Projects", type: "experiment" },
] as const;

const PINNED_FIRST = "Links Vault";

const Projects = ({ projects }: { projects: IAllProject[] }) => {
  const [selected, setSelected] = useState<(typeof GROUPS)[number]>(GROUPS[0]);

  const visible = projects
    .filter(({ project }) => project.projectType === selected.type)
    .sort(
      (a, b) =>
        Number(b.projectName === PINNED_FIRST) -
        Number(a.projectName === PINNED_FIRST),
    );

  return (
    <PageAnimationContainer>
      <PageTitle>Projects</PageTitle>
      <div className="flex flex-wrap gap-1 py-3">
        {GROUPS.map((group) => {
          const isSelected = group === selected;
          return (
            <Button
              key={group.type}
              size="xs"
              variant={isSelected ? "secondary" : "ghost"}
              aria-pressed={isSelected}
              className={cn(
                "px-2.5 font-normal",
                isSelected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setSelected(group)}
            >
              {group.label}
            </Button>
          );
        })}
      </div>
      <motion.div
        key={selected.type}
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
