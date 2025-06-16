import { HomePageTabs, TabOptions, TabType } from "../interface/home.interface";

type HomePageTabsProps = {
  tabOptions: TabOptions;
  onTabChange?: (tab: TabType) => void;
};
const HomeTabs = (props: HomePageTabsProps) => {
  const { tabOptions, onTabChange = () => {} } = props;
  const tabKeyMap = {
    [HomePageTabs.EXPERIENCE]: "[ e ]",
    [HomePageTabs.PROJECTS]: "[ p ]",
    [HomePageTabs.BLOGS]: "[ b ]",
  };

  return (
    <div className="flex gap-4">
      {tabOptions.options.map((tab) => (
        <button
          type="button"
          key={tab}
          className={`py-2 rounded-lg ${
            tabOptions.selected === tab
              ? "dark:text-white font-bold text-black"
              : "dark:text-slate-400 text-gray-700"
          }`}
          onClick={() => {
            console.log(tab);
            onTabChange(tab);
          }}
        >
          {/* {tab === tabOptions.selected ? <sBlogspan>* </sBlogspan> : null} */}
          {tabKeyMap[tab]} {tab}
        </button>
      ))}
    </div>
  );
};

export default HomeTabs;
