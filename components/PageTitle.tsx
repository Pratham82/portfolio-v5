import { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

const PageTitle = (props: PageTitleProps) => {
  const { children, className = "" } = props;

  return (
    <h1 className={`text-lg sm:text-xl underline font-bold ${className}`}>
      {children}
    </h1>
  );
};

export default PageTitle;
