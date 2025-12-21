import Link from "next/link";

import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MailboxIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import classNames from "classnames";
import { FileArrowDown } from "phosphor-react";
import React from "react";
import { RiBlueskyLine } from "react-icons/ri";

import { SocialLinkType, socialLinks } from "../src/data/headerData";
import useGetInfo from "../src/hooks/useGetInfo";

const iconSwitch = (id: SocialLinkType): JSX.Element => {
  switch (id) {
    case SocialLinkType.TWITTER:
      return <XLogoIcon size={24} />;
    case SocialLinkType.LINKEDIN:
      return <LinkedinLogoIcon size={24} />;
    case SocialLinkType.GITHUB:
      return <GithubLogoIcon size={24} />;
    case SocialLinkType.MAIL:
      return <MailboxIcon size={24} />;
    case SocialLinkType.INSTA:
      return <InstagramLogoIcon size={24} />;
    case SocialLinkType.BLUESKY: {
      return <RiBlueskyLine size={24} />;
    }
    case SocialLinkType.RESUME:
      return (
        <div className="flex gap-2 items-center">
          <FileArrowDown size={20} /> <span className="text-md">Resume</span>
        </div>
      );
    default:
      return <>;</>;
  }
};

type SocialLinksProps = {
  align: "left" | "center" | "right";
};

const SocialLinks = (props: SocialLinksProps) => {
  const { align = "" } = props;
  const { resume } = useGetInfo();
  const resumeLink = resume?.resumeLink || "";

  return (
    <div
      className={classNames(
        "flex w-full items-end my-2",
        align === "left" ? "justify-start" : "justify-center",
      )}
    >
      {socialLinks?.map(({ id, link }) => (
        <div className="mx-2" key={id}>
          <Link
            href={id === SocialLinkType.RESUME ? resumeLink : link}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={`Visit my ${id} profile`}
          >
            {iconSwitch(id)}
          </Link>
        </div>
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
