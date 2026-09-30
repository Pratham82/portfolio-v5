import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type UsesLinkProps = {
  url?: string;
  label: string;
  className?: string;
  children: ReactNode;
};

// Wraps a card in an external link only when the config gives it a url.
const UsesLink = ({ url, label, className, children }: UsesLinkProps) => {
  if (!url) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={cn(
        "rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </a>
  );
};

export default UsesLink;
