import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

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
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="fixed bottom-22 right-6 z-50 min-w-[180px] rounded-xl border bg-popover p-1 text-popover-foreground shadow-xl md:hidden"
        >
          {tabOptions.options.map((tab) => (
            <button
              type="button"
              key={tab}
              aria-pressed={tabOptions.selected === tab}
              onClick={() => {
                onTabChange(tab);
                onClose();
              }}
              className={cn(
                "w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent",
                tabOptions.selected === tab
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
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
