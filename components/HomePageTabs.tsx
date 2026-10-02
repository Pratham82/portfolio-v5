import Link from "next/link";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import {
  HOME_TAB_HREF,
  HomeTabGroup,
  TabOptions,
} from "../interface/home.interface";

type HomePageTabsProps = {
  tabOptions: TabOptions;
  group: HomeTabGroup;
  onGroupChange?: (_group: HomeTabGroup) => void;
  className?: string;
};
const HomeTabs = (props: HomePageTabsProps) => {
  const { tabOptions, group, onGroupChange = () => {}, className = "" } = props;

  return (
    <div className={cn("flex-col gap-3", className)}>
      <div
        className="flex w-fit gap-0.5 rounded-full border border-border bg-secondary p-0.5"
        data-testid="home-tab-groups"
      >
        {Object.values(HomeTabGroup).map((option) => {
          const isSelected = group === option;
          return (
            <button
              type="button"
              key={option}
              aria-pressed={isSelected}
              className={cn(
                "relative rounded-full px-3 py-1 font-mono text-xs transition-colors",
                isSelected
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground",
              )}
              onClick={() => onGroupChange(option)}
            >
              {isSelected && (
                <motion.span
                  layoutId="home-tab-group-pill"
                  className="absolute inset-0 rounded-full bg-background shadow-sm"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative">{option}</span>
            </button>
          );
        })}
      </div>
      <div
        className="flex gap-1 border-b border-border"
        data-testid="home-tabs"
      >
        {tabOptions.options.map((tab) => {
          const isSelected = tabOptions.selected === tab;
          return (
            <Link
              key={tab}
              href={HOME_TAB_HREF[tab]}
              // Keep the page where it is; only the tab content changes.
              scroll={false}
              aria-current={isSelected ? "page" : undefined}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors",
                isSelected
                  ? "font-medium text-foreground"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {tab}
              {isSelected && (
                <motion.span
                  layoutId="home-tab-underline"
                  className="absolute inset-x-2 -bottom-px h-px bg-foreground"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeTabs;
