"use client";

import { usePathname } from "next/navigation";

import { ReactNode } from "react";

import SiteHeader from "./SiteHeader";

interface LayoutProps {
  children: ReactNode;
}

const ROUTE_PATTERNS: [RegExp, string][] = [[/^\/guides/, "max-w-5xl"]];

const getContainerClass = (pathname: string): string => {
  for (const [pattern, className] of ROUTE_PATTERNS) {
    if (pattern.test(pathname)) return className;
  }
  return "max-w-2xl";
};

const Container: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const pathname = usePathname() ?? "";
  // The AI guide ships its own full-bleed nav and dark theme.
  const showHeader = !pathname.startsWith("/guides");

  return (
    <>
      {showHeader && <SiteHeader />}
      <div className="flex min-h-[85vh] justify-center px-4 pb-16 pt-8">
        <div
          className={`${showHeader ? "w-full" : ""} ${getContainerClass(pathname)}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Container;
