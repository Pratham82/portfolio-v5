import { List, X } from "@phosphor-icons/react";

type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MobileMenuButton = (props: MobileMenuButtonProps) => {
  const { isOpen, onClick } = props;

  return (
    <button
      type="button"
      aria-label="Toggle Menu"
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-black shadow-lg duration-200 hover:scale-110 active:scale-100"
    >
      {isOpen ? <X size={24} /> : <List size={24} />}
    </button>
  );
};

export default MobileMenuButton;
