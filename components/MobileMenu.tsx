import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

import {
  HOME_TAB_GROUPS,
  HomeTabGroup,
  TabType,
} from "../interface/home.interface";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  selected: TabType;
  onTabChange: (_tab: TabType) => void;
};

const MobileMenu = (props: MobileMenuProps) => {
  const { isOpen, onClose, selected, onTabChange } = props;

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
          {Object.values(HomeTabGroup).map((group) => (
            <div key={group} className="py-1">
              <p className="px-3 pb-1 pt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {group}
              </p>
              {HOME_TAB_GROUPS[group].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  aria-pressed={selected === tab}
                  onClick={() => {
                    onTabChange(tab);
                    onClose();
                  }}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                    selected === tab
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
