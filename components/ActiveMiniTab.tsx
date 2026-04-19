import { Minus, Plus } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

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
    <div className="flex w-full gap-4">
      {miniTabs.map((tab) => {
        const isActive = visibleData[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            type="button"
            className={`text-sm text-black dark:text-white hover:underline flex items-center gap-2 ${
              isActive ? "font-bold underline" : ""
            }`}
          >
            {isActive ? (
              <>
                <span className="hidden sm:inline">Hide </span>
                <span className="sm:text-sm text-xs">{tab.shortLabel}</span>
                <Minus size={12} className="ml-1" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Show </span>
                <span className="sm:text-sm text-xs">{tab.shortLabel}</span>
                <Plus size={12} className="ml-1" />
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ActiveMiniTabs;
