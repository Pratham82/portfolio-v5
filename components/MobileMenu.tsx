import { motion, AnimatePresence } from "framer-motion";

import { TabOptions, TabType } from "../interface/home.interface";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  tabOptions: TabOptions;
  onTabChange: (_tab: TabType) => void;
};

const MobileMenu = (props: MobileMenuProps) => {
  const { isOpen, onClose, tabOptions, onTabChange } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 z-50 min-w-[180px] rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2 shadow-xl md:hidden"
        >
          {tabOptions.options.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => {
                onTabChange(tab);
                onClose();
              }}
              className={`w-full px-4 py-3 text-left text-sm ${
                tabOptions.selected === tab
                  ? "dark:text-white text-black font-bold"
                  : "dark:text-slate-400 text-gray-700"
              } hover:bg-slate-100 dark:hover:bg-slate-700`}
            >
              {tab}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
