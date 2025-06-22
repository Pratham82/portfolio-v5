import { MoonStarsIcon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Toggle Theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="duration-200 hover:scale-110 active:scale-100"
    >
      {theme === "light" ? <MoonStarsIcon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeSwitcher;
