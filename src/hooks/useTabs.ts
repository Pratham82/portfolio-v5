import { usePathname, useRouter } from "next/navigation";

import { useEffect, useRef } from "react";

import {
  HOME_TAB_GROUPS,
  HOME_TAB_HREF,
  HomePageTabs,
  HomeTabGroup,
  TabOptions,
  TabType,
  getTabFromPath,
  getTabGroup,
} from "../../interface/home.interface";

const SHORTCUTS: Record<string, HomePageTabs> = {
  e: HomePageTabs.EXPERIENCE,
  "1": HomePageTabs.EXPERIENCE,
  p: HomePageTabs.PROJECTS,
  "2": HomePageTabs.PROJECTS,
  b: HomePageTabs.BLOGS,
  "3": HomePageTabs.BLOGS,
  s: HomePageTabs.SKILLS,
};

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/** The home tabs, driven by the URL: each tab is its own route. */
const useTabs = () => {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const selected = getTabFromPath(pathname) ?? HomePageTabs.EXPERIENCE;

  // The tab last open in each group, so switching back restores it. The home
  // layout stays mounted across tab routes, so this survives navigation.
  const lastTabByGroup = useRef<Record<HomeTabGroup, TabType>>({
    [HomeTabGroup.WORK]: HOME_TAB_GROUPS[HomeTabGroup.WORK][0],
    [HomeTabGroup.PERSONAL]: HOME_TAB_GROUPS[HomeTabGroup.PERSONAL][0],
  });
  const group = getTabGroup(selected);
  useEffect(() => {
    lastTabByGroup.current[group] = selected;
  }, [group, selected]);

  const tabs: TabOptions = { options: HOME_TAB_GROUPS[group], selected };

  const handleTabChange = (tab: TabType) => {
    router.push(HOME_TAB_HREF[tab], { scroll: false });
  };

  const handleGroupChange = (nextGroup: HomeTabGroup) => {
    handleTabChange(lastTabByGroup.current[nextGroup]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const tab = SHORTCUTS[e.key.toLowerCase()];
      if (tab) router.push(HOME_TAB_HREF[tab], { scroll: false });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return {
    tabs,
    group,
    handleTabChange,
    handleGroupChange,
  };
};

export default useTabs;
