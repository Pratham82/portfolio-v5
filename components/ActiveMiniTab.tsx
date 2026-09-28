import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";

type MiniTab = {
  id: keyof {
    isContributionsVisible: boolean;
    isNowPlayingVisible: boolean;
    isSkillsVisible: boolean;
  };
  label: string;
  shortLabel: string;
};

const miniTabs: MiniTab[] = [
  {
    id: "isContributionsVisible",
    label: "Contributions",
    shortLabel: "Contributions",
  },
  {
    id: "isNowPlayingVisible",
    label: "Now Playing",
    shortLabel: "Now Playing",
  },
  { id: "isSkillsVisible", label: "Skills", shortLabel: "Skills" },
];

type VisibleData = {
  isContributionsVisible: boolean;
  isNowPlayingVisible: boolean;
  isSkillsVisible: boolean;
};

type ActiveMiniTabProps = {
  visibleData: VisibleData;
  setVisibleData: Dispatch<SetStateAction<VisibleData>>;
};

const ActiveMiniTabs = (props: ActiveMiniTabProps) => {
  const { visibleData, setVisibleData } = props;

  const handleTabClick = (tabId: MiniTab["id"]) => {
    setVisibleData((prev) => ({
      isContributionsVisible: false,
      isNowPlayingVisible: false,
      isSkillsVisible: false,
      [tabId]: !prev[tabId],
    }));
  };

  return (
    <div className="flex w-full flex-wrap gap-4">
      {miniTabs.map((tab) => {
        const isActive = visibleData[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            type="button"
            aria-expanded={isActive}
            className={cn(
              "flex items-center gap-1.5 font-mono text-xs transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive ? (
              <>
                <span className="hidden sm:inline">Hide </span>
                <span>{tab.shortLabel}</span>
                <MinusIcon size={12} />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Show </span>
                <span>{tab.shortLabel}</span>
                <PlusIcon size={12} />
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ActiveMiniTabs;
