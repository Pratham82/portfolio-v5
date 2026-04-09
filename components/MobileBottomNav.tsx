import Link from "next/link";

import { House, List, X } from "@phosphor-icons/react";

import { TabOptions, TabType } from "../interface/home.interface";

type MobileBottomNavProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  tabOptions: TabOptions;
  onTabChange: (_tab: TabType) => void;
};

const MobileBottomNav = (props: MobileBottomNavProps) => {
  const { isMenuOpen, onMenuToggle, tabOptions, onTabChange } = props;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-2 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        <Link
          href="/home"
          className="flex flex-col items-center gap-1 p-2 text-slate-600 dark:text-slate-300"
        >
          <House size={24} />
          <span className="text-xs">Home</span>
        </Link>

        <button
          type="button"
          onClick={onMenuToggle}
          className="flex flex-col items-center gap-1 p-2 text-slate-600 dark:text-slate-300"
        >
          {isMenuOpen ? <X size={24} /> : <List size={24} />}
          <span className="text-xs">{isMenuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute bottom-full left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4 shadow-xl">
          <div className="max-h-[60vh] overflow-y-auto">
            {tabOptions.options.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => {
                  onTabChange(tab);
                  onMenuToggle();
                }}
                className={`w-full px-4 py-3 text-left text-sm rounded-lg mb-1 ${
                  tabOptions.selected === tab
                    ? "dark:text-white text-black font-bold bg-slate-100 dark:bg-slate-800"
                    : "dark:text-slate-400 text-gray-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileBottomNav;
