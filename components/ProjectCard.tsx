import Link from "next/link";
import { GithubLogo, LinkSimple } from "phosphor-react";

import { IProject } from "../interface/projects.interface";

const ProjectCard = (props: IProject) => {
  const { title, subTitle, techStackUsed, githubURL, liveURL } = props;
  return (
    <div className="border dark:border-slate-100 border-slate-300 p-3 rounded-xl shadow-lg dark:shadow-lg dark:shadow-slate-500">
      <h3 className="text-lg font-semibold">{title}</h3>
      <h4 className="font-thin">{subTitle}</h4>
      <div className="flex my-2">
        {liveURL?.link && (
          <Link
            href={liveURL?.link}
            rel="noopener noreferrer"
            target="_blank"
            className="flex border p-1 mr-2 cursor-pointer rounded-xl px-2 text-sm border-slate-300"
          >
            <LinkSimple size={20} />
            <span className="pl-1">Live</span>
          </Link>
        )}
        {githubURL?.link && (
          <Link
            href={githubURL?.link}
            rel="noopener noreferrer"
            target="_blank"
            className="flex border p-1 mr-2 cursor-pointer rounded-xl px-2 text-sm"
          >
            <GithubLogo size={20} />
            <span className="pl-1">Github</span>
          </Link>
        )}
      </div>
      <div className="flex gap-1 flex-wrap mt-2">
        {techStackUsed?.map((techStack) => (
          <h5
            className="text-sm dark:bg-slate-100 bg-slate-900 text-slate-100  dark:text-slate-900 font-normal py-1 px-1.5 rounded-md"
            key={techStack}
          >
            {techStack}
          </h5>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
