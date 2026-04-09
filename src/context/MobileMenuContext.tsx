import { createContext, useContext, useState, ReactNode } from "react";

import { TabOptions, TabType } from "../../interface/home.interface";

type MobileMenuContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tabOptions: TabOptions;
  onTabChange: (tab: TabType) => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

type MobileMenuProviderProps = {
  children: ReactNode;
  tabOptions: TabOptions;
  onTabChange: (tab: TabType) => void;
};

export const MobileMenuProvider = ({
  children,
  tabOptions,
  onTabChange,
}: MobileMenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={{ isOpen, setIsOpen, tabOptions, onTabChange }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within MobileMenuProvider");
  }
  return context;
};
