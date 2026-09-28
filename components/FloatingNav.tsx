import { ListIcon, XIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

type FloatingNavProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

const FloatingNav = (props: FloatingNavProps) => {
  const { isMenuOpen, onMenuToggle } = props;

  return (
    <Button
      size="icon-lg"
      aria-label="Toggle Menu"
      aria-expanded={isMenuOpen}
      onClick={onMenuToggle}
      className="fixed bottom-6 right-6 z-50 size-12 rounded-full shadow-lg md:hidden"
    >
      {isMenuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
    </Button>
  );
};

export default FloatingNav;
