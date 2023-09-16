import classNames from "classnames";
import Link from "next/link";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "phosphor-react";

import { socialLinks } from "../src/data/headerData";

const iconSwitch = (id: string): JSX.Element => {
  switch (id) {
    case "TWITTER":
      return <TwitterLogo size={24} />;
    case "LINKEDIN":
      return <LinkedinLogo size={24} />;
    case "GITHUB":
      return <GithubLogo size={24} />;
    default:
      return <>;</>;
  }
};

type SocialLinksProps = {
  align: string;
};

const SocialLinks = (props: SocialLinksProps) => {
  const { align = "" } = props;
  return (
    <div
      className={classNames(
        "flex w-full items-end",
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
    </div>
  );
};

export default SocialLinks;
