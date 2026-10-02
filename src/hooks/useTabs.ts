import { useEffect, useRef, useState } from "react";

import {
  HOME_TAB_GROUPS,
  HomePageTabs,
  HomeTabGroup,
  TabOptions,
  TabType,
  getTabGroup,
} from "../../interface/home.interface";

const useTabs = () => {
  const [selected, setSelected] = useState<TabType>(HomePageTabs.EXPERIENCE);
  // The tab last open in each group, so switching back restores it.
  const lastTabByGroup = useRef<Record<HomeTabGroup, TabType>>({
    [HomeTabGroup.WORK]: HOME_TAB_GROUPS[HomeTabGroup.WORK][0],
    [HomeTabGroup.PERSONAL]: HOME_TAB_GROUPS[HomeTabGroup.PERSONAL][0],
  });

  const group = getTabGroup(selected);
  const tabs: TabOptions = { options: HOME_TAB_GROUPS[group], selected };

  const handleTabChange = (tab: TabType) => {
    lastTabByGroup.current[getTabGroup(tab)] = tab;
    setSelected(tab);
  };

  const handleGroupChange = (nextGroup: HomeTabGroup) => {
    setSelected(lastTabByGroup.current[nextGroup]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "p":
        case "P":
        case "2": {
          handleTabChange(HomePageTabs.PROJECTS);
          break;
        }
        case "b":
        case "B":
        case "3": {
          handleTabChange(HomePageTabs.BLOGS);
          break;
        }
        case "e":
        case "E":
        case "1": {
          handleTabChange(HomePageTabs.EXPERIENCE);
          break;
        }
        case "s":
        case "S": {
          handleTabChange(HomePageTabs.SKILLS);
          break;
        }
        default: {
          // Do nothing for other keys
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return {
    tabs,
    group,
    handleTabChange,
    handleGroupChange,
  };
};

export default useTabs;
