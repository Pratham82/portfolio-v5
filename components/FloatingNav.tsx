import { List, X } from "@phosphor-icons/react";

type FloatingNavProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

const FloatingNav = (props: FloatingNavProps) => {
  const { isMenuOpen, onMenuToggle } = props;

  return (
    <button
      type="button"
      aria-label="Toggle Menu"
      onClick={onMenuToggle}
      className="md:hidden fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-black shadow-lg duration-200 hover:scale-110 active:scale-100"
    >
      {isMenuOpen ? <X size={24} /> : <List size={24} />}
    </button>
  );
};

export default FloatingNav;
