import Link from "next/link";

import {
  FileArrowDownIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MailboxIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import React from "react";
import { RiBlueskyLine, RiMediumFill } from "react-icons/ri";
import { SiSubstack } from "react-icons/si";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { SocialLinkType, socialLinks } from "../src/data/headerData";

const iconSwitch = (id: SocialLinkType): React.JSX.Element => {
  switch (id) {
    case SocialLinkType.TWITTER:
      return <XLogoIcon size={20} />;
    case SocialLinkType.LINKEDIN:
      return <LinkedinLogoIcon size={20} />;
    case SocialLinkType.GITHUB:
      return <GithubLogoIcon size={20} />;
    case SocialLinkType.MAIL:
      return <MailboxIcon size={20} />;
    case SocialLinkType.INSTA:
      return <InstagramLogoIcon size={20} />;
    case SocialLinkType.BLUESKY: {
      return <RiBlueskyLine size={20} />;
    }
    case SocialLinkType.MEDIUM: {
      return <RiMediumFill size={20} />;
    }
    case SocialLinkType.SUBSTACK: {
      return <SiSubstack size={16} />;
    }
    case SocialLinkType.RESUME:
      return (
        <span className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-sm">
          <FileArrowDownIcon size={16} />
          Resume
        </span>
      );
    default:
      return <>;</>;
  }
};

type SocialLinksProps = {
  align: "left" | "center" | "right";
  resumeLink: string;
};

const SocialLinks = (props: SocialLinksProps) => {
  const { align = "", resumeLink } = props;

  return (
    <div
      className={cn(
        "my-2 flex w-full flex-wrap items-center gap-1",
        align === "left" ? "justify-start" : "justify-center",
      )}
    >
      {socialLinks?.map(({ id, link, label, handle }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Link
              href={id === SocialLinkType.RESUME ? resumeLink : link}
              rel="noopener noreferrer"
              target="_blank"
              aria-label={handle ? `${label}: ${handle}` : label}
              className={cn(
                "rounded-md text-foreground/75 transition-colors hover:text-foreground",
                id === SocialLinkType.RESUME ? "ml-2" : "p-1.5",
              )}
            >
              {iconSwitch(id)}
            </Link>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col items-center gap-0.5">
            <span className="font-medium">{label}</span>
            {handle && <span className="font-mono opacity-70">{handle}</span>}
          </TooltipContent>
        </Tooltip>
      ))}
      {/* <Link
        className="text-md flex items-center hover:text-gray-500"
        href={resume?.resumeLink}
      >
        <DownloadSimpleIcon className="mr-2" size={24} /> {resume?.resumeText}
      </Link> */}
    </div>
  );
};

export default SocialLinks;
