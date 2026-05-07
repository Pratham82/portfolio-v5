import { useRouter } from "next/router";

import { ReactNode } from "react";

// import Footer from "./Footer";
// import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const ROUTE_PATTERNS: [RegExp, string][] = [[/^\/guides/, "max-w-5xl"]];

const getContainerClass = (pathname: string): string => {
  for (const [pattern, className] of ROUTE_PATTERNS) {
    if (pattern.test(pathname)) return className;
  }
  return "max-w-xs sm:max-w-lg lg:max-w-lg";
};

const Container: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();

  return (
    <>
      {/* <Header /> */}
      <div className="flex min-h-[85vh] justify-center pb-8 pt-8 px-4">
        <div className={getContainerClass(pathname)}>{children}</div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Container;
