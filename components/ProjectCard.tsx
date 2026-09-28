import Link from "next/link";

import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react";

import { Badge } from "@/components/ui/badge";

import { IProject } from "../interface/projects.interface";

const ProjectCard = (props: IProject) => {
  const { title, subTitle, githubURL, liveURL } = props;
  return (
    <div className="flex h-full flex-col p-3">
      <h3 className="font-medium text-foreground">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{subTitle}</p>
      <div className="mt-3 flex gap-2">
        {liveURL?.link && (
          <Badge
            variant="outline"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link
              href={liveURL?.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ArrowUpRightIcon />
              Live
            </Link>
          </Badge>
        )}
        {githubURL?.link && (
          <Badge
            variant="outline"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link
              href={githubURL?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon />
              Github
            </Link>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
