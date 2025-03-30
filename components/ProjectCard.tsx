import { motion } from "framer-motion";
import Link from "next/link";
import { GithubLogo, LinkSimple } from "phosphor-react";

import { IProject } from "../interface/projects.interface";

const ProjectCard = (props: IProject) => {
  const { title, subTitle, githubURL, liveURL } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border border-slate-300 p-3 rounded-xl"
    >
      <h3 className="text-md font-semibold">{title}</h3>
      <h4 className="text-sm font-thin">{subTitle}</h4>
      <div className="flex my-2">
        {liveURL?.link && (
          <Link
            href={liveURL?.link}
            rel="noopener noreferrer"
            target="_blank"
            className="flex border p-1 mr-2 cursor-pointer rounded-xl px-2 text-xs border-slate-300 items-center"
          >
            <LinkSimple size={16} />
            <span className="pl-1">Live</span>
          </Link>
        )}
        {githubURL?.link && (
          <Link
            href={githubURL?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex border p-1 mr-2 cursor-pointer rounded-xl px-2 text-xs items-center"
          >
            <GithubLogo size={16} />
            <span className="pl-1">Github</span>
          </Link>
        )}
      </div>
      {/* <div className="flex gap-1 flex-wrap mt-2"> */}
      {/*   {techStackUsed?.map((techStack) => ( */}
      {/*     <h5 */}
      {/*       className="text-sm dark:bg-slate-100 bg-slate-900 text-slate-100  dark:text-slate-900 font-normal py-1 px-1.5 rounded-md" */}
      {/*       key={techStack} */}
      {/*     > */}
      {/*       {techStack} */}
      {/*     </h5> */}
      {/*   ))} */}
      {/* </div> */}
    </motion.div>
  );
};

export default ProjectCard;
