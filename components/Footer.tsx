import Link from "next/link";

import { HeartIcon } from "@phosphor-icons/react";

// import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="bottom-0 z-0 w-full pt-2 backdrop-blur-lg">
      {/* <SocialLinks align="center" /> */}
      <div className="relative w-full mb-8">
        <div className="absolute inset-0 w-full h-[1px] bg-white/30" />
      </div>
      <div className="flex h-12 w-full items-center justify-center ">
        Created with
        <span className="px-1">
          <HeartIcon size={24} color="red" weight="fill" />
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
