import Link from "next/link";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TwitterLogo, GithubLogo, LinkedinLogo, Heart } from "phosphor-react";
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

const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-0 w-full border-t border-gray-800 backdrop-blur-lg">
      <div className="mt-2 flex h-10 w-full items-end justify-center ">
        {socialLinks?.map(({ id, link }) => (
          <div className="mx-2" key={id}>
            <Link href={link} rel="noopener noreferrer" target="_blank">
              {iconSwitch(id)}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex h-14 w-full items-center justify-center ">
        Created with <Heart size={24} color="red" weight="fill" /> by Prathamesh
      </div>
    </footer>
  );
};

export default Footer;
