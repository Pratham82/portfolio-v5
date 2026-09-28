import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

const PageTitle = (props: PageTitleProps) => {
  const { children, className = "" } = props;

  return (
    <h1
      className={cn(
        "text-lg font-semibold tracking-tight sm:text-xl",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
