import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { TabOptions, TabType } from "../interface/home.interface";

type HomePageTabsProps = {
  tabOptions: TabOptions;
  onTabChange?: (_tab: TabType) => void;
  className?: string;
};
const HomeTabs = (props: HomePageTabsProps) => {
  const { tabOptions, onTabChange = () => {}, className = "" } = props;

  return (
    <div
      className={cn("flex gap-1 border-b border-border", className)}
      data-testid="home-tabs"
    >
      {tabOptions.options.map((tab) => {
        const isSelected = tabOptions.selected === tab;
        return (
          <button
            type="button"
            key={tab}
            aria-pressed={isSelected}
            className={cn(
              "relative px-3 py-2 text-sm transition-colors",
              isSelected
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => {
              onTabChange(tab);
            }}
          >
            {tab}
            {isSelected && (
              <motion.span
                layoutId="home-tab-underline"
                className="absolute inset-x-2 -bottom-px h-px bg-foreground"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default HomeTabs;
