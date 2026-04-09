import { TabOptions, TabType } from "../interface/home.interface";

type HomePageTabsProps = {
  tabOptions: TabOptions;
  onTabChange?: (_tab: TabType) => void;
  className?: string;
};
const HomeTabs = (props: HomePageTabsProps) => {
  const { tabOptions, onTabChange = () => {}, className = "" } = props;

  return (
    <div className={`flex gap-4 ${className}`}>
      {tabOptions.options.map((tab) => (
        <button
          type="button"
          key={tab}
          className={`py-2 rounded-lg ${
            tabOptions.selected === tab
              ? "dark:text-white text-black font-bold"
              : "dark:text-slate-400 text-gray-700"
          }`}
          onClick={() => {
            onTabChange(tab);
          }}
        >
          {/* {tab === tabOptions.selected ? <sBlogspan>* </sBlogspan> : null} */}
          {/* {tabKeyMap[tab]} */}
          {tab}
        </button>
      ))}
    </div>
  );
};

export default HomeTabs;
