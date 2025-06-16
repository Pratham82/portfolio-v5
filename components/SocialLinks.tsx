import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MailboxIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import classNames from "classnames";
import Link from "next/link";

import { socialLinks } from "../src/data/headerData";

const iconSwitch = (id: string): JSX.Element => {
  switch (id) {
    case "TWITTER":
      return <XLogoIcon size={24} />;
    case "LINKEDIN":
      return <LinkedinLogoIcon size={24} />;
    case "GITHUB":
      return <GithubLogoIcon size={24} />;
    case "MAIL":
      return <MailboxIcon size={24} />;
    case "INSTA":
      return <InstagramLogoIcon size={24} />;
    default:
      return <>;</>;
  }
};

type SocialLinksProps = {
  align: "left" | "center" | "right";
};

const SocialLinks = (props: SocialLinksProps) => {
  const { align = "" } = props;
  return (
    <div
      className={classNames(
        "flex w-full items-end my-2",
        align === "left" ? "justify-start" : "justify-center",
      )}
    >
      {socialLinks?.map(({ id, link }) => (
        <div className="mx-2" key={id}>
          <Link href={link} rel="noopener noreferrer" target="_blank">
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
