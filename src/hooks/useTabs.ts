import { useEffect, useState } from "react";

import {
  HomePageTabs,
  TabOptions,
  TabType,
} from "../../interface/home.interface";

const useTabs = () => {
  const [tabs, setTabs] = useState<TabOptions>({
    options: [
      HomePageTabs.EXPERIENCE,
      HomePageTabs.PROJECTS,
      HomePageTabs.BLOGS,
      HomePageTabs.LINKS,
      HomePageTabs.ABOUTME,
    ],
    selected: HomePageTabs.EXPERIENCE,
  });

  const handleTabChange = (tab: TabType) => {
    setTabs((prev) => ({
      ...prev,
      selected: tab,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "p":
        case "P":
        case "2": {
          // setTabs((prev) => ({
          //   ...prev,
          //   selected: HomePageTabs.PROJECTS,
          // }));
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
    setTabs,
    handleTabChange,
  };
};

export default useTabs;
