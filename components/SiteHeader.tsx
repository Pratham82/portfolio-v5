import Link from "next/link";

import LocalTime from "./LocalTime";
import ThemeSwitcher from "./ThemeSwitcher";

const SiteHeader = () => (
  <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 px-4 backdrop-blur-md">
    <div className="mx-auto flex h-12 max-w-2xl items-center justify-between">
      <Link
        href="/home"
        className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ~/pratham82
      </Link>
      <div className="flex items-center gap-3">
        <LocalTime />
        <ThemeSwitcher />
      </div>
    </div>
  </header>
);

export default SiteHeader;
