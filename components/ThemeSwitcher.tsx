import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Same footprint as the button so the header doesn't shift on hydration.
    return <div className="size-8" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="-mr-2 text-muted-foreground hover:text-foreground"
    >
      {isDark ? <SunIcon size={18} /> : <MoonStarsIcon size={18} />}
    </Button>
  );
};

export default ThemeSwitcher;
