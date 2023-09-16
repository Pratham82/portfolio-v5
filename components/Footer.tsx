import Link from "next/link";
import { Heart } from "phosphor-react";

import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="bottom-0 z-0 w-full border-t border-gray-800 pt-4 backdrop-blur-lg">
      <SocialLinks align="center" />
      <div className="flex h-14 w-full items-center justify-center ">
        Created with
        <span className="px-1">
          <Heart size={24} color="red" weight="fill" />
        </span>
        by
        <Link
          href="www.github.com/pratham82"
          rel="noopener noreferrer"
          target="_blank"
          className="pl-2 underline"
        >
          Prathamesh
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
