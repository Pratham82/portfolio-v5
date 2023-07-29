import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, MoonStars } from "phosphor-react";

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
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="duration-200 hover:scale-110 active:scale-100"
    >
      {theme === "light" ? <MoonStars size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeSwitcher;
