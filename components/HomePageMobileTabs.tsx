import { TabOptions, TabType } from "../interface/home.interface";

type HomePageMobileTabsProps = {
  tabOptions: TabOptions;
  onTabChange?: (_tab: TabType) => void;
};

const HomePageMobileTabs = (props: HomePageMobileTabsProps) => {
  const { tabOptions, onTabChange = () => {} } = props;

  return (
    <div className="md:hidden">
      <select
        value={tabOptions.selected}
        onChange={(e) => onTabChange(e.target.value as TabType)}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2 px-3 text-sm dark:text-white text-black"
      >
        {tabOptions.options.map((tab) => (
          <option key={tab} value={tab}>
            {tab}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HomePageMobileTabs;
